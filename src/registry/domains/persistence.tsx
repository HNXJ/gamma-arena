
import { registry } from '../core';
import { RefreshCw, CheckCircle, Clock } from 'lucide-react';
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
      const { persistence } = data;
      
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
              <span>Authoritative Checkpoint Data</span>
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
      const { persistence } = data;
      
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
