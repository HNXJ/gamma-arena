import React, { useState, useEffect, useMemo } from 'react';
import { ArenaClient } from '../api/client';
import type { ArenaStatus, Agent } from '../types/contract';
import { SlotRenderer } from '../registry/index';
import { mapSystemState, mapResearchState, mapAgentState } from '../view-models/mappers';
import { LayoutDashboard, Activity } from 'lucide-react';

const Overview: React.FC = () => {
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
      console.error('Fetch error details:', _err);
      setError('Connection Interrupted - Attempting Re-sync');
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData();
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, []);

  const viewModels = useMemo(() => ({
    system: mapSystemState(status),
    research: mapResearchState(status),
    agents: agents.map(mapAgentState)
  }), [status, agents]);

  if (loading && !status) {
    return (
      <div className="h-full flex items-center justify-center bg-[#0a0a0a]">
        <div className="flex flex-col items-center space-y-4">
          <Activity className="text-amber-500 animate-spin" size={40} />
          <span className="text-xs font-bold text-amber-500 uppercase tracking-[0.3em] animate-pulse">Establishing Operator Link...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-12 space-y-12 max-w-[1600px] mx-auto animate-in fade-in zoom-in-95 duration-700">
      <header className="flex justify-between items-end border-b border-white/5 pb-8">
        <div className="space-y-2">
          <div className="flex items-center space-x-3 text-amber-500">
            <LayoutDashboard size={24} />
            <h1 className="text-3xl font-black tracking-tighter uppercase italic">Mission Overview</h1>
          </div>
          <p className="text-gray-500 text-sm font-medium tracking-wide">Hardened Observability Surface for Amber Arena v1.6</p>
          {viewModels.research.topic && (
            <div className="pt-4 flex items-center space-x-3">
              <span className="text-[10px] font-black uppercase text-amber-500/80 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 tracking-widest">Active Mission</span>
              <span className="text-xs font-bold text-gray-300 italic tracking-tight underline decoration-amber-500/30 underline-offset-4">{viewModels.research.topic}</span>
            </div>
          )}
        </div>
        <div className="text-right flex flex-col items-end space-y-2">
          <div className="flex items-center space-x-2">
            <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">Sys Status:</span>
            <span className={`text-xs font-black uppercase ${viewModels.system.statusSeverity === 'CRITICAL' ? 'text-rose-500' : 'text-emerald-500'}`}>
              {viewModels.system.status}
            </span>
          </div>
          <div className={`flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${
            error || viewModels.system.statusSeverity === 'WARNING' ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
          }`}>
            <div className={`w-1.5 h-1.5 rounded-full ${error || viewModels.system.statusSeverity === 'WARNING' ? 'bg-rose-500' : 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]'}`} />
            <span>Heartbeat: {viewModels.system.heartbeat}</span>
          </div>
        </div>
      </header>

      {/* Top Level Summary Cards Slot */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        <SlotRenderer slot="TOP_SUMMARY" data={viewModels.system} state={viewModels} />
        {/* We can also pass different data to different slots or use a unified 'data' prop if needed */}
        {/* For now, let's just use the viewModels as needed in the renderers */}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
        {/* Main Feed Column */}
        <div className="xl:col-span-8 space-y-12">
          <SlotRenderer slot="MAIN_FEED" data={viewModels.agents} state={viewModels} />
        </div>

        {/* Right Rail Column */}
        <div className="xl:col-span-4 space-y-12">
          <SlotRenderer slot="RIGHT_RAIL" data={viewModels.system} state={viewModels} />
        </div>
      </div>
    </div>
  );
};

export default Overview;
