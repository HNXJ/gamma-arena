import type { ArenaStatus, Agent } from '../types/contract';
import type { SystemViewModel, ResearchViewModel, AgentViewModel } from '../types/ui';

/**
 * FALLBACK DOCTRINE:
 * Every mapper must provide a documented "Safe State" for missing or unsupported data.
 * Ad hoc conditionals are replaced by explicit default objects.
 */

const SAFE_SYSTEM_DEFAULTS: SystemViewModel = {
  status: 'DEGRADED',
  statusSeverity: 'CRITICAL',
  heartbeat: 'STALLED',
  uptime: '---',
  slots: '---',
  blockers: ['SOURCE_UNREACHABLE']
};

const SAFE_RESEARCH_DEFAULTS: ResearchViewModel = {
  neuronCount: 0,
  targetCount: 0,
  progressPercent: 0,
  topic: 'Unknown Mission',
  activePatch: '---',
  truthClass: 'DEGRADED',
  truthSeverity: 'INFERRED'
};

const SAFE_AGENT_DEFAULTS: Partial<AgentViewModel> = {
  role: 'Generic Agent',
  status: 'IDLE',
  statusSeverity: 'IDLE',
  lastActive: '---',
  truthClass: 'DEGRADED',
  source: 'Unknown'
};

export const mapStatusToSeverity = (status: string): 'NORMAL' | 'WARNING' | 'CRITICAL' => {
  const normalized = (status || '').toUpperCase();
  switch (normalized) {
    case 'ONLINE': 
    case 'NORMAL': 
      return 'NORMAL';
    case 'STANDBY': 
    case 'DEGRADED': 
      return 'WARNING';
    case 'CRASHED': 
    case 'FAILED': 
    case 'OFFLINE':
    case 'DISCONNECTED':
      return 'CRITICAL';
    default: return 'CRITICAL';
  }
};

export const mapAgentStatusToSeverity = (status: string, blocker?: string): 'ACTIVE' | 'IDLE' | 'WARNING' | 'CRITICAL' => {
  if (blocker) return 'CRITICAL';
  const normalized = (status || '').toUpperCase();
  switch (normalized) {
    case 'ACTIVE': return 'ACTIVE';
    case 'IDLE': return 'IDLE';
    case 'STANDBY': return 'WARNING';
    case 'BLOCKED_BY_LMS': return 'CRITICAL';
    default: return 'IDLE';
  }
};

export const mapSystemState = (status: ArenaStatus | null): SystemViewModel => {
  if (!status || !status.system) return SAFE_SYSTEM_DEFAULTS;

  return {
    ...SAFE_SYSTEM_DEFAULTS,
    status: status.system.status || 'UNKNOWN',
    statusSeverity: mapStatusToSeverity(status.system.status),
    heartbeat: status.system.heartbeat || 'STALLED',
    uptime: status.system.monitor_uptime_seconds ? `${status.system.monitor_uptime_seconds}s` : '---',
    slots: status.system.backend_model_slots_occupied || '---',
    blockers: status.system.status === 'CRASHED' ? ['SYSTEM_CRASH'] : []
  };
};

export const mapResearchState = (status: ArenaStatus | null): ResearchViewModel => {
  const prog = status?.progression;
  const research = status?.research;

  if (!prog) return SAFE_RESEARCH_DEFAULTS;

  const neuronCount = prog.largest_pass_network_neuron_count || 0;
  const targetCount = prog.next_unlock_threshold || 0;
  
  return {
    ...SAFE_RESEARCH_DEFAULTS,
    neuronCount,
    targetCount,
    progressPercent: targetCount > 0 ? Math.min((neuronCount / targetCount) * 100, 100) : 0,
    topic: research?.mission_topic || 'Unknown Research Path',
    activePatch: research?.active_patch || '---',
    truthClass: prog.truth_class || 'DEGRADED',
    truthSeverity: prog.truth_class === 'GROUNDED' ? 'GROUNDED' : 'INFERRED'
  };
};

export const mapAgentState = (agent: Agent): AgentViewModel => {
  if (!agent) return { id: 'unknown-agent', ...SAFE_AGENT_DEFAULTS } as AgentViewModel;

  return {
    ...SAFE_AGENT_DEFAULTS,
    id: agent.id || 'anonymous',
    role: agent.role || 'Unknown Agency',
    status: agent.status || 'IDLE',
    statusSeverity: mapAgentStatusToSeverity(agent.status, agent.system_blocker),
    blocker: agent.system_blocker,
    lastActive: agent.last_active || '---',
    truthClass: agent.truth_class || 'DEGRADED',
    source: agent.source || 'Unknown'
  } as AgentViewModel;
};
