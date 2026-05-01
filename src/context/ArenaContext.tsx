import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { ArenaClient } from '../api/client';
import { mapSystemState, mapResearchState, mapAgentState } from '../view-models/mappers';
import type { ArenaStatus, Agent } from '../types/contract';
import type { SystemViewModel, ResearchViewModel, AgentViewModel } from '../types/ui';

interface ArenaContextType {
  status: ArenaStatus | null;
  agents: Agent[];
  loading: boolean;
  error: string | null;
  viewModels: {
    system: SystemViewModel;
    research: ResearchViewModel;
    agents: AgentViewModel[];
  };
  refresh: () => Promise<void>;
}

const ArenaContext = createContext<ArenaContextType | undefined>(undefined);

export const ArenaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [status, setStatus] = useState<ArenaStatus | null>(null);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const [statusData, agentsData] = await Promise.all([
        ArenaClient.getStatus(),
        ArenaClient.getAgents()
      ]);
      setStatus(statusData);
      setAgents(agentsData);
      setLoading(false);
      setError(null);
    } catch (_err) {
      setError('Connection Interrupted');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, []);

  const viewModels = useMemo(() => ({
    system: mapSystemState(status),
    research: mapResearchState(status),
    agents: (agents || []).map(mapAgentState)
  }), [status, agents]);

  return (
    <ArenaContext.Provider value={{
      status,
      agents,
      loading,
      error,
      viewModels,
      refresh: fetchData
    }}>
      {children}
    </ArenaContext.Provider>
  );
};

export const useArena = () => {
  const context = useContext(ArenaContext);
  if (!context) throw new Error('useArena must be used within ArenaProvider');
  return context;
};
