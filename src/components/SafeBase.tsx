import React from 'react';
import { useArena } from '../context/ArenaContext';
import { SlotRenderer } from '../registry/index';
import { Activity, ShieldAlert, Wifi, Terminal } from 'lucide-react';

export const SafeBase: React.FC = () => {
  const { viewModels, error } = useArena();

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
            <Wifi size={12} className={error ? 'text-rose-500' : 'text-emerald-500'} />
            <span className="uppercase tracking-widest">{error ? 'DISCONNECTED' : 'GROUNDED'}</span>
          </div>
          <span className="opacity-40">{new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Compact Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 border border-emerald-500/10 bg-emerald-500/5 rounded space-y-2">
          <div className="opacity-40 uppercase tracking-tighter">System State</div>
          <div className={`text-sm font-black uppercase ${viewModels.system.statusSeverity === 'CRITICAL' ? 'text-rose-500' : 'text-emerald-400'}`}>
            {viewModels.system.status}
          </div>
        </div>
        <div className="p-4 border border-emerald-500/10 bg-emerald-500/5 rounded space-y-2">
          <div className="opacity-40 uppercase tracking-tighter">Heartbeat</div>
          <div className="text-sm font-black flex items-center space-x-2">
            <Activity size={12} className="animate-pulse text-amber-500" />
            <span>{viewModels.system.heartbeat}</span>
          </div>
        </div>
        <div className="p-4 border border-emerald-500/10 bg-emerald-500/5 rounded space-y-2">
          <div className="opacity-40 uppercase tracking-tighter">Uptime</div>
          <div className="text-sm font-black">{viewModels.system.uptime}</div>
        </div>
      </div>

      {/* Emergency Notice Slot */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2 opacity-60">
          <ShieldAlert size={12} />
          <span className="uppercase font-black tracking-widest">Active Blockers / Critical Notices</span>
        </div>
        <div className="bg-black/40 rounded border border-emerald-500/5 min-h-[100px]">
          <SlotRenderer slot="SAFE_BLOCKERS" data={viewModels.system} state={viewModels} />
        </div>
      </div>

      {/* System Feed Slot */}
      <div className="space-y-2">
        <div className="opacity-40 uppercase font-black tracking-widest">System Event Stream</div>
        <div className="bg-black/40 rounded border border-emerald-500/5 p-2 h-[200px] overflow-auto">
          <SlotRenderer slot="SAFE_NOTICES" data={viewModels.system} state={viewModels} />
        </div>
      </div>

      <footer className="pt-4 opacity-20 text-[10px] uppercase text-center tracking-[0.4em]">
        Operator Base-Layer :: BASTOS LAB / VANDERBILT
      </footer>
    </div>
  );
};
