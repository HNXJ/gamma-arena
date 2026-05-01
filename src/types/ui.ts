/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

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
  | 'SYSTEM_FEED';

export type UIBaseMode = 'SAFE' | 'EXTENDED';

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
  render: (props: { data: any; state?: any }) => React.ReactNode;
  stickiness?: 'PINNED' | 'NORMAL'; // PINNED items stay at top
  visibilityRule?: (state: any) => boolean;
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
  neuronCount: number;
  targetCount: number;
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
