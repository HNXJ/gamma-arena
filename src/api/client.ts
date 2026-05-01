import type { ArenaStatus, Progression, Agent, RawLog, NetworkState, AgentLogResponse, Persistence } from '../types/contract';

const BASE_URL = import.meta.env.VITE_GAMMA_API_BASE || 'http://localhost:3013';

export const ArenaClient = {
  async getStatus(): Promise<ArenaStatus | null> {
    try {
      const res = await fetch(`${BASE_URL}/api/status`);
      if (!res.ok) return null;
      return await res.json();
    } catch { return null; }
  },

  async getProgression(): Promise<Progression | null> {
    try {
      const res = await fetch(`${BASE_URL}/api/progression`);
      if (!res.ok) return null;
      return await res.json();
    } catch { return null; }
  },

  async getAgents(): Promise<Agent[]> {
    try {
      const res = await fetch(`${BASE_URL}/api/agents`);
      if (!res.ok) return [];
      return await res.json();
    } catch { return []; }
  },

  async getAgentLogs(agentId: string): Promise<AgentLogResponse | null> {
    try {
      const res = await fetch(`${BASE_URL}/api/agents/${agentId}/logs`);
      if (!res.ok) return null;
      return await res.json();
    } catch { return null; }
  },

  async getPersistence(): Promise<Persistence | null> {
    try {
      const res = await fetch(`${BASE_URL}/api/persistence`);
      if (!res.ok) return null;
      return await res.json();
    } catch { return null; }
  },

  async getRawLogs(lines: number = 100): Promise<RawLog | null> {
    try {
      const res = await fetch(`${BASE_URL}/api/logs/raw?lines=${lines}`);
      if (!res.ok) return null;
      return await res.json();
    } catch { return null; }
  },

  async getNetworkState(): Promise<NetworkState | null> {
    try {
      const res = await fetch(`${BASE_URL}/api/network/state`);
      if (!res.ok) return null;
      return await res.json();
    } catch { return null; }
  },

  getEventStream(): EventSource {
    return new EventSource(`${BASE_URL}/api/events/stream`);
  },

  getNetworkEventStream(): EventSource {
    return new EventSource(`${BASE_URL}/api/network/events/stream`);
  }
};
