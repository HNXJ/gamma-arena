import React, { createContext, useContext, useState, useEffect, useMemo, type ReactNode } from 'react';
import { labyrinthClient } from '../api/client';
import { 
  mapLabyrinthState, 
  mapAgentsState, 
  mapPersistenceState,
  mapAgentSocietyState,
  mapMissionState,
  mapTransportState,
  type LabyrinthViewModelBundle 
} from '../view-models/mappers';
import type { 
  FetchEnvelope, 
} from '../types/ui';
import type { LabyrinthStatus, Agent, Persistence, RawLog, AgentSociety, MissionObservation } from '../types/contract';

interface LabyrinthContextType {
  viewModels: LabyrinthViewModelBundle;
  transport: {
    status: FetchEnvelope<LabyrinthStatus> | null;
    agents: FetchEnvelope<Agent[]> | null;
    persistence: FetchEnvelope<Persistence> | null;
    society: FetchEnvelope<AgentSociety> | null;
    mission: FetchEnvelope<MissionObservation> | null;
    logs: FetchEnvelope<RawLog[]> | null;
  };
  isLoading: boolean;
  refresh: () => Promise<void>;
}

const LabyrinthContext = createContext<LabyrinthContextType | undefined>(undefined);

export const LabyrinthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [statusEnv, setStatusEnv] = useState<FetchEnvelope<LabyrinthStatus> | null>(null);
  const [agentsEnv, setAgentsEnv] = useState<FetchEnvelope<Agent[]> | null>(null);
  const [persistenceEnv, setPersistenceEnv] = useState<FetchEnvelope<Persistence> | null>(null);
  const [societyEnv, setSocietyEnv] = useState<FetchEnvelope<AgentSociety> | null>(null);
  const [missionEnv, setMissionEnv] = useState<FetchEnvelope<MissionObservation> | null>(null);
  const [logsEnv, setLogsEnv] = useState<FetchEnvelope<RawLog[]> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = async () => {
    try {
      const [s, a, p, soc, m, l] = await Promise.all([
        labyrinthClient.getStatus(),
        labyrinthClient.getAgents(),
        labyrinthClient.getPersistence(),
        labyrinthClient.getAgentSociety(),
        labyrinthClient.getMissionLatest(),
        labyrinthClient.getRawLogs()
      ]);
      
      setStatusEnv(s);
      setAgentsEnv(a);
      setPersistenceEnv(p);
      setSocietyEnv(soc);
      setMissionEnv(m);
      setLogsEnv(l);
    } catch (err) {
      console.error('Fatal fetch orchestration error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      await refresh();
    };
    init();
    const interval = setInterval(refresh, 2000);
    return () => clearInterval(interval);
  }, []);

  const bundle = useMemo(() => {
    const { system, research } = mapLabyrinthState(statusEnv?.data || null);
    const agents = mapAgentsState(agentsEnv?.data || null);
    const persistence = mapPersistenceState(persistenceEnv?.data || null);
    const society = mapAgentSocietyState(societyEnv?.data || null);
    const mission = mapMissionState(missionEnv?.data || null);
    const transport = mapTransportState({
      status: statusEnv,
      agents: agentsEnv,
      persistence: persistenceEnv,
      society: societyEnv,
      mission: missionEnv,
      logs: logsEnv
    });

    return {
      system,
      research,
      agents,
      persistence,
      society,
      mission,
      transport,
      logs: Array.isArray(logsEnv?.data) ? logsEnv.data : []
    };
  }, [statusEnv, agentsEnv, persistenceEnv, societyEnv, missionEnv, logsEnv]);

  return (
    <LabyrinthContext.Provider value={{ 
      viewModels: bundle, 
      transport: { 
        status: statusEnv, 
        agents: agentsEnv, 
        persistence: persistenceEnv,
        society: societyEnv,
        mission: missionEnv,
        logs: logsEnv
      },
      isLoading, 
      refresh 
    }}>
      {children}
    </LabyrinthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLabyrinth = () => {
  const context = useContext(LabyrinthContext);
  if (!context) throw new Error('useLabyrinth must be used within LabyrinthProvider');
  return context;
};
