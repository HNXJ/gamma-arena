import type { ArenaStatus, Agent, Persistence, RawLog } from '../types/contract';
import type { 
  SystemViewModel, 
  ResearchViewModel, 
  AgentViewModel, 
  PersistenceViewModel,
  TransportViewModel,
  FetchEnvelope,
  TransportStateKind
} from '../types/ui';

export const mapArenaState = (status: ArenaStatus | null): { system: SystemViewModel, research: ResearchViewModel } => {
  const safeStatus = status?.system?.status || 'STALLED';
  const research = status?.research;
  const progression = status?.progression;

  const systemVM: SystemViewModel = {
    status: safeStatus,
    statusSeverity: safeStatus === 'ONLINE' ? 'NORMAL' : safeStatus === 'STANDBY' ? 'WARNING' : 'CRITICAL',
    heartbeat: status?.system?.heartbeat || 'STALLED',
    uptime: status?.system?.monitor_uptime_seconds ? `${status.system.monitor_uptime_seconds}s` : '---',
    slots: status?.system?.backend_model_slots_occupied || '---',
    blockers: safeStatus === 'CRASHED' ? ['SYSTEM_CRASH'] : []
  };

  const researchVM: ResearchViewModel = {
    officialNeuronCount: research?.neuron_count || 0,
    largestGroundedPassNetwork: progression?.largest_pass_network_neuron_count || 0,
    nextUnlockThreshold: progression?.next_unlock_threshold || 0,
    activeTargetCount: research?.active_target,
    truthClass: progression?.truth_class || 'DEGRADED',
    truthSeverity: progression?.truth_class === 'GROUNDED' ? 'GROUNDED' : 
                   progression?.truth_class === 'INFERRED' ? 'INFERRED' : 'STALLED',
    progressPercent: (research?.neuron_count && progression?.next_unlock_threshold) 
      ? Math.min((research.neuron_count / progression.next_unlock_threshold) * 100, 100) 
      : 0,
    topic: research?.mission_topic || 'Unknown Research Path',
    activePatch: research?.active_patch || '---',
    lastBlock: status?.persistence?.last_checkpoint
  };

  return { system: systemVM, research: researchVM };
};

export const mapAgentsState = (agents: Agent[] | null): AgentViewModel[] => {
  if (!agents || !Array.isArray(agents)) return [];
  return agents.map(a => ({
    id: a.id,
    role: a.role,
    status: a.status,
    statusSeverity: a.status === 'ACTIVE' ? 'ACTIVE' : a.status === 'IDLE' ? 'IDLE' : 'CRITICAL',
    truthClass: a.truth_class,
    lastActive: a.last_active,
    blocker: a.system_blocker,
    source: a.source || 'Unknown'
  }));
};

export const mapPersistenceState = (p: Persistence | null): PersistenceViewModel => {
  const isDegraded = !p || (p as any).status === 'UNREACHABLE';
  return {
    bootType: p?.boot_type || 'Unknown',
    freshness: p?.freshness || 'Unknown',
    resumeCount: p?.resume_count || 0,
    lastCheckpoint: p?.last_checkpoint || 'None',
    status: isDegraded ? 'UNAVAILABLE' : 'GROUNDED'
  };
};

export const mapTransportState = (envelopes: {
  status: FetchEnvelope<ArenaStatus> | null;
  agents: FetchEnvelope<Agent[]> | null;
  persistence: FetchEnvelope<Persistence> | null;
  logs: FetchEnvelope<RawLog[]> | null;
}): TransportViewModel => {
  const states = [
    { name: 'System Status', env: envelopes.status },
    { name: 'Agent Roster', env: envelopes.agents },
    { name: 'Persistence', env: envelopes.persistence },
    { name: 'Provenance Rail', env: envelopes.logs }
  ];

  const endpointStates = states.map(s => ({
    name: s.name,
    kind: s.env?.kind || 'loading' as TransportStateKind,
    detail: s.env?.error || (s.env?.ok ? 'Connected' : 'Waiting for telemetry')
  }));

  const allOk = endpointStates.every(s => s.kind === 'success_populated' || s.kind === 'success_empty');
  const someOk = endpointStates.some(s => s.kind === 'success_populated' || s.kind === 'success_empty');
  const allFailed = states.every(s => !s.env?.ok && s.env?.kind !== 'loading');

  let linkState: TransportViewModel['linkState'] = 'DEGRADED';
  if (allOk) linkState = 'CONNECTED';
  else if (allFailed) linkState = 'UNREACHABLE';
  else if (someOk) linkState = 'PARTIAL';

  return {
    linkState,
    summary: allOk ? 'Substrate Link Healthy' : someOk ? 'Degraded Connectivity' : 'Transport Interrupted',
    endpointStates
  };
};
