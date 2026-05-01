import { registry } from '../core';
import type { CouncilEvent } from '../../types/contract';

export const registerLogItems = () => {
  // --- SYSTEM_FEED ---
  registry.register({
    key: 'system-event-stream',
    slot: 'SYSTEM_FEED',
    label: 'Council Dialogue',
    priority: 10,
    render: ({ data }: { data: unknown }) => {
      const events = data as CouncilEvent[];
      return (
        <div className="divide-y divide-white/[0.03]">
          {events.map((ev, i) => (
            <div key={i} className="flex space-x-6 p-6 hover:bg-white/[0.02] transition-all group relative overflow-hidden">
              <div className="absolute inset-y-0 left-0 w-1 bg-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="text-[10px] font-mono text-gray-600 pt-1 shrink-0 font-bold tracking-tighter">
                {ev.data.time.split(' ')[1] || '---'}
              </div>
              <div className="space-y-2 overflow-hidden flex-1">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500">{ev.data.agent}</span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-600 italic">Research Log</span>
                </div>
                <div className="text-sm text-gray-300 font-mono leading-relaxed break-words selection:bg-amber-500/30">
                  {ev.data.msg}
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }
  });
};
