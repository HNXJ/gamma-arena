import React, { useState, useEffect, useMemo } from 'react';
import { ArenaClient } from '../api/client';
import type { Agent } from '../types/contract';
import { SlotRenderer } from '../registry/index';
import { mapAgentState } from '../view-models/mappers';
import { ShieldCheck, Info } from 'lucide-react';

const Agents: React.FC = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAgents = async () => {
    try {
      const data = await ArenaClient.getAgents();
      setAgents(data);
    } catch {
      console.error('Failed to fetch agents');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchAgents();
    const interval = setInterval(fetchAgents, 5000);
    return () => clearInterval(interval);
  }, []);

  const agentViewModels = useMemo(() => agents.map(mapAgentState), [agents]);

  return (
    <div className="p-12 space-y-12 max-w-[1600px] mx-auto animate-in fade-in duration-700">
      <header className="flex justify-between items-end border-b border-white/5 pb-8">
        <div className="space-y-2">
          <div className="flex items-center space-x-3 text-amber-500">
            <ShieldCheck size={24} />
            <h1 className="text-3xl font-black tracking-tighter uppercase italic">Council Roster</h1>
          </div>
          <p className="text-gray-500 text-sm font-medium tracking-wide">Verified Scientific Agency & Evidence Surfaces</p>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-gray-600 uppercase tracking-[0.2em] font-bold">Protocol Status</div>
          <div className="text-sm font-mono font-bold text-emerald-500 uppercase tracking-tighter">SDE Consensus Active</div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Active Roster Strip */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-[#141414] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-white/5 bg-white/[0.01]">
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-[0.3em] italic">Grounded Agents</h2>
            </div>
            <div className="p-8">
              {loading && !agentViewModels.length ? (
                <div className="h-48 flex items-center justify-center opacity-20"><ShieldCheck className="animate-spin" size={48} /></div>
              ) : (
                <SlotRenderer slot="AGENT_STRIP" data={agentViewModels} />
              )}
            </div>
          </div>

          <div className="p-8 bg-amber-500/[0.02] border border-amber-500/10 rounded-2xl flex items-start space-x-4">
            <Info className="text-amber-500/50 shrink-0 mt-1" size={20} />
            <div className="space-y-2">
               <h3 className="text-xs font-bold text-amber-500 uppercase tracking-widest italic">Agency Mandate</h3>
               <p className="text-[10px] text-amber-500/70 leading-relaxed uppercase tracking-tight font-medium">
                 Every agent listed here represents a discrete research process. Evidence is filtered in real-time from the 
                 canonical orchestrator logs on the Office Mac.
               </p>
            </div>
          </div>
        </div>

        {/* Right Column: Evidence / Log Inspector Feed */}
        <div className="lg:col-span-8 h-fit">
          <SlotRenderer slot="LOG_INSPECTOR" data={agentViewModels} />
        </div>
      </div>
    </div>
  );
};

export default Agents;
