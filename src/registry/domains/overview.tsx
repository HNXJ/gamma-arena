import { registry } from '../core';
import { FeedCard } from '../../components/ui/FeedCard';
import { Activity, Shield, Users, Zap } from 'lucide-react';
import type { SystemViewModel, ResearchViewModel, AgentViewModel } from '../../types/ui';

export const registerOverviewItems = () => {
  // --- TOP_SUMMARY ---
  registry.register({
    key: 'system-status-summary',
    slot: 'TOP_SUMMARY',
    label: 'System Status',
    priority: 10,
    render: ({ data }: { data: unknown }) => {
      const system = data as SystemViewModel;
      return (
        <FeedCard 
          title="System Status" 
          subtitle={system.status}
          severity={system.statusSeverity === 'NORMAL' ? 'NORMAL' : system.statusSeverity === 'WARNING' ? 'WARNING' : 'CRITICAL'}
          icon={Shield}
          footer={<span>Heartbeat: {system.heartbeat}</span>}
        >
          <div className="flex justify-between items-end mt-2">
            <div className="text-2xl font-black tracking-tighter text-gray-200">{system.uptime}</div>
            <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Uptime</div>
          </div>
        </FeedCard>
      );
    }
  });

  registry.register({
    key: 'research-progress-summary',
    slot: 'TOP_SUMMARY',
    label: 'Research Progress',
    priority: 20,
    render: ({ data }: { data: unknown }) => {
      const research = data as ResearchViewModel;
      return (
        <FeedCard 
          title="Research Scale" 
          subtitle={research.topic}
          severity={research.truthSeverity === 'GROUNDED' ? 'NORMAL' : 'WARNING'}
          icon={Activity}
          footer={<span>Truth Class: {research.truthClass}</span>}
        >
          <div className="flex justify-between items-end mt-2">
            <div className="text-2xl font-black tracking-tighter text-amber-500">{research.neuronCount}</div>
            <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Neurons</div>
          </div>
        </FeedCard>
      );
    }
  });

  // --- MAIN_FEED ---
  registry.register({
    key: 'agent-activity-feed',
    slot: 'MAIN_FEED',
    label: 'Agent Activity',
    priority: 10,
    render: ({ data }: { data: unknown }) => {
      const agents = data as AgentViewModel[];
      return (
        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-4">
            <Users size={12} />
            <span>Live Agent Stream</span>
          </div>
          {agents.map(agent => (
            <FeedCard
              key={agent.id}
              title={agent.id}
              subtitle={agent.role}
              severity={agent.statusSeverity === 'ACTIVE' ? 'NORMAL' : agent.statusSeverity === 'IDLE' ? 'NORMAL' : agent.statusSeverity === 'WARNING' ? 'WARNING' : 'CRITICAL'}
              icon={Users}
              footer={<span>Last Active: {agent.lastActive}</span>}
            >
               <div className="flex items-center space-x-3">
                 <div className={`w-2 h-2 rounded-full ${agent.statusSeverity === 'ACTIVE' ? 'bg-emerald-500 animate-pulse' : 'bg-gray-600'}`} />
                 <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">{agent.status}</span>
                 {agent.blocker && <span className="text-[10px] font-bold text-rose-500 uppercase tracking-widest ml-auto">!! {agent.blocker}</span>}
               </div>
            </FeedCard>
          ))}
        </div>
      );
    }
  });

  // --- RIGHT_RAIL ---
  registry.register({
    key: 'system-notices-feed',
    slot: 'RIGHT_RAIL',
    label: 'System Notices',
    priority: 10,
    render: ({ data }: { data: unknown }) => {
      const system = data as SystemViewModel;
      return (
        <div className="space-y-4">
          {system.blockers.map((blocker, i) => (
            <div key={i} className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-lg flex items-start space-x-3">
              <Zap size={14} className="text-rose-500 mt-0.5" />
              <div className="space-y-1">
                <div className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Active Blocker</div>
                <div className="text-[11px] font-bold text-gray-300 uppercase">{blocker}</div>
              </div>
            </div>
          ))}
          <div className="p-4 bg-white/[0.02] border border-white/5 rounded-lg space-y-2">
            <div className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Infrastructure</div>
            <div className="flex justify-between text-[11px]">
              <span className="text-gray-500 uppercase">Model Slots</span>
              <span className="text-gray-300 font-mono">{system.slots}</span>
            </div>
          </div>
        </div>
      );
    }
  });
};
