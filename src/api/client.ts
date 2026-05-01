import type { ArenaStatus, Progression, Agent, RawLog, NetworkState, AgentLogResponse } from '../types/contract';

const BASE_URL = import.meta.env.VITE_GAMMA_API_BASE || 'http://localhost:3013';

export const ArenaClient = {
  async getStatus(): Promise<ArenaStatus> {
    const res = await fetch(`${BASE_URL}/api/status`);
    return res.json();
  },

  async getProgression(): Promise<Progression> {
    const res = await fetch(`${BASE_URL}/api/progression`);
    return res.json();
  },

  async getAgents(): Promise<Agent[]> {
    const res = await fetch(`${BASE_URL}/api/agents`);
    return res.json();
  },

  async getAgentLogs(agentId: string): Promise<AgentLogResponse> {
    const res = await fetch(`${BASE_URL}/api/agents/${agentId}/logs`);
    return res.json();
  },

  async getPersistence(): Promise<any> {
    const res = await fetch(`${BASE_URL}/api/persistence`);
    return res.json();
  },

  async getRawLogs(lines: number = 100): Promise<RawLog> {
    const res = await fetch(`${BASE_URL}/api/logs/raw?lines=${lines}`);
    return res.json();
  },

  async getNetworkState(): Promise<NetworkState> {
    const res = await fetch(`${BASE_URL}/api/network/state`);
    return res.json();
  },

  getEventStream(): EventSource {
    return new EventSource(`${BASE_URL}/api/events/stream`);
  },

  getNetworkEventStream(): EventSource {
    return new EventSource(`${BASE_URL}/api/network/events/stream`);
  }
};
