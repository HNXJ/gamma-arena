import React, { useState, useEffect, useMemo } from 'react';
import { ArenaClient } from '../api/client';
import type { Progression, NetworkState, ArenaStatus } from '../types/contract';
import { ProgressLadder } from '../components/ProgressLadder';
import { NetworkModel } from '../components/NetworkModel';
import { SlotRenderer } from '../registry/index';
import { mapResearchState } from '../view-models/mappers';
import { Zap, Activity } from 'lucide-react';

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
    } catch {
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
            const payload = netEvent.payload as Record<string, unknown>; 
            
            const nodeIdx = updatedNodes.id.indexOf(payload.node_id as string);
            if (nodeIdx !== -1) {
              const nodes = { ...updatedNodes };
              if (payload.status) nodes.status = [...nodes.status];
              if (payload.truth_class) nodes.truth_class = [...nodes.truth_class];
              
              if (payload.status) nodes.status[nodeIdx] = payload.status as string;
              if (payload.truth_class) nodes.truth_class[nodeIdx] = payload.truth_class as string;
              
              return { ...prev, nodes };
            }
            return prev;
          });
        }
      } catch {
        console.error('Failed to parse network event');
      }
    };

    return () => {
      clearInterval(interval);
      netSource.close();
    };
  }, []);

  const researchViewModel = useMemo(() => mapResearchState({ progression } as ArenaStatus), [progression]);

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
            current={researchViewModel.neuronCount} 
            total={100} 
            threshold={researchViewModel.targetCount}
            truthClass={researchViewModel.truthClass}
          />
        </div>

        {/* Central Model Panel */}
        <div className="lg:col-span-6 min-h-[600px] relative">
          <NetworkModel state={networkState} loading={loading} />
          {/* Slot for future overlays on top of the model */}
          <div className="absolute top-4 left-4 z-10 pointer-events-none">
            <SlotRenderer slot="ARENA_OVERLAY" data={networkState} />
          </div>
        </div>

        {/* Right Info Column Sidebar */}
        <div className="lg:col-span-3 space-y-8">
           <SlotRenderer slot="ARENA_SIDEBAR" data={researchViewModel} state={networkState} />

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
