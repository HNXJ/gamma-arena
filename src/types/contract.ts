export interface LabyrinthStatus {
  system: {
    status: 'ONLINE' | 'STANDBY' | 'CRASHED';
    monitor_uptime_seconds: number;
    backend_model_slots_occupied: string;
    heartbeat: string;
    council_chat_activity?: string;
  };
  progression: Progression;
  persistence: Persistence;
  research: {
    neuron_count: number;
    active_target?: number;
    mission_topic?: string;
    pass_network: string | null;
    active_patch: string | null;
    omissions: number;
  };
}

export interface Progression {
  largest_pass_network_neuron_count: number;
  active_patches: string[];
  next_unlock_threshold: number;
  truth_class: 'GROUNDED' | 'INFERRED' | 'DEGRADED';
  omissions: number;
  canonical_ladder: string;
}

export interface Persistence {
  boot_type: string;
  freshness: string;
  resume_count: number;
  last_checkpoint?: string;
  status?: 'ONLINE' | 'UNREACHABLE' | 'DEGRADED';
}

export interface Agent {
  id: string;
  role: string;
  status: 'ACTIVE' | 'IDLE' | 'STANDBY' | 'QUEUED' | 'BLOCKED_BY_LMS';
  system_blocker?: string;
  last_active: string;
  grounded_evidence: boolean;
  truth_class: 'GROUNDED' | 'INFERRED' | 'DEGRADED';
  source: string | null;
}

export interface CouncilEvent {
  type: string;
  data: {
    time: string;
    agent: string;
    msg: string;
  };
}

export interface NetworkState {
  snapshot_id: string;
  snapshot_version: number;
  network_epoch: string;
  snapshot_time: string;
  truth_class: string;
  source: string;
  units: {
    position: string;
    radius: string;
    weight: string;
  };
  nodes: {
    id: string[];
    cell_type: string[];
    layer: string[];
    x: number[];
    y: number[];
    z: number[];
    radius: number[];
    status: string[];
    truth_class: string[];
  };
  edges: {
    src: string[];
    dst: string[];
    weight: number[];
    sign: string[];
    kind: string[];
    truth_class: string[];
  };
  overlays: {
    voltage?: {
      node_id: string[];
      value: number[];
      units: string;
    };
  };
  meta: {
    official_level: number;
    largest_grounded_pass_network: number;
    refresh_time: string;
  };
}

export interface NetworkEvent {
  event_id: string;
  event_type: 'node_state_update' | 'edge_weight_update' | 'network_growth' | 'patch_activation' | 'milestone_reached' | 'snapshot_replaced';
  snapshot_version: number;
  time: string;
  payload: Record<string, unknown>;
}

export interface RawLog {
  content: string;
  path: string;
}

export interface AgentLogResponse {
  agent_id: string;
  logs: CouncilEvent['data'][];
  truth_class: string;
  source: string | null;
}

export interface LmsSlot {
  slot_id: string;
  lms_instance_id: string;
  model_key: string;
  role: 'receptionist' | 'worker_alpha' | 'worker_beta' | 'critic' | 'judge' | 'redaction_auditor' | 'receipt_verifier' | 'synthesizer';
  backend_id: string;
  base_url: string;
  truth_mode: string;
  truth_bearing_run: boolean;
  vision_false_verified: boolean;
  status: 'assigned_not_started' | 'echo_passed' | 'unavailable' | 'unknown';
}

export interface HarnessReadiness {
  session_manifest_present: boolean;
  transcript_present: boolean;
  artifact_hashes_present: boolean;
  receipt_present: boolean;
  redaction_scan_pass: boolean;
}

export interface LmsSlotManifest {
  manifest_id: string;
  timestamp: string;
  slots: LmsSlot[];
  harness_readiness: HarnessReadiness;
}

export interface AgentSociety {
  reported_slot_count: number;
  accepted_echo_count: number;
  rejected_count: number;
  manifest: LmsSlotManifest | null;
  truth_mode: string;
  truth_bearing_run: boolean;
}

export interface MissionObservation {
  mission_id: string;
  mission_type: string;
  model_family: 'Izhikevich';
  not_model_family: 'HH' | 'Hodgkin-Huxley';
  truth_mode: string;
  truth_bearing_run: boolean;
  status: string;
  evidence_status: 'reported_unverified' | 'accepted_truth' | 'unavailable';
  source: string;
  slots: LmsSlotObservation[];
  gates: MissionGateStatus[];
  artifacts: MissionArtifactReference[];
  message?: string;
}

export interface LmsSlotObservation {
  id: string;
  role: string;
  status: string;
  instance_id: string;
}

export interface MissionGateStatus {
  gate_id: string;
  status: 'PASS' | 'FAIL' | 'PENDING' | 'SKIPPED';
  detail?: string;
}

export interface MissionArtifactReference {
  name: string;
  path: string;
  hash?: string;
  type: string;
}
