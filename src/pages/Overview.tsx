import React, { useState, useEffect } from 'react';
import { ArenaClient } from '../api/client';
import { ArenaStatus, Agent } from '../types/contract';
import { StatusCard } from '../components/StatusCard';
import { ProgressLadder } from '../components/ProgressLadder';
import { AgentCard } from '../components/AgentCard';
import { LayoutDashboard, Activity, Clock, ShieldCheck, HardDrive, AlertTriangle } from 'lucide-react';

const Overview: React.FC = () => {
  const [status, setStatus] = useState<ArenaStatus | null>(null);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const [statusData, agentsData] = await Promise.all([
        ArenaClient.getStatus(),
        ArenaClient.getAgents()
      ]);
      setStatus(statusData);
      setAgents(agentsData);
      setLoading(false);
      setError(null);
    } catch (err) {
      setError('Connection Interrupted - Attempting Re-sync');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, []);

  if (loading && !status) {
    return (
      <div className="h-full flex items-center justify-center bg-[#0a0a0a]">
        <div className="flex flex-col items-center space-y-4">
          <Activity className="text-amber-500 animate-spin" size={40} />
          <span className="text-xs font-bold text-amber-500 uppercase tracking-[0.3em] animate-pulse">Establishing Operator Link...</span>
        </div>
      </div>
    );
  }

  const uptime = status?.system.monitor_uptime_seconds 
    ? `${Math.floor(status.system.monitor_uptime_seconds / 60)}m ${status.system.monitor_uptime_seconds % 60}s` 
    : '---';

  return (
    <div className="p-12 space-y-12 max-w-[1600px] mx-auto animate-in fade-in zoom-in-95 duration-700">
      <header className="flex justify-between items-end border-b border-white/5 pb-8">
        <div className="space-y-2">
          <div className="flex items-center space-x-3 text-amber-500">
            <LayoutDashboard size={24} />
            <h1 className="text-3xl font-black tracking-tighter uppercase italic">Mission Overview</h1>
          </div>
          <p className="text-gray-500 text-sm font-medium tracking-wide">Hardened Observability Surface for Amber Arena v1.6</p>
        </div>
        <div className="text-right">
          <div className={`flex items-center space-x-2 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border transition-all ${
            error ? 'bg-rose-500/10 text-rose-500 border-rose-500/20 animate-pulse' : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
          }`}>
            <div className={`w-2 h-2 rounded-full ${error ? 'bg-rose-500' : 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]'}`} />
            <span>{error || 'Telemetry Active'}</span>
          </div>
        </div>
      </header>

      {/* Top Level Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        <StatusCard 
          title="Grounded Level" 
          value={status?.research.neuron_count} 
          label="Confirmed Neuronal Integration"
          truthClass={status?.progression.truth_class}
          icon={Activity}
          color="amber"
          source="Arena World State"
        />
        <StatusCard 
          title="System Heartbeat" 
          value={status?.system.heartbeat} 
          label="Operational Compliance"
          truthClass="GROUNDED"
          icon={Activity}
          color={status?.system.heartbeat === 'OK' ? 'emerald' : 'rose'}
          source="GLLM Local Health"
        />
        <StatusCard 
          title="Console Uptime" 
          value={uptime} 
          label="Active Monitor Session"
          truthClass="GROUNDED"
          icon={Clock}
          color="blue"
          source="Process Lifetime"
        />
        <StatusCard 
          title="Compute Load" 
          value={status?.system.backend_model_slots_occupied} 
          label="Infrastructure Resource Utilization"
          truthClass="INFERRED"
          icon={HardDrive}
          color="gray"
          source="System Registry"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
        {/* Progress Sidebar */}
        <div className="xl:col-span-3 h-full">
          <ProgressLadder 
            current={status?.research.neuron_count ?? 10} 
            total={100} 
            threshold={status?.progression.next_unlock_threshold}
            truthClass={status?.progression.truth_class}
          />
        </div>

        {/* Central Intelligence Panels */}
        <div className="xl:col-span-9 space-y-12">
          {/* Agent Grid */}
          <div className="bg-[#141414] border border-white/5 rounded-xl shadow-2xl overflow-hidden">
            <div className="p-4 border-b border-white/5 bg-white/[0.01] flex justify-between items-center">
              <div className="flex items-center space-x-3 text-amber-500">
                <ShieldCheck size={18} />
                <h2 className="text-sm font-bold uppercase tracking-widest italic">Verified Council Evidence</h2>
              </div>
              <span className="text-[10px] font-mono text-gray-600 uppercase tracking-tighter">Active Standalone Agents</span>
            </div>
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {agents.map(agent => <AgentCard key={agent.id} agent={agent} />)}
            </div>
          </div>

          {/* Configuration & Patches */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-[#141414] border border-white/5 rounded-xl overflow-hidden">
               <div className="p-4 border-b border-white/5 bg-white/[0.01] text-[10px] font-bold text-gray-400 uppercase tracking-widest italic flex items-center space-x-2">
                 <AlertTriangle size={14} className="text-blue-500" />
                 <span>Persistence Integrity</span>
               </div>
               <div className="p-8 space-y-6">
                 <div className="flex justify-between items-center py-2 border-b border-white/5">
                   <span className="text-xs text-gray-500 uppercase font-bold tracking-tight">Recovery Type</span>
                   <span className="text-xs font-mono font-bold text-blue-400">{status?.persistence.boot_type}</span>
                 </div>
                 <div className="flex justify-between items-center py-2 border-b border-white/5">
                   <span className="text-xs text-gray-500 uppercase font-bold tracking-tight">Session Resumes</span>
                   <span className="text-xs font-mono font-bold text-amber-500">{status?.persistence.resume_count}</span>
                 </div>
                 <div className="text-[10px] text-gray-600 leading-relaxed uppercase font-medium">
                   Namespaced State: <code className="bg-white/5 px-1 rounded text-blue-300">local/game001/arena_runtime_state.json</code>
                 </div>
               </div>
            </div>

            <div className="bg-[#141414] border border-white/5 rounded-xl overflow-hidden">
               <div className="p-4 border-b border-white/5 bg-white/[0.01] text-[10px] font-bold text-gray-400 uppercase tracking-widest italic flex items-center space-x-2">
                 <Activity size={14} className="text-emerald-500" />
                 <span>Active Scientific Patches</span>
               </div>
               <div className="p-8">
                {status?.progression.active_patches.length ? (
                    <div className="flex flex-wrap gap-3">
                      {status.progression.active_patches.map(p => (
                        <div key={p} className="bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                          <span className="text-xs font-mono font-bold text-emerald-500 uppercase tracking-tighter">{p}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="h-24 flex items-center justify-center border border-dashed border-white/10 rounded-xl text-gray-600 uppercase tracking-widest text-[10px] font-bold">
                      Baseline Research Cycle
                    </div>
                  )}
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
