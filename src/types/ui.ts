
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
  | 'SYSTEM_FEED';

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
  render: (props: { data: ArenaViewModelBundle; state?: ArenaViewModelBundle }) => React.ReactNode;
  stickiness?: 'PINNED' | 'NORMAL'; // PINNED items stay at top
  visibilityRule?: (state?: ArenaViewModelBundle) => boolean;
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

export interface ArenaViewModelBundle {
  system: SystemViewModel;
  research: ResearchViewModel;
  agents: AgentViewModel[];
  persistence: PersistenceViewModel;
  transport: TransportViewModel;
  logs: RawLog[];
}
