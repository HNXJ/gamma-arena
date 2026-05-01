
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
      const { transport, research, system } = data;
      
      const isDegraded = transport.endpointStates.find(s => s.name === 'System Status')?.kind !== 'success_populated';

      return (
        <div className="bg-black/40 rounded-2xl border border-white/5 p-8">
          <div className="text-[10px] font-black text-gray-600 uppercase tracking-[0.4em] mb-8">
            System Provenance Stream
          </div>
          <div className="space-y-4 font-mono text-[11px]">
            {isDegraded ? (
              <div className="text-rose-500/80 italic font-bold">
                [TRANSPORT_DEGRADED] :: AUTHORITATIVE PROVENANCE FEED UNAVAILABLE
              </div>
            ) : (
              <>
                <div className="text-gray-500 font-bold">
                  [CONSOLIDATED_TRUTH] :: {research.truthClass} STATE CONFIRMED
                </div>
                <div className="text-emerald-500/80">
                  [OBSERVATION] :: Official Substrate at {research.officialNeuronCount}N
                </div>
                <div className="text-amber-500/80">
                  [PROGRESSION] :: PASS Network at {research.largestGroundedPassNetwork}N
                </div>
                <div className="text-gray-500 italic">
                  [SYSTEM] :: Heartbeat {system.heartbeat} :: Uptime {system.uptime}
                </div>
              </>
            )}
          </div>
        </div>
      );
    }
  });
};
