import type { ArenaStatus, Agent, Persistence, RawLog, AgentLogResponse } from '../types/contract';
import type { FetchEnvelope } from '../types/ui';

const BASE_URL = import.meta.env.VITE_GAMMA_API_BASE || 'https://glllmx.vercel.app';

async function wrapFetch<T>(path: string): Promise<FetchEnvelope<T>> {
  const timestamp = new Date().toISOString();
  try {
    const response = await fetch(`${BASE_URL}${path}`);
    
    if (!response.ok) {
      return {
        ok: false,
        status: response.status,
        kind: 'http_error',
        data: null,
        error: `HTTP ${response.status}: ${response.statusText}`,
        receivedAt: timestamp
      };
    }

    try {
      const data = await response.json();
      const isEmpty = Array.isArray(data) ? data.length === 0 : !data;
      
      return {
        ok: true,
        status: response.status,
        kind: isEmpty ? 'success_empty' : 'success_populated',
        data,
        receivedAt: timestamp
      };
    } catch {
      return {
        ok: false,
        status: response.status,
        kind: 'payload_error',
        data: null,
        error: 'Malformed JSON payload',
        receivedAt: timestamp
      };
    }
  } catch {
    return {
      ok: false,
      status: null,
      kind: 'network_error',
      data: null,
      error: 'Network failure',
      receivedAt: timestamp
    };
  }
}

export const arenaClient = {
  async getStatus(): Promise<FetchEnvelope<ArenaStatus>> {
    return wrapFetch<ArenaStatus>('/api/v1/status');
  },

  async getAgents(): Promise<FetchEnvelope<Agent[]>> {
    return wrapFetch<Agent[]>('/api/v1/agents');
  },

  async getPersistence(): Promise<FetchEnvelope<Persistence>> {
    return wrapFetch<Persistence>('/api/v1/persistence');
  },

  async getRawLogs(): Promise<FetchEnvelope<RawLog[]>> {
    return wrapFetch<RawLog[]>('/api/v1/events/recent');
  },

  async getAgentLogs(agentId: string): Promise<FetchEnvelope<AgentLogResponse>> {
    return wrapFetch<AgentLogResponse>(`/api/v1/logs/agent/${agentId}`);
  }
};
