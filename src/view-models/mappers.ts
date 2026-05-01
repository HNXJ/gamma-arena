import type { ArenaStatus, Agent, Progression } from '../types/contract';
import type { SystemViewModel, ResearchViewModel, AgentViewModel } from '../types/ui';

export const mapStatusToSeverity = (status: string): 'NORMAL' | 'WARNING' | 'CRITICAL' | 'OFFLINE' => {
  switch (status) {
    case 'ONLINE': return 'NORMAL';
    case 'STANDBY': return 'WARNING';
    case 'CRASHED': return 'CRITICAL';
    default: return 'OFFLINE';
  }
};

export const mapAgentStatusToSeverity = (status: string, blocker?: string): 'ACTIVE' | 'IDLE' | 'WARNING' | 'CRITICAL' => {
  if (blocker) return 'CRITICAL';
  switch (status) {
    case 'ACTIVE': return 'ACTIVE';
    case 'IDLE': return 'IDLE';
    case 'STANDBY': return 'WARNING';
    case 'BLOCKED_BY_LMS': return 'CRITICAL';
    default: return 'IDLE';
  }
};

export const mapSystemState = (status: ArenaStatus | null): SystemViewModel => {
  if (!status) {
    return {
      status: 'DISCONNECTED',
      statusSeverity: 'OFFLINE',
      heartbeat: '---',
      uptime: '0s',
      slots: '---',
      blockers: ['COMMUNICATION_LOST']
    };
  }

  const blockers: string[] = [];
  if (status.system.status === 'CRASHED') blockers.push('SYSTEM_CRASH');
  
  return {
    status: status.system.status,
    statusSeverity: mapStatusToSeverity(status.system.status),
    heartbeat: status.system.heartbeat,
    uptime: `${status.system.monitor_uptime_seconds}s`,
    slots: status.system.backend_model_slots_occupied,
    councilActivity: status.system.council_chat_activity,
    blockers
  };
};

export const mapResearchState = (status: ArenaStatus | null): ResearchViewModel => {
  const defaultProg: Progression = {
    largest_pass_network_neuron_count: 0,
    active_patches: [],
    next_unlock_threshold: 0,
    truth_class: 'DEGRADED',
    omissions: 0,
    canonical_ladder: '---'
  };

  const prog = status?.progression || defaultProg;
  const research = status?.research;

  const neuronCount = prog.largest_pass_network_neuron_count;
  const targetCount = prog.next_unlock_threshold;
  
  return {
    neuronCount,
    targetCount,
    progressPercent: targetCount > 0 ? Math.min((neuronCount / targetCount) * 100, 100) : 0,
    topic: research?.mission_topic || 'Unknown Research Path',
    activePatch: research?.active_patch || '---',
    truthClass: prog.truth_class || 'SYNC',
    truthSeverity: prog.truth_class === 'GROUNDED' ? 'GROUNDED' : 'INFERRED'
  };
};

export const mapAgentState = (agent: Agent): AgentViewModel => {
  return {
    id: agent.id,
    role: agent.role || 'Unknown Agency',
    status: agent.status,
    statusSeverity: mapAgentStatusToSeverity(agent.status, agent.system_blocker),
    blocker: agent.system_blocker,
    lastActive: agent.last_active,
    truthClass: agent.truth_class,
    source: agent.source || 'Unknown'
  };
};
