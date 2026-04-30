import React, { useState, useEffect } from 'react';
import { ArenaClient } from '../api/client';
import { Progression } from '../types/contract';
import { ProgressLadder } from '../components/ProgressLadder';
import { Milestone, Trophy, Network, ShieldCheck, Zap } from 'lucide-react';

const Arena: React.FC = () => {
  const [progression, setProgression] = useState<Progression | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgression = async () => {
      try {
        const data = await ArenaClient.getProgression();
        setProgression(data);
      } catch (err) {
        console.error('Failed to fetch progression');
      } finally {
        setLoading(false);
      }
    };
    fetchProgression();
    const interval = setInterval(fetchProgression, 5000);
    return () => clearInterval(interval);
  }, []);

  const level = progression?.largest_pass_network_neuron_count ?? 10;
  const isVipUnlocked = level >= 40;
  const isL4Unlocked = level >= 100;

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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Massive Progress Ladder */}
        <div className="lg:col-span-4 h-[700px]">
          <ProgressLadder 
            current={level} 
            total={100} 
            threshold={progression?.next_unlock_threshold || 40}
            truthClass={progression?.truth_class}
          />
        </div>

        <div className="lg:col-span-8 space-y-12">
          {/* Promotion Gates */}
          <div className="bg-[#141414] border border-white/5 rounded-xl overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-white/5 bg-white/[0.01] flex items-center space-x-3 text-amber-500">
              <Milestone size={18} />
              <h2 className="text-sm font-bold uppercase tracking-widest italic">Promotion Gate Status</h2>
            </div>
            
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* VIP Gate */}
              <div className={`p-6 rounded-xl border transition-all duration-500 ${isVipUnlocked ? 'bg-emerald-500/[0.02] border-emerald-500/20' : 'bg-white/[0.02] border-white/5'}`}>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2 rounded-lg ${isVipUnlocked ? 'bg-emerald-500/10 text-emerald-500' : 'bg-white/5 text-gray-600'}`}>
                    <ShieldCheck size={24} />
                  </div>
                  <div className={`text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full border ${
                    isVipUnlocked ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-gray-500/10 text-gray-500 border-white/10'
                  }`}>
                    {isVipUnlocked ? 'Accepted' : 'Locked'}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-200 mb-1">VIP Unlock (40N)</h3>
                <p className="text-xs text-gray-500 uppercase tracking-tight leading-relaxed mb-4">
                  Contextual Disinhibition & SST/PV Balance Control activation threshold.
                </p>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 ${isVipUnlocked ? 'bg-emerald-500' : 'bg-amber-500'}`}
                    style={{ width: `${Math.min((level / 40) * 100, 100)}%` }}
                  />
                </div>
              </div>

              {/* L4 Gate */}
              <div className={`p-6 rounded-xl border transition-all duration-500 ${isL4Unlocked ? 'bg-emerald-500/[0.02] border-emerald-500/20' : 'bg-white/[0.02] border-white/5'}`}>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2 rounded-lg ${isL4Unlocked ? 'bg-emerald-500/10 text-emerald-500' : 'bg-white/5 text-gray-600'}`}>
                    <Trophy size={24} />
                  </div>
                  <div className={`text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full border ${
                    isL4Unlocked ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-gray-500/10 text-gray-500 border-white/10'
                  }`}>
                    {isL4Unlocked ? 'Accepted' : 'Locked'}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-200 mb-1">Laminar Unlock (100N)</h3>
                <p className="text-xs text-gray-500 uppercase tracking-tight leading-relaxed mb-4">
                  Apical/Basal Dendrites + Laminar Predictive Routing.
                </p>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 ${isL4Unlocked ? 'bg-emerald-500' : 'bg-blue-500/50'}`}
                    style={{ width: `${Math.min((level / 100) * 100, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Network Metadata */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-[#141414] border border-white/5 rounded-xl p-8 space-y-6">
              <div className="flex items-center space-x-3 text-blue-500">
                <Network size={20} />
                <h3 className="text-sm font-bold uppercase tracking-widest italic">Network Geometry</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-xs text-gray-500 uppercase font-bold tracking-tight">Interconnection Mode</span>
                  <span className="text-xs font-mono font-bold text-blue-400">PASS_VERIFIED</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-xs text-gray-500 uppercase font-bold tracking-tight">Active Omissions</span>
                  <span className="text-xs font-mono font-bold text-amber-500">{progression?.omissions ?? 0}</span>
                </div>
              </div>
            </div>

            <div className="bg-amber-500/[0.02] border border-amber-500/10 rounded-xl p-8 flex items-start space-x-4">
              <ShieldCheck className="text-amber-500 shrink-0 mt-1" size={20} />
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-amber-500 uppercase tracking-widest italic">Grounding Authority</h3>
                <p className="text-[10px] text-amber-500/70 leading-relaxed uppercase tracking-tight font-medium">
                  Every neuron in the PASS network is verified by live scientific discourse across the canonical council. 
                  Inferred or surrogate research values are explicitly rejected from this ladder.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Arena;
