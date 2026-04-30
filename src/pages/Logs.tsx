import { useState, useEffect, useRef } from 'react';
import { ArenaClient } from '../api/client';
import { CouncilEvent, RawLog } from '../types/contract';

const Logs = () => {
  const [logs, setLogs] = useState<RawLog | null>(null);
  const [events, setEvents] = useState<CouncilEvent[]>([]);
  const [activeTab, setActiveTab] = useState<'RAW' | 'STREAM'>('STREAM');
  const eventSourceRef = useRef<EventSource | null>(null);

  const fetchLogs = async () => {
    try {
      const data = await ArenaClient.getRawLogs(50);
      setLogs(data);
    } catch (err) {
      console.error('Failed to fetch raw logs');
    }
  };

  useEffect(() => {
    fetchLogs();
    const interval = setInterval(fetchLogs, 5000);

    // SSE Setup
    const source = ArenaClient.getEventStream();
    source.onmessage = (event) => {
      try {
        const councilEvent = JSON.parse(event.data) as CouncilEvent;
        setEvents(prev => [councilEvent, ...prev].slice(0, 50));
      } catch (err) {
        console.error('Failed to parse SSE event', err);
      }
    };
    eventSourceRef.current = source;

    return () => {
      clearInterval(interval);
      source.close();
    };
  }, []);

  return (
    <div className="space-y-6 h-[calc(100vh-200px)] flex flex-col">
      <div className="flex gap-4">
        <button 
          onClick={() => setActiveTab('STREAM')}
          className={`px-4 py-2 text-xs font-bold tracking-widest uppercase transition-colors rounded ${
            activeTab === 'STREAM' ? 'bg-amber-500 text-black' : 'border border-amber-900/50 text-amber-700 hover:text-amber-500'
          }`}
        >
          Event Stream
        </button>
        <button 
          onClick={() => setActiveTab('RAW')}
          className={`px-4 py-2 text-xs font-bold tracking-widest uppercase transition-colors rounded ${
            activeTab === 'RAW' ? 'bg-amber-500 text-black' : 'border border-amber-900/50 text-amber-700 hover:text-amber-500'
          }`}
        >
          Raw Tail
        </button>
      </div>

      <div className="arena-panel flex-grow flex flex-col min-h-0">
        <div className="arena-header flex justify-between items-center">
          <span>{activeTab === 'STREAM' ? 'Live Council Dialogue' : 'Orchestrator Raw Output'}</span>
          <span className="text-[10px] text-green-500 animate-pulse">STREAMING</span>
        </div>
        
        <div className="p-4 flex-grow overflow-y-auto font-mono text-xs space-y-2 bg-black/80">
          {activeTab === 'STREAM' ? (
            events.length ? events.map((ev, i) => (
              <div key={i} className="border-l border-amber-900/30 pl-3 py-1 animate-in fade-in slide-in-from-left-2 duration-300">
                <span className="text-amber-700 mr-2">[{ev.data.time}]</span>
                <span className="text-amber-400 font-bold mr-2 uppercase tracking-tighter">{ev.data.agent}:</span>
                <span className="text-amber-200/90">{ev.data.msg}</span>
              </div>
            )) : <div className="text-amber-900 italic">Waiting for council dialogue...</div>
          ) : (
            <pre className="whitespace-pre-wrap text-amber-300/80 leading-relaxed">
              {logs?.content ?? 'Loading raw logs...'}
            </pre>
          )}
        </div>

        <div className="px-4 py-2 border-t border-amber-900/20 text-[10px] text-amber-800 flex justify-between">
          <span>Source: {activeTab === 'STREAM' ? '/api/events/stream' : logs?.path}</span>
          <span>Truth Class: GROUNDED</span>
        </div>
      </div>
    </div>
  );
};

export default Logs;
