
import { registry } from '../core';
import { RefreshCw, CheckCircle, Clock, Database } from 'lucide-react';
import { FeedCard } from '../../components/ui/FeedCard';
import type { ArenaViewModelBundle } from '../../types/ui';

export const registerPersistenceItems = () => {
  registry.registerTab({
    id: 'persistence',
    label: 'Persistence Layer',
    icon: 'Database',
    priority: 30,
    domain: 'PERSISTENCE'
  });

  registry.register({
    key: 'persistence-main-metrics',
    slot: 'PERSISTENCE',
    label: 'Persistence Metrics',
    priority: 10,
    render: ({ data }: { data: ArenaViewModelBundle }) => {
      const { persistence, transport } = data;
      
      const persistState = transport.endpointStates.find(s => s.name === 'Persistence');
      const isUnavailable = persistState?.kind === 'http_error' || persistState?.kind === 'network_error' || persistState?.kind === 'payload_error';

      if (isUnavailable) {
        return (
          <div className="p-12 border border-rose-500/20 bg-rose-500/5 rounded-2xl flex flex-col items-center space-y-4">
            <Database className="text-rose-500" size={32} />
            <div className="text-center space-y-1">
              <div className="text-sm font-black text-rose-500 uppercase tracking-widest">Recovery Substrate Unreachable</div>
              <div className="text-[10px] text-rose-500/60 font-bold uppercase">Persistence layer requires authoritative link for attestation</div>
            </div>
          </div>
        );
      }
      
      return (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeedCard title="Boot Type" severity="NORMAL" subtitle="System Initialization">
              <div className="text-xl font-black text-gray-100 uppercase">{persistence.bootType}</div>
            </FeedCard>
            <FeedCard title="Freshness" severity="NORMAL" subtitle="Data Integrity State">
              <div className="text-xl font-black text-emerald-500 uppercase">{persistence.freshness}</div>
            </FeedCard>
            <FeedCard title="Resume Count" severity="NORMAL" subtitle="Recovery Cycles">
              <div className="text-xl font-black text-amber-500 font-mono">{persistence.resumeCount}</div>
            </FeedCard>
            <FeedCard title="Layer Status" severity={persistence.status === 'GROUNDED' ? 'NORMAL' : 'CRITICAL'} subtitle="Substrate Connection">
              <div className="text-xl font-black text-gray-100 uppercase">{persistence.status}</div>
            </FeedCard>
          </div>

          <div className="bg-black/40 rounded-2xl border border-white/5 p-8 space-y-6">
            <div className="flex items-center space-x-3 text-emerald-500/60 uppercase tracking-[0.2em] font-black text-[10px]">
              <CheckCircle size={14} />
              <span>Observed Checkpoint Data</span>
            </div>
            <div className="text-[9px] font-bold text-gray-700 uppercase tracking-widest border-b border-white/5 pb-4">
              Checkpoint displays are observational summaries. Backend receipts remain the authority for committed state.
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-2">
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Last Grounded Checkpoint</div>
                <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl font-mono text-xs text-gray-300 break-all leading-relaxed">
                  {persistence.lastCheckpoint}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <RefreshCw size={14} className="text-emerald-500" />
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Recovery Substrate</span>
                  </div>
                  <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Verified</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <Clock size={14} className="text-amber-500" />
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Sync Latency</span>
                  </div>
                  <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Nominal</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  });

  // Safe-Base Summary Card
  registry.register({
    key: 'persistence-safe-summary',
    slot: 'SAFE_STATUS',
    label: 'Persistence Summary',
    priority: 50,
    render: ({ data }: { data: ArenaViewModelBundle }) => {
      const { persistence, transport } = data;
      
      const persistState = transport.endpointStates.find(s => s.name === 'Persistence');
      const isUnavailable = persistState?.kind === 'http_error' || persistState?.kind === 'network_error';

      if (isUnavailable) {
        return (
          <div className="p-4 border border-rose-500/10 bg-rose-500/5 rounded space-y-1">
            <div className="opacity-40 uppercase tracking-tighter">Persistence</div>
            <div className="text-[10px] font-black text-rose-500 uppercase">LINK_FAILURE</div>
          </div>
        );
      }
      
      return (
        <div className="p-4 border border-emerald-500/10 bg-emerald-500/5 rounded space-y-2">
          <div className="opacity-40 uppercase tracking-tighter">Persistence</div>
          <div className="flex justify-between items-center">
            <div className="text-sm font-black uppercase text-emerald-400">{persistence.freshness}</div>
            <div className="text-[10px] opacity-40">RESUMES: {persistence.resumeCount}</div>
          </div>
        </div>
      );
    }
  });
};
