
import { registry } from '../core';
import type { LabyrinthViewModelBundle } from '../../types/ui';
import { Shield, XCircle, AlertCircle, Rocket, FileText, Zap, Activity } from 'lucide-react';

export const registerMissionItems = () => {
  registry.registerTab({
    id: 'mission',
    label: 'Mission Status',
    icon: 'Rocket',
    priority: 12,
    domain: 'MISSION'
  });

  registry.register({
    key: 'mission-main-panel',
    slot: 'MISSION',
    label: 'Izhikevich Mission Control',
    priority: 10,
    render: ({ data }: { data: LabyrinthViewModelBundle }) => {
      const { mission, transport } = data;
      
      const missionState = transport.endpointStates.find(s => s.name === 'Mission Status');
      const isUnavailable = missionState?.kind === 'http_error' || missionState?.kind === 'network_error' || missionState?.kind === 'payload_error';
      const isLoading = missionState?.kind === 'loading';

      if (isLoading && !mission.missionId) {
        return (
          <div className="p-12 text-center text-emerald-500/40 animate-pulse uppercase font-black tracking-widest flex flex-col items-center">
            <Rocket className="mb-4 animate-spin" size={32} />
            Loading Mission Manifest...
          </div>
        );
      }

      return (
        <div className="space-y-8">
          {/* Mission Identity Header */}
          <div className="p-6 border border-blue-500/20 bg-blue-500/5 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
               <Zap size={120} />
            </div>
            
            <div className="flex items-center justify-between mb-6">
              <div className="space-y-1">
                <div className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em]">Active Mission</div>
                <h1 className="text-2xl font-black text-gray-100 italic uppercase tracking-tighter">
                  {mission.missionId}
                </h1>
              </div>
              <div className={`px-3 py-1 rounded border text-[10px] font-black uppercase ${
                mission.evidenceStatus === 'accepted_truth' ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-500' : 'bg-amber-500/20 border-amber-500/40 text-amber-500'
              }`}>
                {mission.evidenceStatus}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
               <div className="space-y-4">
                 <div className="flex items-center space-x-3">
                   <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center">
                     <Shield size={20} className="text-gray-400" />
                   </div>
                   <div>
                     <div className="text-[9px] font-black text-gray-500 uppercase">Model Family</div>
                     <div className="text-xs font-black text-gray-200 uppercase tracking-wider">{mission.modelFamily}-only</div>
                   </div>
                 </div>
                 <div className="flex items-center space-x-3 opacity-40">
                    <div className="w-10 h-10 rounded-xl bg-rose-500/5 border border-rose-500/10 flex items-center justify-center">
                      <XCircle size={20} className="text-rose-500" />
                    </div>
                    <div>
                      <div className="text-[9px] font-black text-gray-500 uppercase">Excluded Doctrine</div>
                      <div className="text-xs font-black text-rose-500/80 uppercase line-through">{mission.notModelFamily}</div>
                    </div>
                 </div>
               </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-emerald-500">
                      <Activity size={20} />
                    </div>
                    <div>
                      <div className="text-[9px] font-black text-gray-500 uppercase">E/I Balance Goal</div>
                      <div className="text-xs font-black text-gray-200 uppercase tracking-wider">Spectral Omission</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                     <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center">
                       <div className={`w-2 h-2 rounded-full ${mission.truthBearingRun ? 'bg-emerald-500' : 'bg-gray-700'}`} />
                     </div>
                     <div>
                       <div className="text-[9px] font-black text-gray-500 uppercase">Truth-Bearing Run</div>
                       <div className="text-xs font-black text-gray-300 uppercase">{mission.truthBearingRun ? 'AUTHORIZED' : 'FALSE'}</div>
                     </div>
                  </div>
                </div>
             </div>
          </div>

          {/* Mission Progress / Gates */}
          <div className="p-6 border border-white/5 bg-white/[0.02] rounded-2xl">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Mission Admission Gates</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {mission.gates.map(gate => (
                <div key={gate.id} className="p-4 border border-white/5 bg-black/20 rounded-xl flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="text-[9px] font-bold text-gray-400 uppercase">{gate.id.replace(/_/g, ' ')}</div>
                    {gate.detail && <div className="text-[8px] text-gray-600 uppercase font-bold">{gate.detail}</div>}
                  </div>
                  <div className={`text-[10px] font-black uppercase ${
                    gate.status === 'PASS' ? 'text-emerald-500' : 
                    gate.status === 'FAIL' ? 'text-rose-500' : 
                    gate.status === 'PENDING' ? 'text-amber-500 animate-pulse' : 'text-gray-600'
                  }`}>
                    {gate.status}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* LMS Society Observation */}
          <div className="p-6 border border-white/5 bg-white/[0.02] rounded-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Reported LMS Society</h3>
              <div className="text-[9px] font-black text-gray-600 uppercase italic">Source: {mission.source}</div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {mission.slots.map(slot => (
                <div key={slot.id} className="p-4 border border-white/5 bg-black/40 rounded-xl space-y-2">
                   <div className="px-2 py-0.5 bg-blue-500/10 text-blue-400 text-[9px] font-black rounded w-fit uppercase">{slot.role}</div>
                   <div className="text-[10px] font-black text-gray-200">{slot.status}</div>
                   <div className="text-[8px] font-mono text-gray-600 truncate">{slot.instance_id}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Artifact References */}
          <div className="p-6 border border-white/5 bg-white/[0.02] rounded-2xl">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Mission Artifacts</h3>
            <div className="space-y-2">
              {mission.artifacts.length > 0 ? mission.artifacts.map(art => (
                <div key={art.name} className="flex items-center justify-between p-3 bg-black/20 border border-white/5 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <FileText className="text-gray-500" size={14} />
                    <div className="text-[10px] font-bold text-gray-400 truncate max-w-md">{art.name}</div>
                  </div>
                  <div className="text-[9px] font-mono text-gray-600">{art.path}</div>
                </div>
              )) : (
                <div className="text-center py-6 text-[10px] font-bold text-gray-600 uppercase tracking-widest">
                   No artifacts indexed for current mission surface
                </div>
              )}
            </div>
          </div>

          {/* Next Action / Legal */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 p-4 bg-amber-500/5 border border-amber-500/10 rounded-xl space-y-2">
               <div className="text-[10px] font-black text-amber-500/80 uppercase tracking-widest">Next Safe Action</div>
               <p className="text-[9px] font-bold text-gray-400 uppercase leading-relaxed">
                  Await backend mission-start gate; no simulation/fitting started from front. 
                  Receipt-backed evidence required for Truth-plane mutation.
               </p>
            </div>
            {isUnavailable && (
               <div className="flex-1 p-4 bg-rose-500/5 border border-rose-500/10 rounded-xl flex items-center justify-between">
                 <div className="flex items-center space-x-2">
                    <AlertCircle className="text-rose-500" size={14} />
                    <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Live Mission Link Unavailable</span>
                 </div>
                 <span className="text-[9px] font-bold text-rose-500/60 uppercase">DEGRADED_OBSERVATION</span>
               </div>
            )}
          </div>
        </div>
      );
    }
  });
};
