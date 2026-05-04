
import { registry } from '../core';
import { ShieldAlert, Activity } from 'lucide-react';
import { FeedCard } from '../../components/ui/FeedCard';
import type { ArenaViewModelBundle } from '../../types/ui';

export const registerOverviewItems = () => {
  registry.registerTab({
    id: 'lobby',
    label: 'Mission Overview',
    icon: 'Terminal',
    priority: 100,
    domain: 'LOBBY'
  });

  registry.register({
    key: 'overview-status-strip',
    slot: 'LOBBY',
    label: 'System Status Strip',
    priority: 10,
    render: ({ data }: { data: ArenaViewModelBundle }) => {
      const { system, research, transport } = data;
      
      const statusState = transport.endpointStates.find(s => s.name === 'System Status');
      const isUnavailable = statusState?.kind === 'http_error' || statusState?.kind === 'network_error';

      if (isUnavailable) {
        return (
          <div className="p-8 border border-rose-500/20 bg-rose-500/5 rounded-2xl flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Activity className="text-rose-500 animate-pulse" size={24} />
              <div className="space-y-1">
                <div className="text-sm font-black text-rose-500 uppercase tracking-widest">Core Telemetry Offline</div>
                <div className="text-[10px] text-rose-500/60 font-bold uppercase">Substrate heartbeat unreachable :: {statusState?.detail}</div>
              </div>
            </div>
            <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest border border-white/5 px-3 py-1 rounded">
              Awaiting Recovery
            </div>
          </div>
        );
      }

      return (
        <div className="space-y-8">
          {/* Mission Header */}
          <div className="p-6 border border-emerald-500/20 bg-emerald-500/5 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="text-sm font-black text-emerald-500 uppercase tracking-[0.2em]">Active Mission Pattern: Continuous Growth</h2>
                <div className="text-[10px] text-emerald-500/60 font-bold uppercase">Observed directive: evaluate one biologically justified candidate expansion.</div>
              </div>
              <div className="px-3 py-1 bg-emerald-500/20 rounded text-[10px] font-black text-emerald-500 uppercase tracking-widest animate-pulse">
                Active Protocol
              </div>
            </div>
            <div className="pt-3 border-t border-emerald-500/10 text-[9px] text-emerald-500/40 font-bold uppercase tracking-wider leading-relaxed">
              Trial artifacts are non-authoritative until backed by accepted receipts. Only Judge-validated receipts can commit truth.
            </div>
          </div>

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
