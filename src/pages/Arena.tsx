import { useState, useEffect } from 'react';
import { ArenaClient } from '../api/client';
import { Progression } from '../types/contract';
import { ProgressLadder } from '../components/ProgressLadder';

const Arena = () => {
  const [progression, setProgression] = useState<Progression | null>(null);

  useEffect(() => {
    const fetchProgression = async () => {
      try {
        const data = await ArenaClient.getProgression();
        setProgression(data);
      } catch (err) {
        console.error('Failed to fetch progression');
      }
    };
    fetchProgression();
    const interval = setInterval(fetchProgression, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-amber-400 glow-amber tracking-tighter">ARENA PROVENANCE</h2>
          <p className="text-xs text-amber-700 uppercase tracking-widest mt-1">Grounded Neural Scale & Connectivity</p>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-amber-800 uppercase tracking-widest">Official Level Metric</div>
          <div className="text-sm font-bold text-amber-500 uppercase">PASS Network Neuron Count</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="h-[500px]">
          <ProgressLadder 
            current={progression?.largest_pass_network_neuron_count ?? 10} 
            total={100} 
            threshold={40}
          />
        </div>

        <div className="space-y-6">
          <div className="arena-panel">
            <div className="arena-header">Promotion Gate Status</div>
            <div className="p-6">
              <div className="flex items-center gap-4">
                <div className={`w-4 h-4 rounded-full ${
                  (progression?.largest_pass_network_neuron_count ?? 0) >= 40 ? 'bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.6)]' : 'bg-amber-900/40'
                }`} />
                <div>
                  <div className="text-sm font-bold text-amber-400 uppercase tracking-tighter">VIP Unlock Threshold (40 Neurons)</div>
                  <div className="text-[10px] text-amber-700 uppercase tracking-widest">
                    {(progression?.largest_pass_network_neuron_count ?? 0) >= 40 ? 'Gate Accepted' : 'Requirement Not Met'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="arena-panel">
            <div className="arena-header">Active Progression Context</div>
            <div className="p-6 space-y-4">
              <div className="flex justify-between text-xs border-b border-amber-900/10 pb-2">
                <span className="text-amber-800 uppercase">Canonical Ladder</span>
                <span className="text-amber-400">{progression?.canonical_ladder ?? 'arena_growth_ladder.yaml'}</span>
              </div>
              <div className="flex justify-between text-xs border-b border-amber-900/10 pb-2">
                <span className="text-amber-800 uppercase">Official Level</span>
                <span className="text-amber-400">Bootstrap</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-amber-800 uppercase">Truth Class</span>
                <span className="text-green-600 font-bold uppercase">{progression?.truth_class ?? 'GROUNDED'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Arena;
