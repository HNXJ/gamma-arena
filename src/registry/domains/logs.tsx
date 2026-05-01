/* eslint-disable @typescript-eslint/no-explicit-any */
import { registry } from '../core';

export const registerLogItems = () => {
  // Register the Logs Tab
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
    render: () => (
      <div className="bg-black/40 rounded-2xl border border-white/5 p-8">
        <div className="text-[10px] font-black text-gray-600 uppercase tracking-[0.4em] mb-8">System Provenance Stream</div>
        <div className="space-y-4 font-mono text-[11px]">
          <div className="text-gray-500">[2026-05-01 12:13:45] :: SYS :: Registry decentralized</div>
          <div className="text-gray-500">[2026-05-01 12:13:46] :: SYS :: Two-Base architecture mounted</div>
          <div className="text-emerald-500/80">[2026-05-01 12:13:47] :: INFO :: ExtendedBase initialized</div>
          <div className="text-amber-500/80">[2026-05-01 12:13:48] :: WARN :: Awaiting backend contract sync</div>
        </div>
      </div>
    )
  });
};
