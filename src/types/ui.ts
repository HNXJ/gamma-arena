import React from 'react';

export type UISlot = 
  | 'TOP_SUMMARY' 
  | 'MAIN_FEED' 
  | 'RIGHT_RAIL' 
  | 'AGENT_STRIP' 
  | 'SYSTEM_NOTICES' 
  | 'ARENA_OVERLAY' 
  | 'ARENA_SIDEBAR'
  | 'SYSTEM_FEED'
  | 'DETAIL_DRAWER' 
  | 'LOG_INSPECTOR';

export interface UIRegistryItem {
  key: string;
  slot: UISlot;
  label: string;
  priority: number; // Higher number = lower in feed
  stickiness?: 'PINNED' | 'NORMAL'; // PINNED items stay at top
  timestamp?: string; // Optional for chronological sorting
  visibilityRule?: (state: unknown) => boolean;
  render: (props: { data: unknown }) => React.ReactNode;
  interaction?: {
    mode: 'STATIC' | 'EXPANDABLE' | 'DETAIL_LINK';
    linkTo?: string;
  };
  fallbackLabel?: string;
}

export interface SystemViewModel {
  status: string;
  statusSeverity: 'NORMAL' | 'WARNING' | 'CRITICAL' | 'OFFLINE';
  heartbeat: string;
  uptime: string;
  slots: string;
  councilActivity?: string;
  blockers: string[];
}

export interface ResearchViewModel {
  neuronCount: number;
  targetCount: number;
  topic: string;
  progressPercent: number;
  truthClass: string;
  truthSeverity: 'GROUNDED' | 'INFERRED' | 'DEGRADED';
  activePatch: string | null;
}

export interface AgentViewModel {
  id: string;
  role: string;
  status: string;
  statusSeverity: 'ACTIVE' | 'IDLE' | 'WARNING' | 'CRITICAL';
  blocker?: string;
  lastActive: string;
  truthClass: string;
  source: string;
}
