/* eslint-disable @typescript-eslint/no-explicit-any */
import { registry } from '../core';
import type { AgentViewModel } from '../../types/ui';
import { AgentCard } from '../../components/AgentCard';

export const registerAgentItems = () => {
  // Register the Agents Tab
  registry.registerTab({
    id: 'agents',
    label: 'Council Roster',
    icon: 'Users',
    priority: 30,
    domain: 'AGENTS'
  });

  registry.register({
    key: 'agent-roster-grid',
    slot: 'AGENTS',
    label: 'Active Council',
    priority: 10,
    render: ({ data }: { data: any }) => {
      const agents = data.agents as AgentViewModel[];
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
