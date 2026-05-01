import React, { useState, useEffect } from 'react';
import { ArenaClient } from '../api/client';
import type { CouncilEvent, RawLog } from '../types/contract';
import { SlotRenderer } from '../registry/index';
import { FileText, Activity, Terminal, Info, Clock, AlertCircle } from 'lucide-react';

const Logs: React.FC = () => {
  const [logs, setLogs] = useState<RawLog | null>(null);
  const [events, setEvents] = useState<CouncilEvent[]>([]);
  const [activeTab, setActiveTab] = useState<'RAW' | 'STREAM'>('STREAM');
  const [error, setError] = useState<boolean>(false);

  const fetchLogs = async () => {
    try {
      const data = await ArenaClient.getRawLogs(100);
      setLogs(data);
    } catch {
      console.error('Failed to fetch raw logs');
      setError(true);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (activeTab === 'RAW') fetchLogs();
    
    const interval = setInterval(() => {
      if (activeTab === 'RAW') fetchLogs();
    }, 10000);

    // SSE Setup
    const source = ArenaClient.getEventStream();
    source.onmessage = (event) => {
      try {
        const councilEvent = JSON.parse(event.data) as CouncilEvent;
        setEvents(prev => [councilEvent, ...prev].slice(0, 100));
        setError(false);
      } catch (_err) {
        console.error('Failed to parse SSE event', _err);
      }
    };

    source.onerror = () => {
      setError(true);
    };

    return () => {
      clearInterval(interval);
      source.close();
    };
  }, [activeTab]);

  return (
    <div className="p-12 space-y-12 max-w-[1600px] mx-auto h-screen flex flex-col animate-in fade-in duration-700">
      <header className="flex justify-between items-end border-b border-white/5 pb-8 shrink-0">
        <div className="space-y-2">
          <div className="flex items-center space-x-3 text-amber-500">
            <Activity size={24} />
            <h1 className="text-3xl font-black tracking-tighter uppercase italic">Provenance Stream</h1>
          </div>
          <p className="text-gray-500 text-sm font-medium tracking-wide">Real-time Scientific Event Rail & System Proofs</p>
        </div>

        <div className="flex bg-[#141414] p-1.5 rounded-xl border border-white/5 shadow-2xl">
          <button 
            onClick={() => setActiveTab('STREAM')}
            className={`flex items-center space-x-3 px-6 py-2.5 rounded-lg text-xs font-black transition-all uppercase tracking-[0.2em] ${
              activeTab === 'STREAM' ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20' : 'text-gray-500 hover:text-gray-200'
            }`}
          >
            <Activity size={14} />
            <span>Event Rail</span>
          </button>
          <button 
            onClick={() => setActiveTab('RAW')}
            className={`flex items-center space-x-3 px-6 py-2.5 rounded-lg text-xs font-black transition-all uppercase tracking-[0.2em] ${
              activeTab === 'RAW' ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20' : 'text-gray-500 hover:text-gray-200'
            }`}
          >
            <FileText size={14} />
            <span>System Proof</span>
          </button>
        </div>
      </header>

      <div className="flex-1 min-h-0 bg-[#0d0d0d] border border-white/5 rounded-2xl shadow-2xl overflow-hidden flex flex-col group">
        <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02] shrink-0">
          <div className="flex items-center space-x-3 text-gray-500">
            <Terminal size={14} className="group-hover:text-amber-500 transition-colors" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] italic">
              {activeTab === 'STREAM' ? 'Council Dialogue Stream' : 'Orchestrator Provenance Log'}
            </span>
          </div>
          <div className="flex items-center space-x-3">
            {error && <AlertCircle size={14} className="text-rose-500 animate-pulse" />}
            <div className={`flex items-center space-x-2 text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${
              error ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
            }`}>
              <div className={`w-1.5 h-1.5 rounded-full ${error ? 'bg-rose-500' : 'bg-emerald-500 animate-pulse'}`} />
              <span>{error ? 'Connection Lost' : 'Stream Synchronized'}</span>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto scrollbar-thin scrollbar-thumb-white/10 scroll-smooth">
          {activeTab === 'STREAM' ? (
            events.length > 0 ? (
              <SlotRenderer slot="SYSTEM_FEED" data={events} />
            ) : (
              <div className="h-full flex flex-col items-center justify-center space-y-4 opacity-30 grayscale">
                <Clock size={48} className="animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-[0.5em] italic">Awaiting Scientific Discourse...</span>
              </div>
            )
          ) : (
            <div className="p-10 font-mono text-[13px] leading-relaxed text-gray-400 selection:bg-blue-500/30">
              <pre className="whitespace-pre-wrap">{logs?.content || 'Synchronizing with remote orchestrator log...'}</pre>
            </div>
          )}
        </div>

        <div className="p-6 bg-black/40 border-t border-white/5 flex items-start space-x-4 shrink-0">
          <Info size={18} className="text-amber-500 shrink-0 mt-0.5 opacity-50" />
          <div className="space-y-1">
            <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest italic">Provenance Grounding Authority</h4>
            <p className="text-[9px] text-gray-600 uppercase leading-relaxed tracking-tighter font-medium max-w-4xl">
              Source: <code className="text-amber-500/70">{activeTab === 'STREAM' ? '/api/events/stream' : (logs?.path || 'PROVENANCE_PATH_MISSING')}</code>. 
              Truth Class: <span className="text-green-500/70 font-bold">GROUNDED</span>. Read-only operator access enforced. Event data is strictly immutable.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logs;
