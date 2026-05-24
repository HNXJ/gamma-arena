import { registry } from '../core';
import { ShieldCheck } from 'lucide-react';

export const registerStatusItems = () => {
  registry.register({
    key: 'control-ledger-proxy-readout-sync-20260523',
    slot: 'MAIN_FEED',
    label: 'Control Ledger Sync',
    priority: 1, // High priority to appear near top
    render: () => (
      <div className="p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <ShieldCheck size={48} className="text-emerald-500" />
        </div>
        <div className="space-y-4 relative z-10">
          <div className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500 italic">Control Ledger Synchronized</span>
          </div>
          <h3 className="text-lg font-black tracking-tighter text-gray-100 uppercase">Proxy-Readout Candidate Recorded</h3>
          
          <div className="space-y-2">
            <p className="text-xs text-gray-400 font-medium leading-relaxed max-w-xl">
              Control ledger synchronized: proxy-readout candidate recorded for observation-safe planning. Not a biological result, not a JAXFNE numerical simulation, not model-growth evidence, and not Truth-plane promotion.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
            <div className="px-2 py-1 bg-white/5 rounded text-[9px] font-black text-gray-400 uppercase tracking-widest">
              Source: gamma-protocol
            </div>
            <div className="px-2 py-1 bg-white/5 rounded text-[9px] font-black text-gray-400 uppercase tracking-widest font-mono">
              Commit: 449da8f
            </div>
            <div className="px-2 py-1 bg-amber-500/10 rounded text-[9px] font-black text-amber-500 uppercase tracking-widest">
              truth_safe_unverified
            </div>
            <div className="px-2 py-1 bg-blue-500/10 rounded text-[9px] font-black text-blue-400 uppercase tracking-widest">
              control_evidence
            </div>
          </div>
        </div>
      </div>
    )
  });
};
