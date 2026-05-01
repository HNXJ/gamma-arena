import React, { useState, useEffect } from 'react';
import { ArenaClient } from '../api/client';
import type { Progression, NetworkState } from '../types/contract';
import { ProgressLadder } from '../components/ProgressLadder';
import { NetworkModel } from '../components/NetworkModel';
import { Milestone, Network, Zap, Activity } from 'lucide-react';

const Arena: React.FC = () => {
  const [progression, setProgression] = useState<Progression | null>(null);
  const [networkState, setNetworkState] = useState<NetworkState | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [progData, netData] = await Promise.all([
        ArenaClient.getProgression(),
        ArenaClient.getNetworkState()
      ]);
      setProgression(progData);
      setNetworkState(netData);
    } catch (err) {
      console.error('Failed to fetch arena data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData();
    const interval = setInterval(fetchData, 10000);

    // Network Event Stream (Incremental Updates)
    const netSource = ArenaClient.getNetworkEventStream();
    netSource.onmessage = (event) => {
      try {
        const netEvent = JSON.parse(event.data);
        if (netEvent.event_type === 'node_state_update') {
          setNetworkState(prev => {
            if (!prev) return prev;
            const updatedNodes = { ...prev.nodes };
            const payload = netEvent.payload as Record<string, any>; 
            
            const nodeIdx = updatedNodes.id.indexOf(payload.node_id);
            if (nodeIdx !== -1) {
              const nodes = { ...updatedNodes };
              if (payload.status) nodes.status = [...nodes.status];
              if (payload.truth_class) nodes.truth_class = [...nodes.truth_class];
              
              if (payload.status) nodes.status[nodeIdx] = payload.status;
              if (payload.truth_class) nodes.truth_class[nodeIdx] = payload.truth_class;
              
              return { ...prev, nodes };
            }
            return prev;
          });
        }
      } catch (_err) {
        console.error('Failed to parse network event');
      }
    };

    return () => {
      clearInterval(interval);
      netSource.close();
    };
  }, []);

  const level = progression?.largest_pass_network_neuron_count ?? 0;
  const threshold = progression?.next_unlock_threshold ?? 0;
  const isVipUnlocked = level >= threshold && threshold > 0;
  const isL4Unlocked = level >= 100; // L4 remains at 100 as per doctrine, but level is dynamic

  return (
    <div className="p-12 space-y-12 max-w-[1600px] mx-auto animate-in fade-in duration-700">
      <header className="flex justify-between items-end border-b border-white/5 pb-8">
        <div className="space-y-2">
          <div className="flex items-center space-x-3 text-amber-500">
            <Zap size={24} />
            <h1 className="text-3xl font-black tracking-tighter uppercase italic">Arena Provenance</h1>
          </div>
          <p className="text-gray-500 text-sm font-medium tracking-wide">Authoritative Neural Scale & Connectivity Tracking</p>
        </div>
        <div className="text-right space-y-1">
          <div className="text-[10px] text-gray-600 uppercase tracking-[0.2em] font-bold">Official Level Metric</div>
          <div className="text-sm font-mono font-bold text-amber-500 uppercase tracking-tighter">PASS Network Neuron Count</div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
        {/* Progress Ladder */}
        <div className="lg:col-span-3 min-h-[600px]">
          <ProgressLadder 
            current={level} 
            total={100} 
            threshold={progression?.next_unlock_threshold || 40}
            truthClass={progression?.truth_class}
          />
        </div>

        {/* Central Model Panel */}
        <div className="lg:col-span-6 min-h-[600px]">
          <NetworkModel state={networkState} loading={loading} />
        </div>

        {/* Right Info Column */}
        <div className="lg:col-span-3 space-y-8">
           {/* Promotion Gates */}
           <div className="bg-[#141414] border border-white/5 rounded-xl overflow-hidden shadow-2xl">
              <div className="p-4 border-b border-white/5 bg-white/[0.01] flex items-center space-x-3 text-amber-500">
                <Milestone size={14} />
                <h2 className="text-[10px] font-bold uppercase tracking-widest italic">Promotion Gates</h2>
              </div>
              
              <div className="p-6 space-y-6">
                {/* VIP Gate */}
                <div className={`p-4 rounded-lg border ${isVipUnlocked ? 'bg-emerald-500/[0.02] border-emerald-500/20' : 'bg-white/[0.01] border-white/5'}`}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">VIP Unlock</span>
                    <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded border ${
                      isVipUnlocked ? 'text-emerald-500 border-emerald-500/20' : 'text-gray-600 border-white/10'
                    }`}>{isVipUnlocked ? 'Grounded' : 'Locked'}</span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500" style={{ width: `${Math.min((level / 40) * 100, 100)}%` }} />
                  </div>
                </div>

                {/* L4 Gate */}
                <div className={`p-4 rounded-lg border ${isL4Unlocked ? 'bg-emerald-500/[0.02] border-emerald-500/20' : 'bg-white/[0.01] border-white/5'}`}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Laminar</span>
                    <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded border ${
                      isL4Unlocked ? 'text-emerald-500 border-emerald-500/20' : 'text-gray-600 border-white/10'
                    }`}>{isL4Unlocked ? 'Grounded' : 'Locked'}</span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500" style={{ width: `${Math.min((level / 100) * 100, 100)}%` }} />
                  </div>
                </div>
              </div>
           </div>

           {/* Network Metadata */}
           <div className="bg-[#141414] border border-white/5 rounded-xl p-6 space-y-6">
              <div className="flex items-center space-x-3 text-blue-500">
                <Network size={14} />
                <h3 className="text-[10px] font-bold uppercase tracking-widest italic">Live Geometry</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-[10px] text-gray-500 uppercase font-bold tracking-tight">Active Nodes</span>
                  <span className="text-[10px] font-mono font-bold text-blue-400">{networkState?.nodes.id.length || '--'}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-[10px] text-gray-500 uppercase font-bold tracking-tight">Synapse Count</span>
                  <span className="text-[10px] font-mono font-bold text-amber-500">{networkState?.edges.src.length || '--'}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-[10px] text-gray-500 uppercase font-bold tracking-tight">Epistemic Status</span>
                  <span className="text-[10px] font-bold text-emerald-500 uppercase">{networkState?.truth_class || 'SYNC'}</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white/[0.01] border border-white/5 rounded-xl flex items-start space-x-3">
              <Activity className="text-amber-500/40 shrink-0 mt-0.5" size={14} />
              <p className="text-[9px] text-gray-600 uppercase leading-relaxed tracking-tight font-medium">
                Visualizing grounded PASS network structure via game-client rendering protocol. 
                Inferred connections are strictly filtered from this view.
              </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Arena;
