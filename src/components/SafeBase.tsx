import React from 'react';
import { useArena } from '../context/ArenaContext';
import { SlotRenderer } from '../registry/index';
import { Activity, ShieldAlert, Wifi, Terminal, AlertTriangle, AlertCircle } from 'lucide-react';

const StatusIcon: React.FC<{ linkState: string }> = ({ linkState }) => {
  if (linkState === 'CONNECTED') return <Wifi size={12} className="text-emerald-500" />;
  if (linkState === 'UNREACHABLE') return <AlertCircle size={12} className="text-rose-500 animate-pulse" />;
  return <AlertTriangle size={12} className="text-amber-500" />;
};

export const SafeBase: React.FC = () => {
  const { viewModels } = useArena();
  const { transport, system } = viewModels;

  const getStatusColor = () => {
    switch (transport.linkState) {
      case 'CONNECTED': return 'text-emerald-500';
      case 'PARTIAL': return 'text-amber-500';
      case 'DEGRADED': return 'text-orange-500';
      case 'UNREACHABLE': return 'text-rose-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-emerald-500/80 font-mono p-4 space-y-4 text-xs selection:bg-emerald-500/20">
      {/* Terminal Header */}
      <div className="flex justify-between items-center border-b border-emerald-500/20 pb-2">
        <div className="flex items-center space-x-3">
          <Terminal size={14} className="animate-pulse" />
          <span className="font-black tracking-[0.3em] uppercase">Gamma Safe-Base v1.0</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <StatusIcon linkState={transport.linkState} />
            <span className={`uppercase tracking-widest font-black ${getStatusColor()}`}>
              {transport.summary}
            </span>
          </div>
          <span className="opacity-40">{new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Connectivity Detail (Debug/Operator) */}
      {transport.linkState !== 'CONNECTED' && (
        <div className="p-2 border border-amber-500/20 bg-amber-500/5 rounded text-[10px] space-y-1">
          {transport.endpointStates.map((s, i) => (
            <div key={i} className="flex justify-between items-center">
              <span className="opacity-60">{s.name}</span>
              <span className={s.kind === 'success_populated' || s.kind === 'success_empty' ? 'text-emerald-500' : 'text-rose-500 font-bold'}>
                {s.kind.toUpperCase()} {s.detail ? `:: ${s.detail}` : ''}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Compact Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 border border-emerald-500/10 bg-emerald-500/5 rounded space-y-2">
          <div className="opacity-40 uppercase tracking-tighter">System State</div>
          <div className={`text-sm font-black uppercase ${system.statusSeverity === 'CRITICAL' ? 'text-rose-500' : 'text-emerald-400'}`}>
            {system.status}
          </div>
        </div>
        <div className="p-4 border border-emerald-500/10 bg-emerald-500/5 rounded space-y-2">
          <div className="opacity-40 uppercase tracking-tighter">Heartbeat</div>
          <div className="text-sm font-black flex items-center space-x-2">
            <Activity size={12} className="animate-pulse text-amber-500" />
            <span>{system.heartbeat}</span>
          </div>
        </div>
        <div className="p-4 border border-emerald-500/10 bg-emerald-500/5 rounded space-y-2">
          <div className="opacity-40 uppercase tracking-tighter">Uptime</div>
          <div className="text-sm font-black">{system.uptime}</div>
        </div>
      </div>

      {/* Emergency Notice Slot */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2 opacity-60">
          <ShieldAlert size={12} />
          <span className="uppercase font-black tracking-widest">Active Blockers / Critical Notices</span>
        </div>
        <div className="bg-black/40 rounded border border-emerald-500/5 min-h-[100px]">
          <SlotRenderer slot="SAFE_BLOCKERS" data={viewModels} state={viewModels} />
        </div>
      </div>

      {/* System Feed Slot */}
      <div className="space-y-2">
        <div className="opacity-40 uppercase font-black tracking-widest">System Event Stream</div>
        <div className="bg-black/40 rounded border border-emerald-500/5 p-2 h-[200px] overflow-auto">
          <SlotRenderer slot="SAFE_NOTICES" data={viewModels} state={viewModels} />
        </div>
      </div>

      <footer className="pt-4 opacity-20 text-[10px] uppercase text-center tracking-[0.4em]">
        Operator Base-Layer :: BASTOS LAB / VANDERBILT
      </footer>
    </div>
  );
};
