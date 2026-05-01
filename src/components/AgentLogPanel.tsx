import React, { useState, useEffect } from 'react';
import { arenaClient as ArenaClient } from '../api/client';
import type { AgentLogResponse } from '../types/contract';
import { Terminal, History, AlertTriangle, Loader2 } from 'lucide-react';
import type { FetchEnvelope } from '../types/ui';

interface AgentLogPanelProps {
  agentId: string;
}

export const AgentLogPanel: React.FC<AgentLogPanelProps> = ({ agentId }) => {
  const [envelope, setEnvelope] = useState<FetchEnvelope<AgentLogResponse> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      setIsLoading(true);
      const res = await ArenaClient.getAgentLogs(agentId);
      setEnvelope(res);
      setIsLoading(false);
    };
    fetchLogs();
  }, [agentId]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 space-y-4">
        <Loader2 size={24} className="text-[#D4AF37] animate-spin" />
        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Inverting Agent Provenance...</span>
      </div>
    );
  }

  if (envelope?.kind === 'http_error' || envelope?.kind === 'network_error' || envelope?.kind === 'payload_error') {
    return (
      <div className="p-8 border border-rose-500/20 bg-rose-500/5 rounded-2xl space-y-4">
        <div className="flex items-center space-x-3 text-rose-500">
          <AlertTriangle size={18} />
          <h3 className="text-sm font-black uppercase tracking-widest">Provenance Failure</h3>
        </div>
        <p className="text-xs text-rose-500/60 font-bold leading-relaxed">
          {envelope.error || 'The agent provenance stream is currently unreachable.'}
        </p>
      </div>
    );
  }

  const logs = envelope?.data?.logs || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <History size={18} className="text-[#D4AF37]" />
          <h2 className="text-sm font-black text-gray-100 uppercase tracking-widest italic">Agent Interaction Log</h2>
        </div>
        <div className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">
          ID: <span className="text-[#D4AF37]">{agentId}</span>
        </div>
      </div>

      <div className="bg-[#0d0d0d] rounded-2xl border border-white/5 overflow-hidden">
        <div className="p-4 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Terminal size={14} className="text-emerald-500" />
            <span className="text-[10px] font-black text-emerald-500/80 uppercase tracking-widest">Encrypted Stream</span>
          </div>
          <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Authoritative: {envelope?.data?.truth_class || 'UNKNOWN'}</span>
        </div>
        
        <div className="max-h-[400px] overflow-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-white/10">
          {logs.length > 0 ? (
            logs.map((log, i) => (
              <div key={i} className="flex space-x-4 group">
                <div className="text-[10px] font-mono text-gray-600 pt-1 shrink-0 group-hover:text-gray-400 transition-colors">
                  {new Date(log.time).toLocaleTimeString([], { hour12: false })}
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] font-black text-[#D4AF37] uppercase tracking-wider">{log.agent}</div>
                  <div className="text-xs text-gray-300 leading-relaxed font-medium group-hover:text-white transition-colors">
                    {log.msg}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 text-center space-y-2">
              <div className="text-[10px] font-black text-gray-600 uppercase tracking-widest">No Events Recorded</div>
              <div className="text-[10px] font-bold text-gray-700 uppercase">Awaiting Substrate Interaction</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
