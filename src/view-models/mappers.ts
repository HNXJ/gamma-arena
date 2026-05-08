import type { LabyrinthStatus, Agent, Persistence, RawLog, AgentSociety, MissionObservation } from '../types/contract';
import type { 
  SystemViewModel, 
  ResearchViewModel, 
  AgentViewModel, 
  PersistenceViewModel,
  AgentSocietyViewModel,
  SlotViewModel,
  MissionViewModel,
  GateViewModel,
  TransportViewModel,
  LabyrinthViewModelBundle,
  FetchEnvelope,
  TransportStateKind,
  RealtimeReport
} from '../types/ui';

export const mapLabyrinthState = (status: LabyrinthStatus | null): { system: SystemViewModel, research: ResearchViewModel } => {
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
  const isDegraded = !p || p.status === 'UNREACHABLE';
  return {
    bootType: p?.boot_type || 'Unknown',
    freshness: p?.freshness || 'Unknown',
    resumeCount: p?.resume_count || 0,
    lastCheckpoint: p?.last_checkpoint || 'None',
    status: isDegraded ? 'UNAVAILABLE' : 'GROUNDED'
  };
};

export const mapAgentSocietyState = (s: AgentSociety | null): AgentSocietyViewModel => {
  const manifest = s?.manifest;
  const h = manifest?.harness_readiness;
  
  const slots: SlotViewModel[] = (manifest?.slots || []).map(slot => ({
    id: slot.slot_id,
    lmsId: slot.lms_instance_id,
    model: slot.model_key,
    role: slot.role,
    status: slot.status,
    statusSeverity: slot.status === 'echo_passed' ? 'NORMAL' : slot.status === 'assigned_not_started' ? 'WARNING' : 'UNKNOWN',
    truthMode: slot.truth_mode,
    isVisionDisabled: slot.vision_false_verified
  }));

  return {
    reportedCount: s?.reported_slot_count || 0,
    acceptedCount: s?.accepted_echo_count || 0,
    rejectedCount: s?.rejected_count || 0,
    slots,
    readiness: {
      isReady: !!h && Object.values(h).every(v => v === true),
      checks: [
        { label: 'Session Manifest', ok: !!h?.session_manifest_present },
        { label: 'Transcript', ok: !!h?.transcript_present },
        { label: 'Artifact Hashes', ok: !!h?.artifact_hashes_present },
        { label: 'Receipt', ok: !!h?.receipt_present },
        { label: 'Redaction Scan', ok: !!h?.redaction_scan_pass }
      ]
    },
    truthMode: s?.truth_mode || 'truth_safe_unverified'
  };
};

export const mapMissionState = (m: MissionObservation | null): MissionViewModel => {
  return {
    missionId: m?.mission_id || 'IZH-SPECTRAL-OMISSION-MVS-01',
    missionType: m?.mission_type || 'Spectral Omission',
    modelFamily: m?.model_family || 'Izhikevich',
    notModelFamily: m?.not_model_family || 'HH / Hodgkin-Huxley',
    truthMode: m?.truth_mode || 'truth_safe_unverified',
    truthBearingRun: m?.truth_bearing_run || false,
    status: m?.status || 'awaiting mission-start gate',
    evidenceStatus: m?.evidence_status || 'reported_unverified',
    source: m?.source || 'CLI_REPORT',
    slots: m?.slots || [
      { id: 'receptionist', role: 'receptionist', status: 'reported_loaded', instance_id: 'gemma-4-e4b-it-mlx' },
      { id: 'worker_alpha', role: 'worker_alpha', status: 'reported_loaded', instance_id: 'gemma-4-e4b-it-mlx:2' },
      { id: 'worker_beta', role: 'worker_beta', status: 'reported_loaded', instance_id: 'gemma-4-e4b-it-mlx:3' },
      { id: 'critic', role: 'critic', status: 'reported_loaded', instance_id: 'gemma-4-e4b-it-mlx:4' },
      { id: 'judge', role: 'judge', status: 'reported_loaded', instance_id: 'gemma-4-e4b-it-mlx:5' },
      { id: 'redaction_auditor', role: 'redaction_auditor', status: 'reported_loaded', instance_id: 'gemma-4-e4b-it-mlx:6' },
      { id: 'receipt_verifier', role: 'receipt_verifier', status: 'reported_loaded', instance_id: 'gemma-4-e4b-it-mlx:7' },
      { id: 'synthesizer', role: 'synthesizer', status: 'reported_loaded', instance_id: 'gemma-4-e4b-it-mlx:8' },
    ],
    gates: (m?.gates || [
      { gate_id: 'repo_preflight', status: 'PENDING' },
      { gate_id: 'lms_slot_inventory', status: 'PENDING' },
      { gate_id: 'harness_identity', status: 'PENDING' },
      { gate_id: 'connectivity_audit', status: 'PENDING' },
      { gate_id: 'poisson_activity_discovery', status: 'PENDING' },
      { gate_id: 'jax_spectral_loss_validation', status: 'PENDING' },
      { gate_id: 'nan_inf_gate', status: 'PENDING' },
      { gate_id: 'artifact_manifest', status: 'PENDING' },
      { gate_id: 'receipt_candidate', status: 'PENDING' }
    ]).map(g => ({ id: g.gate_id, status: g.status as GateViewModel['status'], detail: g.detail })),
    artifacts: (m?.artifacts || []).map(a => ({ name: a.name, path: a.path, type: a.type })),
    message: m?.message || (m ? undefined : 'No receipt-backed live mission endpoint is available.')
  };
};

export const mapTransportState = (envelopes: {
  status: FetchEnvelope<LabyrinthStatus> | null;
  agents: FetchEnvelope<Agent[]> | null;
  persistence: FetchEnvelope<Persistence> | null;
  society: FetchEnvelope<AgentSociety> | null;
  mission: FetchEnvelope<MissionObservation> | null;
  logs: FetchEnvelope<RawLog[]> | null;
}): TransportViewModel => {
  const states = [
    { name: 'System Status', env: envelopes.status },
    { name: 'Agent Roster', env: envelopes.agents },
    { name: 'Persistence', env: envelopes.persistence },
    { name: 'Agent Society', env: envelopes.society },
    { name: 'Mission Status', env: envelopes.mission },
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

export const mapRealtimeReport = (
  transport: TransportViewModel, 
  system: SystemViewModel,
  agents: AgentViewModel[],
  society: AgentSocietyViewModel
): RealtimeReport => {
  const isVercelHealthy = transport.linkState === 'CONNECTED' || transport.linkState === 'PARTIAL';
  
  // Simplified derivation for observation surface
  const players = agents.map(a => ({
    id: a.id,
    label: a.role,
    role: a.role,
    backend: a.source,
    liveness: (a.status === 'ACTIVE' ? 'active' : a.status === 'IDLE' ? 'idle' : 'offline') as RealtimeReport['players'][0]['liveness'],
    harnessStatus: (a.truthClass === 'GROUNDED' ? 'verified' : 'unknown') as RealtimeReport['players'][0]['harnessStatus']
  }));

  const judges = society.slots
    .filter(s => s.role === 'judge')
    .map(s => ({
      id: s.id,
      label: 'LMS Judge',
      status: (s.status === 'echo_passed' ? 'clear' : 'warning') as RealtimeReport['judges'][0]['status'],
      summary: s.status
    }));

  return {
    generatedAt: new Date().toISOString(),
    source: transport.linkState === 'CONNECTED' ? 'api' : 'mock_fallback',
    freshness: transport.linkState === 'CONNECTED' ? 'live' : 'fallback',
    truthMode: society.truthMode as TruthMode,
    service: {
      supabase: 'unknown', // Not explicitly tracked in transport yet
      vercelApi: isVercelHealthy ? 'healthy' : 'unavailable'
    },
    players,
    judges,
    warnings: system.blockers
  };
};

export type { 
  SystemViewModel, 
  ResearchViewModel, 
  AgentViewModel, 
  PersistenceViewModel, 
  AgentSocietyViewModel, 
  MissionViewModel, 
  TransportViewModel, 
  LabyrinthViewModelBundle 
};
