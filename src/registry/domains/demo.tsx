
import { registry } from '../core';
import { Layout, MessageSquare } from 'lucide-react';
import type { ArenaViewModelBundle } from '../../types/ui';

export const registerDemoItems = () => {
  // Gate demo content to development mode only
  const isDev = (import.meta as unknown as { env: { DEV: boolean } }).env.DEV;
  
  if (!isDev) return;

  registry.register({
    key: 'operator-guidance-notice',
    slot: 'RIGHT_RAIL',
    label: 'Operator Note (DEV)',
    priority: 0,
    stickiness: 'PINNED',
    render: () => (
      <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-start space-x-3">
        <MessageSquare size={14} className="text-blue-500 mt-0.5" />
        <div className="space-y-1">
          <div className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Operator Guidance (DEV)</div>
          <div className="text-[11px] font-bold text-gray-300 uppercase leading-relaxed">
            Registry decentralized. Feed semantics active. Hardening Phase 4 confirmed.
          </div>
        </div>
      </div>
    )
  });

  registry.register({
    key: 'research-milestone-marker',
    slot: 'MAIN_FEED',
    label: 'Research Milestone (DEV)',
    priority: 5,
    render: ({ data }: { data: ArenaViewModelBundle }) => (
      <div className="p-6 bg-amber-500/5 border border-amber-500/20 rounded-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <Layout size={48} className="text-amber-500" />
        </div>
        <div className="space-y-3 relative z-10">
          <div className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-500 italic">Major Milestone</span>
          </div>
          <h3 className="text-lg font-black tracking-tighter text-gray-100 italic uppercase">Architecture Seal Confirmed</h3>
          <p className="text-xs text-gray-400 font-medium leading-relaxed max-w-md">
            The Phase 4 hardening pass has successfully sealed the operator console's structural boundaries.
          </p>
          <div className="text-[10px] font-bold text-gray-600 uppercase">
            Official Level: {data.research.officialNeuronCount}N
          </div>
        </div>
      </div>
    )
  });
};
