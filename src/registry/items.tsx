import { registry } from './core';
import { FeedCard } from '../components/ui/FeedCard';
import { Activity, Shield, Users, Zap, Milestone, Network } from 'lucide-react';
import type { SystemViewModel, ResearchViewModel, AgentViewModel } from '../types/ui';
import { AgentLogPanel } from '../components/AgentLogPanel';
import type { CouncilEvent, NetworkState } from '../types/contract';

export {};

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

// --- ARENA_SIDEBAR ---
registry.register({
  key: 'arena-promotion-gates',
  slot: 'ARENA_SIDEBAR',
  label: 'Promotion Gates',
  priority: 10,
  render: ({ data }: { data: unknown }) => {
    const research = data as ResearchViewModel;
    const isVipUnlocked = research.neuronCount >= research.targetCount && research.targetCount > 0;
    const isL4Unlocked = research.neuronCount >= 100;

    return (
      <FeedCard title="Promotion Gates" icon={Milestone}>
         <div className="space-y-6">
           <div className={`p-4 rounded-lg border ${isVipUnlocked ? 'bg-emerald-500/[0.02] border-emerald-500/20' : 'bg-white/[0.01] border-white/5'}`}>
             <div className="flex justify-between items-center mb-2">
               <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">VIP Unlock</span>
               <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded border ${
                 isVipUnlocked ? 'text-emerald-500 border-emerald-500/20' : 'text-gray-600 border-white/10'
               }`}>{isVipUnlocked ? 'Grounded' : 'Locked'}</span>
             </div>
             <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
               <div className="h-full bg-amber-500" style={{ width: `${research.progressPercent}%` }} />
             </div>
           </div>

           <div className={`p-4 rounded-lg border ${isL4Unlocked ? 'bg-emerald-500/[0.02] border-emerald-500/20' : 'bg-white/[0.01] border-white/5'}`}>
             <div className="flex justify-between items-center mb-2">
               <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Laminar</span>
               <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded border ${
                 isL4Unlocked ? 'text-emerald-500 border-emerald-500/20' : 'text-gray-600 border-white/10'
               }`}>{isL4Unlocked ? 'Grounded' : 'Locked'}</span>
             </div>
             <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
               <div className="h-full bg-blue-500" style={{ width: `${Math.min((research.neuronCount / 100) * 100, 100)}%` }} />
             </div>
           </div>
         </div>
      </FeedCard>
    );
  }
});

registry.register({
  key: 'arena-geometry-metadata',
  slot: 'ARENA_SIDEBAR',
  label: 'Live Geometry',
  priority: 20,
  render: ({ data }: { data: unknown }) => {
    const network = data as NetworkState | null;
    return (
      <div className="bg-[#141414] border border-white/5 rounded-xl p-6 space-y-6">
        <div className="flex items-center space-x-3 text-blue-500">
          <Network size={14} />
          <h3 className="text-[10px] font-bold uppercase tracking-widest italic">Live Geometry</h3>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-center py-2 border-b border-white/5">
            <span className="text-[10px] text-gray-500 uppercase font-bold tracking-tight">Active Nodes</span>
            <span className="text-[10px] font-mono font-bold text-blue-400">{network?.nodes.id.length || '--'}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-white/5">
            <span className="text-[10px] text-gray-500 uppercase font-bold tracking-tight">Synapse Count</span>
            <span className="text-[10px] font-mono font-bold text-amber-500">{network?.edges.src.length || '--'}</span>
          </div>
        </div>
      </div>
    );
  }
});

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
