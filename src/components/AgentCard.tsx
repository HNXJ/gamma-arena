import type { Agent } from '../types/contract';

export const AgentCard = ({ agent }: { agent: Agent }) => (
  <div className="arena-panel p-3 flex justify-between items-center group hover:bg-amber-950/10 transition-colors">
    <div className="flex items-center gap-3">
      <div className={`w-1.5 h-8 rounded-full ${
        agent.grounded_evidence ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]' : 'bg-amber-900/30'
      }`} />
      <div>
        <div className="text-xs font-bold text-amber-300 tracking-tighter uppercase">{agent.id} : {agent.role}</div>
        <div className="text-[10px] text-amber-700 uppercase tracking-widest">
          {agent.status} {agent.last_active && `• ${agent.last_active}`}
        </div>
        {agent.system_blocker && (
          <div className="mt-1 text-[8px] font-black text-rose-500 bg-rose-500/10 px-1.5 py-0.5 rounded border border-rose-500/20 uppercase">
            Blocker: {agent.system_blocker}
          </div>
        )}
      </div>
    </div>
    <div className="text-right">
      <div className={`text-[10px] font-bold ${
        agent.truth_class === 'GROUNDED' ? 'text-green-600/70' : 'text-amber-800'
      }`}>
        {agent.truth_class}
      </div>
      <div className="text-[8px] text-amber-900 uppercase max-w-[80px] truncate">
        {agent.source ?? 'N/A'}
      </div>
    </div>
  </div>
);
