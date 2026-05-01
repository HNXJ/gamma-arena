import { registry } from '../core';
import { Info } from 'lucide-react';

export const registerDemoItems = () => {
  registry.register({
    key: 'operator-guidance-notice',
    slot: 'RIGHT_RAIL',
    label: 'Operator Note',
    priority: 0, // Top priority
    stickiness: 'PINNED', // Always at top
    render: () => (
      <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-start space-x-3">
        <Info size={14} className="text-blue-500 mt-0.5" />
        <div className="space-y-1">
          <div className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Operator Guidance</div>
          <div className="text-[11px] font-bold text-gray-300 uppercase leading-relaxed">
            Registry decentralized. Feed semantics active. Hardening Phase 4 confirmed.
          </div>
        </div>
      </div>
    )
  });
};
