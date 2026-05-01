export interface ArenaStatus {
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
