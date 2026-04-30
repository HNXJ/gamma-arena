export interface SystemStatus {
  status: string;
  uptime_seconds: number | null;
  backend_active_slots: string;
  heartbeat: string;
}

export interface Progression {
  largest_pass_network_neuron_count: number;
  active_patches: string[];
  next_unlock_threshold?: number;
  omissions?: number;
  truth_class: "GROUNDED" | "DEGRADED" | "INFERRED";
}

export interface Persistence {
  boot_type: string;
  freshness: "GROUNDED" | "STALE" | "DEGRADED";
  resume_count: number;
  last_checkpoint: string;
}

export interface Agent {
  id: string;
  role: string;
  status: string;
  last_active: string;
  grounded_evidence: boolean;
  truth_class: "GROUNDED" | "DEGRADED";
  source: string | null;
}

export interface ArenaStatus {
  system: SystemStatus;
  progression: Progression;
  persistence: Persistence;
  research: {
    neuron_count: number | null;
    pass_network: string | null;
    active_patch: string | null;
    omissions: number;
  };
}

export interface RawLog {
  content: string;
  path: string;
}

export interface CouncilEvent {
  type: "COUNCIL_CHAT";
  data: {
    time: string;
    agent: string;
    msg: string;
  };
}
