
import { registry } from '../core';
import { AgentCard } from '../../components/AgentCard';
import type { ArenaViewModelBundle } from '../../types/ui';
import { AlertCircle } from 'lucide-react';

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
      const { agents, transport } = data;
      
      const agentState = transport.endpointStates.find(s => s.name === 'Agent Roster');
      const isUnavailable = agentState?.kind === 'http_error' || agentState?.kind === 'network_error' || agentState?.kind === 'payload_error';
      const isLoading = agentState?.kind === 'loading';

      if (isLoading) {
        return (
          <div className="p-12 text-center text-gray-500 animate-pulse uppercase font-black tracking-widest">
            Scanning Substrate for Agent Signatures...
          </div>
        );
      }

      if (isUnavailable) {
        return (
          <div className="p-12 border border-rose-500/20 bg-rose-500/5 rounded-2xl flex flex-col items-center space-y-4">
            <AlertCircle className="text-rose-500" size={32} />
            <div className="text-center space-y-1">
              <div className="text-sm font-black text-rose-500 uppercase tracking-widest">Agent Telemetry Unreachable</div>
              <div className="text-[10px] text-rose-500/60 font-bold uppercase">{agentState?.detail}</div>
            </div>
          </div>
        );
      }
      
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
