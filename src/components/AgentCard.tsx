import React from 'react';
import type { AgentViewModel } from '../types/ui';
import { Activity } from 'lucide-react';

export const AgentCard: React.FC<{ agent: AgentViewModel }> = ({ agent }) => (
  <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl group hover:bg-white/[0.04] transition-all relative overflow-hidden">
    <div className={`absolute top-0 left-0 w-1 bottom-0 ${
      agent.statusSeverity === 'ACTIVE' ? 'bg-emerald-500' : 
      agent.statusSeverity === 'CRITICAL' ? 'bg-rose-500' : 'bg-gray-700'
    }`} />
    
    <div className="flex justify-between items-start">
      <div className="space-y-1">
        <div className="flex items-center space-x-2">
          <span className="text-[10px] font-black uppercase text-amber-500/80 tracking-[0.2em]">{agent.id}</span>
          <span className="text-[8px] text-gray-600 font-bold uppercase">:: {agent.source}</span>
        </div>
        <h3 className="text-sm font-black text-gray-200 tracking-tight uppercase italic">{agent.role}</h3>
      </div>
      <div className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${
        agent.truthClass === 'GROUNDED' ? 'text-emerald-500 bg-emerald-500/10' : 'text-gray-500 bg-white/5'
      }`}>
        {agent.truthClass}
      </div>
    </div>

    <div className="mt-4 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Activity size={12} className={agent.statusSeverity === 'ACTIVE' ? 'text-emerald-500 animate-pulse' : 'text-gray-700'} />
        <span className={`text-[10px] font-bold uppercase tracking-widest ${
          agent.statusSeverity === 'CRITICAL' ? 'text-rose-500' : 'text-gray-500'
        }`}>
          {agent.status}
        </span>
      </div>
      <div className="text-[9px] font-bold text-gray-700 uppercase">
        Last: {agent.lastActive}
      </div>
    </div>

    {agent.blocker && (
      <div className="mt-4 p-2 bg-rose-500/10 border border-rose-500/20 rounded text-[9px] font-black text-rose-500 uppercase tracking-widest flex items-center space-x-2">
        <div className="w-1 h-1 rounded-full bg-rose-500 animate-ping" />
        <span>Blocker: {agent.blocker}</span>
      </div>
    )}
  </div>
);
