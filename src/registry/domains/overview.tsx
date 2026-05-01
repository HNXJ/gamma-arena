
import { registry } from '../core';
import { ShieldAlert } from 'lucide-react';
import { FeedCard } from '../../components/ui/FeedCard';
import type { ArenaViewModelBundle } from '../../types/ui';

export const registerOverviewItems = () => {
  registry.register({
    key: 'overview-status-strip',
    slot: 'LOBBY',
    label: 'System Status Strip',
    priority: 10,
    render: ({ data }: { data: ArenaViewModelBundle }) => {
      const bundle = data;
      const { system, research } = bundle;
      
      return (
        <div className="space-y-8">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <div className="flex items-center space-x-4">
              <FeedCard 
                title="System" 
                severity={system.statusSeverity} 
                subtitle="Current Substrate State"
              >
                <div className="text-2xl font-black text-gray-100 font-mono tracking-tighter uppercase">{system.status}</div>
              </FeedCard>
              <FeedCard 
                title="Heartbeat" 
                severity="NORMAL" 
                subtitle="Pulse Synchronicity"
              >
                <div className="text-2xl font-black text-gray-100 font-mono tracking-tighter uppercase">{system.heartbeat}</div>
              </FeedCard>
            </div>

            <div className="flex items-center space-x-12 pr-4">
              <div className="text-right space-y-1">
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Official Level</div>
                <div className="text-xl font-black text-emerald-500 font-mono tracking-tighter">
                  {research.officialNeuronCount} <span className="text-[10px] text-gray-600">N</span>
                </div>
              </div>
              <div className="text-right space-y-1">
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Largest PASS Network</div>
                <div className="text-xl font-black text-amber-500 font-mono tracking-tighter">
                  {research.largestGroundedPassNetwork} <span className="text-[10px] text-gray-600">N</span>
                </div>
              </div>
            </div>
          </div>

          {system.blockers.length > 0 && (
            <div className="p-6 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-start space-x-4">
              <ShieldAlert className="text-rose-500 shrink-0" size={24} />
              <div className="space-y-1">
                <h3 className="text-sm font-black text-rose-500 uppercase tracking-widest">Critical Substrate Blockers</h3>
                <p className="text-xs text-rose-500/60 font-bold uppercase">{system.blockers.join(' | ')}</p>
              </div>
            </div>
          )}
        </div>
      );
    }
  });
};
