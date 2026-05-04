
import { registry } from '../core';
import type { ArenaViewModelBundle } from '../../types/ui';

export const registerLogItems = () => {
  registry.registerTab({
    id: 'logs',
    label: 'Provenance Rail',
    icon: 'FileText',
    priority: 40,
    domain: 'LOGS'
  });

  registry.register({
    key: 'system-raw-log-feed',
    slot: 'LOGS',
    label: 'Event Stream',
    priority: 10,
    render: ({ data }: { data: ArenaViewModelBundle }) => {
      const { transport, logs } = data;
      
      const logState = transport.endpointStates.find(s => s.name === 'Provenance Rail');
      const isUnavailable = logState?.kind === 'http_error' || logState?.kind === 'network_error';
      const isLoading = logState?.kind === 'loading';

      return (
        <div className="bg-black/40 rounded-2xl border border-white/5 p-8">
          <div className="text-[10px] font-black text-gray-600 uppercase tracking-[0.4em] mb-4">
            System Provenance Stream
          </div>
          <div className="text-[9px] font-bold text-gray-700 uppercase tracking-widest mb-8 pb-4 border-b border-white/5">
            Raw event visibility is observational. Events do not become truth without backend receipt acceptance.
          </div>
          
          <div className="space-y-4 font-mono text-[11px]">
            {isLoading ? (
              <div className="text-gray-500 animate-pulse">[LOADING] :: INITIALIZING PROVENANCE STREAM...</div>
            ) : isUnavailable ? (
              <div className="p-4 border border-rose-500/20 bg-rose-500/5 text-rose-500/80 italic font-bold">
                [TRANSPORT_DEGRADED] :: AUTHORITATIVE PROVENANCE FEED UNAVAILABLE :: {logState?.detail}
              </div>
            ) : logs.length === 0 ? (
              <div className="text-gray-600 italic">
                [SUBSTRATE_EMPTY] :: NO RAW EVENTS RECORDED IN CURRENT SESSION
              </div>
            ) : (
              <div className="space-y-2 max-h-[600px] overflow-auto scrollbar-thin scrollbar-thumb-white/5">
                {logs.map((log, i) => (
                  <div key={i} className="group flex space-x-4 border-b border-white/[0.02] pb-2">
                    <span className="text-gray-600 shrink-0 select-none">[{i.toString().padStart(4, '0')}]</span>
                    <div className="space-y-1">
                       <div className="text-gray-500 group-hover:text-gray-400">{log.path}</div>
                       <div className="text-gray-300 whitespace-pre-wrap break-all leading-relaxed">{log.content}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      );
    }
  });
};
