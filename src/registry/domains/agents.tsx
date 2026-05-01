import { registry } from '../core';
import { FeedCard } from '../../components/ui/FeedCard';
import { Users } from 'lucide-react';
import type { AgentViewModel } from '../../types/ui';
import { AgentLogPanel } from '../../components/AgentLogPanel';

export const registerAgentItems = () => {
  // --- AGENT_STRIP ---
  registry.register({
    key: 'agent-roster-sidebar',
    slot: 'AGENT_STRIP',
    label: 'Council Roster',
    priority: 10,
    render: ({ data }: { data: unknown }) => {
      const agents = data as AgentViewModel[];
      return (
        <div className="space-y-6">
          {agents.map(agent => (
            <FeedCard
              key={agent.id}
              title={agent.id}
              subtitle={agent.role}
              severity={agent.statusSeverity === 'ACTIVE' ? 'NORMAL' : agent.statusSeverity === 'IDLE' ? 'NORMAL' : agent.statusSeverity === 'WARNING' ? 'WARNING' : 'CRITICAL'}
              icon={Users}
            >
               <div className="flex items-center space-x-3">
                 <div className={`w-2 h-2 rounded-full ${agent.statusSeverity === 'ACTIVE' ? 'bg-emerald-500 animate-pulse' : 'bg-gray-600'}`} />
                 <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">{agent.status}</span>
               </div>
            </FeedCard>
          ))}
        </div>
      );
    }
  });

  // --- LOG_INSPECTOR ---
  registry.register({
    key: 'agent-evidence-grid',
    slot: 'LOG_INSPECTOR',
    label: 'Council Evidence',
    priority: 10,
    render: ({ data }: { data: unknown }) => {
      const agents = data as AgentViewModel[];
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {agents.map(agent => (
            <AgentLogPanel key={agent.id} agentId={agent.id} role={agent.role} />
          ))}
        </div>
      );
    }
  });
};
