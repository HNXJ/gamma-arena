/* eslint-disable @typescript-eslint/no-explicit-any */
import { registry } from '../core';
import { ShieldAlert } from 'lucide-react';
import { FeedCard } from '../../components/ui/FeedCard';
import type { SystemViewModel } from '../../types/ui';

export const registerOverviewItems = () => {
  // Register the Lobby Tab
  registry.registerTab({
    id: 'lobby',
    label: 'Mission Lobby',
    icon: 'LayoutDashboard',
    priority: 10,
    domain: 'OVERVIEW'
  });

  // Safe-Base Status
  registry.register({
    key: 'safe-status-overview',
    slot: 'SAFE_STATUS',
    label: 'System Status',
    priority: 1,
    render: ({ data }: { data: SystemViewModel }) => (
      <div className="flex items-center space-x-2">
        <div className={`w-2 h-2 rounded-full ${data.statusSeverity === 'CRITICAL' ? 'bg-rose-500' : 'bg-emerald-500'}`} />
        <span className="font-black uppercase">{data.status}</span>
      </div>
    )
  });

  // Extended-Base Lobby Content
  registry.register({
    key: 'lobby-metrics-grid',
    slot: 'LOBBY',
    label: 'Core Metrics',
    priority: 10,
    render: ({ data }: { data: any }) => {
      const system = data.system as SystemViewModel;
      return (
        <div className="grid grid-cols-3 gap-6">
          <FeedCard 
            title="Heartbeat" 
            severity={system.statusSeverity} 
            subtitle="Real-time Substrate Telemetry"
          >
            <div className="text-2xl font-black text-gray-100 font-mono tracking-tighter uppercase">{system.heartbeat}</div>
          </FeedCard>
          <div className="text-right">
            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Active Neurons</div>
            <div className="text-sm font-black text-amber-500 font-mono tracking-tighter">
              {data.research.neuronCount} / {data.research.targetCount}
            </div>
          </div>
          <FeedCard 
            title="Active Slots" 
            severity="NORMAL" 
            subtitle="Model Occupancy"
          >
            <div className="text-2xl font-black text-gray-100 font-mono tracking-tighter">{system.slots}</div>
          </FeedCard>
        </div>
      );
    }
  });

  registry.register({
    key: 'safe-blocker-list',
    slot: 'SAFE_BLOCKERS',
    label: 'Critical Blockers',
    priority: 1,
    render: ({ data }: { data: SystemViewModel }) => (
      <div className="p-4 space-y-2">
        {data.blockers?.length > 0 ? (
          data.blockers.map((b, i) => (
            <div key={i} className="flex items-center space-x-2 text-rose-500 font-black uppercase tracking-widest">
              <ShieldAlert size={12} />
              <span>{b}</span>
            </div>
          ))
        ) : (
          <div className="text-emerald-500/40 italic">No active blockers detected.</div>
        )}
      </div>
    )
  });
};
