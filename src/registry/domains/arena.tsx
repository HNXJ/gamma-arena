import { registry } from '../core';
import { FeedCard } from '../../components/ui/FeedCard';
import { Milestone, Network } from 'lucide-react';
import type { ResearchViewModel } from '../../types/ui';
import type { NetworkState } from '../../types/contract';

export const registerArenaItems = () => {
  // --- ARENA_SIDEBAR ---
  registry.register({
    key: 'arena-promotion-gates',
    slot: 'ARENA_SIDEBAR',
    label: 'Promotion Gates',
    priority: 10,
    render: ({ data }: { data: unknown }) => {
      const research = data as ResearchViewModel;
      const isVipUnlocked = research.neuronCount >= research.targetCount && research.targetCount > 0;
      const isL4Unlocked = research.neuronCount >= 100;

      return (
        <FeedCard title="Promotion Gates" icon={Milestone}>
           <div className="space-y-6">
             <div className={`p-4 rounded-lg border ${isVipUnlocked ? 'bg-emerald-500/[0.02] border-emerald-500/20' : 'bg-white/[0.01] border-white/5'}`}>
               <div className="flex justify-between items-center mb-2">
                 <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">VIP Unlock</span>
                 <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded border ${
                   isVipUnlocked ? 'text-emerald-500 border-emerald-500/20' : 'text-gray-600 border-white/10'
                 }`}>{isVipUnlocked ? 'Grounded' : 'Locked'}</span>
               </div>
               <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                 <div className="h-full bg-amber-500" style={{ width: `${research.progressPercent}%` }} />
               </div>
             </div>

             <div className={`p-4 rounded-lg border ${isL4Unlocked ? 'bg-emerald-500/[0.02] border-emerald-500/20' : 'bg-white/[0.01] border-white/5'}`}>
               <div className="flex justify-between items-center mb-2">
                 <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Laminar</span>
                 <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded border ${
                   isL4Unlocked ? 'text-emerald-500 border-emerald-500/20' : 'text-gray-600 border-white/10'
                 }`}>{isL4Unlocked ? 'Grounded' : 'Locked'}</span>
               </div>
               <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                 <div className="h-full bg-blue-500" style={{ width: `${Math.min((research.neuronCount / 100) * 100, 100)}%` }} />
               </div>
             </div>
           </div>
        </FeedCard>
      );
    }
  });

  registry.register({
    key: 'arena-geometry-metadata',
    slot: 'ARENA_SIDEBAR',
    label: 'Live Geometry',
    priority: 20,
    render: ({ data }: { data: unknown }) => {
      const network = data as NetworkState | null;
      return (
        <div className="bg-[#141414] border border-white/5 rounded-xl p-6 space-y-6">
          <div className="flex items-center space-x-3 text-blue-500">
            <Network size={14} />
            <h3 className="text-[10px] font-bold uppercase tracking-widest italic">Live Geometry</h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-white/5">
              <span className="text-[10px] text-gray-500 uppercase font-bold tracking-tight">Active Nodes</span>
              <span className="text-[10px] font-mono font-bold text-blue-400">{network?.nodes.id.length || '--'}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-white/5">
              <span className="text-[10px] text-gray-500 uppercase font-bold tracking-tight">Synapse Count</span>
              <span className="text-[10px] font-mono font-bold text-amber-500">{network?.edges.src.length || '--'}</span>
            </div>
          </div>
        </div>
      );
    }
  });
};
