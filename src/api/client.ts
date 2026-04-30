import { 
  ArenaStatus, 
  Progression, 
  Agent, 
  Persistence, 
  SystemStatus, 
  RawLog 
} from '../types/contract';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3012';

async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`);
  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }
  return response.json();
}

export const ArenaClient = {
  getStatus: () => fetchJson<ArenaStatus>('/api/status'),
  getProgression: () => fetchJson<Progression>('/api/progression'),
  getAgents: () => fetchJson<Agent[]>('/api/agents'),
  getPersistence: () => fetchJson<Persistence>('/api/persistence'),
  getHealth: () => fetchJson<SystemStatus & { last_signal: string | null }>('/api/health'),
  getRawLogs: (lines = 100) => fetchJson<RawLog>(`/api/logs/raw?lines=${lines}`),
  
  getEventStream: () => {
    return new EventSource(`${API_BASE_URL}/api/events/stream`);
  }
};
