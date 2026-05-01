
import { registry } from '../core';
import { AgentCard } from '../../components/AgentCard';
import type { ArenaViewModelBundle } from '../../types/ui';

export const registerAgentItems = () => {
  registry.registerTab({
    id: 'agents',
    label: 'Agent Roster',
    icon: 'Users',
    priority: 10,
    domain: 'AGENTS'
  });

  registry.register({
    key: 'agents-main-feed',
    slot: 'AGENTS',
    label: 'Active Agents',
    priority: 10,
    render: ({ data }: { data: ArenaViewModelBundle }) => {
      const agents = data.agents;
      
      return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {agents.length > 0 ? (
            agents.map(agent => (
              <AgentCard key={agent.id} agent={agent} />
            ))
          ) : (
            <div className="p-12 border border-white/5 bg-white/[0.02] rounded-2xl text-center text-gray-500 font-bold uppercase tracking-widest col-span-full">
              No Agents Detected in Current Substrate
            </div>
          )}
        </div>
      );
    }
  });
};
