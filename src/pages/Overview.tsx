import { useState, useEffect } from 'react';
import { ArenaClient } from '../api/client';
import { ArenaStatus, Agent } from '../types/contract';
import { StatusCard } from '../components/StatusCard';
import { ProgressLadder } from '../components/ProgressLadder';
import { AgentCard } from '../components/AgentCard';

const Overview = () => {
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
      setError('Connection Lost - Retrying...');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, []);

  if (loading && !status) return <div className="text-amber-500 animate-pulse">Establishing Connection...</div>;

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-900/20 border border-red-900/50 p-2 text-red-500 text-xs text-center animate-pulse rounded">
          {error}
        </div>
      )}

      {/* Primary Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatusCard 
          title="Current Level" 
          value={status?.research.neuron_count} 
          label="Authoritative Neuron Count"
          truthClass={status?.progression.truth_class}
        />
        <StatusCard 
          title="Heartbeat" 
          value={status?.system.heartbeat} 
          label="Zero-Idle Compliance"
          truthClass="GROUNDED"
        />
        <StatusCard 
          title="Uptime" 
          value={status?.system.monitor_uptime_seconds ? `${Math.floor(status.system.monitor_uptime_seconds / 60)}m` : '---'} 
          label="Monitor Session Duration"
          truthClass="GROUNDED"
        />
        <StatusCard 
          title="Active Slots" 
          value={status?.system.backend_model_slots_occupied} 
          label="Backend Resource Usage"
          truthClass="INFERRED"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Progress Visualization */}
        <div className="lg:col-span-1">
          <ProgressLadder 
            current={status?.research.neuron_count ?? 10} 
            total={100} 
            threshold={40}
          />
        </div>

        {/* Agent Roster & Persistence */}
        <div className="lg:col-span-2 space-y-6">
          <div className="arena-panel">
            <div className="arena-header">Grounded Arena Agents</div>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
              {agents.map(agent => <AgentCard key={agent.id} agent={agent} />)}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="arena-panel">
              <div className="arena-header">Persistence State</div>
              <div className="p-4 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-amber-700 uppercase">Boot Type</span>
                  <span className="text-amber-400 font-bold">{status?.persistence.boot_type}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-amber-700 uppercase">Resume Count</span>
                  <span className="text-amber-400 font-bold">{status?.persistence.resume_count}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-amber-700 uppercase">Last Checkpoint</span>
                  <span className="text-amber-400 font-bold">{status?.persistence.last_checkpoint}</span>
                </div>
              </div>
            </div>

            <div className="arena-panel">
              <div className="arena-header">Active Patches</div>
              <div className="p-4">
                {status?.progression.active_patches.length ? (
                  status.progression.active_patches.map(p => (
                    <div key={p} className="text-xs text-amber-400 font-bold mb-1">
                      {p} <span className="text-[10px] text-green-600 ml-2 font-normal">ACTIVE</span>
                    </div>
                  ))
                ) : (
                  <div className="text-xs text-amber-800 italic">No patches active. Baseline bootstrap.</div>
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
