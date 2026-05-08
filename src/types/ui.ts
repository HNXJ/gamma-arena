
import React from 'react';
import type { RawLog } from './contract';

export type UISlot = 
  | 'TOP_SUMMARY' 
  | 'MAIN_FEED' 
  | 'RIGHT_RAIL' 
  | 'SAFE_STATUS' 
  | 'SAFE_BLOCKERS' 
  | 'SAFE_NOTICES'
  | 'LOBBY_OVERLAY'
  | 'LOBBY'
  | 'RESEARCH'
  | 'AGENTS'
  | 'ARENA'
  | 'LOGS'
  | 'PERSISTENCE'
  | 'SOCIETY'
  | 'MISSION'
  | 'SYSTEM_FEED'
  | 'TECH_TREE'
  | 'WIKI';

export type UIBaseMode = 'SAFE' | 'EXTENDED';

export type TransportStateKind = 
  | 'loading'
  | 'success_empty'
  | 'success_populated'
  | 'http_error'
  | 'network_error'
  | 'payload_error';

export interface FetchEnvelope<T> {
  ok: boolean;
  status: number | null;
  kind: TransportStateKind;
  data: T | null;
  error?: string;
  receivedAt: string | null;
}

export interface TransportViewModel {
  linkState: 'CONNECTED' | 'PARTIAL' | 'DEGRADED' | 'UNREACHABLE';
  summary: string;
  endpointStates: Array<{
    name: string;
    kind: TransportStateKind;
    detail: string;
  }>;
}

export interface UITab {
  id: string;
  label: string;
  icon: string; // Lucide icon name
  priority: number;
  domain: string;
}

export interface UIRegistryItem {
  key: string;
  slot: UISlot;
  label: string;
  priority: number;
  timestamp?: string;
  metadata?: Record<string, unknown>;
  render: (props: { data: LabyrinthViewModelBundle; state?: LabyrinthViewModelBundle }) => React.ReactNode;
  stickiness?: 'PINNED' | 'NORMAL'; // PINNED items stay at top
  visibilityRule?: (state?: LabyrinthViewModelBundle) => boolean;
  interaction?: {
    mode: 'STATIC' | 'EXPANDABLE' | 'DETAIL_LINK';
    linkTo?: string;
  };
}

export interface SystemViewModel {
  status: string;
  statusSeverity: 'NORMAL' | 'WARNING' | 'CRITICAL';
  heartbeat: string;
  uptime: string;
  slots: string;
  blockers: string[];
}

export interface ResearchViewModel {
  officialNeuronCount: number;
  largestGroundedPassNetwork: number;
  nextUnlockThreshold: number;
  activeTargetCount?: number;
  truthClass: string;
  truthSeverity: 'GROUNDED' | 'UNVERIFIED' | 'STALLED' | 'INFERRED';
  progressPercent: number;
  topic: string;
  activePatch: string;
  lastBlock?: string;
  isReceiptBacked: boolean;
}

export interface AgentViewModel {
  id: string;
  role: string;
  status: string;
  statusSeverity: 'ACTIVE' | 'IDLE' | 'CRITICAL';
  truthClass: string;
  lastActive: string;
  blocker?: string;
  source: string;
}

export interface PersistenceViewModel {
  bootType: string;
  freshness: string;
  resumeCount: number;
  lastCheckpoint: string;
  status: string;
}

export interface SlotViewModel {
  id: string;
  lmsId: string;
  model: string;
  role: string;
  status: string;
  statusSeverity: 'NORMAL' | 'WARNING' | 'CRITICAL' | 'UNKNOWN';
  truthMode: string;
  isVisionDisabled: boolean;
}

export interface ReadinessViewModel {
  isReady: boolean;
  checks: Array<{ label: string, ok: boolean }>;
}

export interface AgentSocietyViewModel {
  reportedCount: number;
  acceptedCount: number;
  rejectedCount: number;
  slots: SlotViewModel[];
  readiness: ReadinessViewModel;
  truthMode: string;
}

export interface ArtifactViewModel {
  name: string;
  path: string;
  type: string;
}

export interface GateViewModel {
  id: string;
  status: 'PASS' | 'FAIL' | 'PENDING' | 'SKIPPED';
  detail?: string;
}

export interface MissionViewModel {
  missionId: string;
  missionType: string;
  modelFamily: 'Izhikevich';
  notModelFamily: string;
  truthMode: string;
  truthBearingRun: boolean;
  status: string;
  evidenceStatus: 'reported_unverified' | 'accepted_truth' | 'unavailable';
  source: string;
  slots: Array<{ id: string, role: string, status: string, instance_id: string }>;
  gates: GateViewModel[];
  artifacts: ArtifactViewModel[];
  message?: string;
}

export type ObservationFreshness = "live" | "stale" | "fallback" | "unknown";
export type TruthMode = "truth_safe_unverified" | "receipt_backed" | "unknown";
export type ServiceStatus = "healthy" | "degraded" | "unavailable" | "auth_blocked" | "unknown";

export interface RealtimeReport {
  generatedAt: string;
  lastObservedAt: string;
  source: "supabase" | "api" | "mock_fallback" | "static_fallback" | "unknown";
  freshness: ObservationFreshness;
  truthMode: TruthMode;
  service: {
    supabase: ServiceStatus;
    vercelApi: ServiceStatus;
  };
  players: Array<{
    id: string;
    label: string;
    role?: string;
    backend?: string;
    liveness: "active" | "idle" | "stalled" | "offline" | "unknown";
    lastTurnAt?: string;
    harnessStatus: "verified" | "missing" | "unknown";
  }>;
  judges: Array<{
    id: string;
    label: string;
    status: "clear" | "warning" | "spectator_required" | "hard_stop" | "unknown";
    lastVerdictAt?: string;
    summary?: string;
  }>;
  warnings: string[];
}

export interface LabyrinthViewModelBundle {
  system: SystemViewModel;
  research: ResearchViewModel;
  agents: AgentViewModel[];
  persistence: PersistenceViewModel;
  society: AgentSocietyViewModel;
  mission: MissionViewModel;
  transport: TransportViewModel;
  realtimeReport: RealtimeReport;
  logs: RawLog[];
}

