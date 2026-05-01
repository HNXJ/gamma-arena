import React, { useState, useEffect } from 'react';
import { ArenaClient } from '../api/client';
import type { Agent, AgentLogResponse } from '../types/contract';
import { AgentCard } from '../components/AgentCard';
import { ShieldCheck, History, Info, Terminal } from 'lucide-react';

const AgentLogPanel: React.FC<{ agentId: string, role: string }> = ({ agentId, role }) => {
  const [logData, setLogData] = useState<AgentLogResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    try {
      const data = await ArenaClient.getAgentLogs(agentId);
      setLogData(data);
    } catch (err) {
      console.error(`Failed to fetch logs for ${agentId}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
    const interval = setInterval(fetchLogs, 5000);
    return () => clearInterval(interval);
  }, [agentId]);

  return (
    <div className="bg-[#0d0d0d] border border-white/5 rounded-xl overflow-hidden shadow-xl h-64 flex flex-col group">
      <div className="px-4 py-2 border-b border-white/5 bg-white/[0.01] flex items-center justify-between">
        <div className="flex items-center space-x-2 text-gray-500">
          <Terminal size={12} className="group-hover:text-amber-500 transition-colors" />
          <span className="text-[10px] font-bold uppercase tracking-widest">{agentId} Evidence</span>
        </div>
        <span className="text-[8px] font-bold text-gray-700 uppercase tracking-tighter italic">{role}</span>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-3 font-mono">
        {loading && !logData ? (
          <div className="h-full flex items-center justify-center">
            <div className="w-4 h-4 border border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
          </div>
        ) : logData?.logs.length ? (
          logData.logs.map((entry, i) => (
            <div key={i} className="text-[10px] leading-relaxed border-l border-white/5 pl-3 py-1 hover:border-amber-500/30 transition-colors">
              <span className="text-gray-600 mr-2">[{entry.time.split(' ')[1]}]</span>
              <span className="text-gray-300">{entry.msg}</span>
            </div>
          ))
        ) : (
          <div className="h-full flex flex-col items-center justify-center opacity-20 grayscale scale-75">
            <History size={32} />
            <span className="text-[8px] font-bold uppercase tracking-widest mt-2">No Grounded Evidence</span>
          </div>
        )}
      </div>

      <div className="px-4 py-2 border-t border-white/5 bg-black/40 flex justify-between items-center">
        <div className="flex items-center space-x-2">
           <div className={`w-1.5 h-1.5 rounded-full ${logData?.truth_class === 'GROUNDED' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-gray-700'}`} />
           <span className="text-[8px] font-bold text-gray-600 uppercase tracking-widest">{logData?.truth_class || 'SYNCING'}</span>
        </div>
        <span className="text-[8px] text-gray-700 uppercase tracking-tighter truncate max-w-[100px]">Src: {logData?.source || '---'}</span>
      </div>
    </div>
  );
};

const Agents: React.FC = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAgents = async () => {
    try {
      const data = await ArenaClient.getAgents();
      setAgents(data);
    } catch (err) {
      console.error('Failed to fetch agents');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgents();
    const interval = setInterval(fetchAgents, 5000);
    return () => clearInterval(interval);
  }, []);

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
        {/* Left Column: Active Roster */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-[#141414] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-white/5 bg-white/[0.01]">
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-[0.3em] italic">Grounded Agents</h2>
            </div>
            <div className="p-8 space-y-6">
              {loading && !agents.length ? (
                <div className="h-48 flex items-center justify-center opacity-20"><ShieldCheck className="animate-spin" size={48} /></div>
              ) : agents.map(agent => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
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

        {/* Right Column: Evidence Surfaces */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8 h-fit">
          {agents.map(agent => (
            <AgentLogPanel key={agent.id} agentId={agent.id} role={agent.role} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Agents;
