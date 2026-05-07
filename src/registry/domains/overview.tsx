
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
                <h2 className="text-sm font-black text-emerald-500 uppercase tracking-[0.2em]">Gamma Labyrinth 1.0.0 :: Active Rules Pattern</h2>
                <div className="text-[10px] text-emerald-500/60 font-bold uppercase">Observed directive: evaluate biologically justified candidate expansion via Gamma Council.</div>
              </div>
              <div className="px-3 py-1 bg-emerald-500/20 rounded text-[10px] font-black text-emerald-500 uppercase tracking-widest animate-pulse">
                Active Rules
              </div>
            </div>
            <div className="pt-3 border-t border-emerald-500/10 text-[9px] text-emerald-500/40 font-bold uppercase tracking-wider leading-relaxed">
              Trial artifacts are non-authoritative until backed by accepted receipts. Only Judge-validated receipts can commit truth to the Labyrinth.
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
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Observed Level</div>
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

          <div className="flex justify-center">
            <div className="text-[9px] font-bold text-gray-700 uppercase tracking-widest italic">
              Receipt evidence unavailable on this surface.
            </div>
          </div>
        </div>
      );
    }
  });

  registry.register({
    key: 'overview-ecosystem',
    slot: 'LOBBY',
    label: 'Ecosystem and Coordination',
    priority: 50,
    render: () => (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        <div className="p-6 bg-purple-500/5 border border-purple-500/10 rounded-2xl space-y-4">
          <div className="text-[10px] font-black text-purple-400 uppercase tracking-widest flex items-center space-x-2">
            <Activity size={14} />
            <span>Six-Repo Ecosystem</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[9px] font-bold uppercase text-gray-400">
            <div className="p-2 border border-white/5 rounded">gamma-labyrinth :: world skeleton</div>
            <div className="p-2 border border-white/5 rounded text-purple-300">gamma-protocol :: rules</div>
            <div className="p-2 border border-white/5 rounded">gamma :: execution + truth</div>
            <div className="p-2 border border-white/5 rounded text-emerald-400">gamma-labyrinth :: observation</div>
            <div className="p-2 border border-white/5 rounded">gamma-analysis :: reports</div>
            <div className="p-2 border border-white/5 rounded">gamma-science :: grounding</div>
          </div>
        </div>

        <div className="p-6 bg-amber-500/5 border border-amber-500/10 rounded-2xl space-y-4">
          <div className="text-[10px] font-black text-amber-500 uppercase tracking-widest flex items-center space-x-2">
            <ShieldAlert size={14} />
            <span>Agent Coordination</span>
          </div>
          <div className="space-y-2 text-[9px] font-bold uppercase text-gray-400 leading-relaxed">
            <p>Gemini / Antigravity :: Shared Clone Root</p>
            <p>Claude / Cowork :: Independent Clone Root</p>
            <p className="pt-2 border-t border-white/5 text-amber-500/60">
              GitHub Project "gamma" coordinates all Control-plane tasks.
            </p>
          </div>
        </div>
      </div>
    )
  });
};
