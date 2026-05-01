import React, { useState, useEffect } from 'react';
import { ArenaClient } from '../api/client';
import type { AgentLogResponse } from '../types/contract';
import { Terminal, History } from 'lucide-react';

export const AgentLogPanel: React.FC<{ agentId: string, role: string }> = ({ agentId, role }) => {
  const [logData, setLogData] = useState<AgentLogResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchLogs = React.useCallback(async () => {
    try {
      const data = await ArenaClient.getAgentLogs(agentId);
      setLogData(data);
    } catch {
      console.error(`Failed to fetch logs for ${agentId}`);
    } finally {
      setLoading(false);
    }
  }, [agentId]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchLogs();
    const interval = setInterval(fetchLogs, 5000);
    return () => clearInterval(interval);
  }, [fetchLogs]);

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
