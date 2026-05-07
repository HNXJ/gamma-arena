
import { registry } from '../core';
import type { ArenaViewModelBundle } from '../../types/ui';
import { Shield, CheckCircle2, XCircle, AlertCircle, Cpu } from 'lucide-react';

export const registerSocietyItems = () => {
  registry.registerTab({
    id: 'society',
    label: 'Agent Society',
    icon: 'Cpu',
    priority: 15,
    domain: 'SOCIETY'
  });

  registry.register({
    key: 'society-main-panel',
    slot: 'SOCIETY',
    label: 'LMS Agent Society',
    priority: 10,
    render: ({ data }: { data: ArenaViewModelBundle }) => {
      const { society, transport } = data;
      
      const societyState = transport.endpointStates.find(s => s.name === 'Agent Society');
      const isUnavailable = societyState?.kind === 'http_error' || societyState?.kind === 'network_error' || societyState?.kind === 'payload_error';
      const isLoading = societyState?.kind === 'loading';

      if (isLoading) {
        return (
          <div className="p-12 text-center text-emerald-500/40 animate-pulse uppercase font-black tracking-widest flex flex-col items-center">
            <Cpu className="mb-4 animate-spin" size={32} />
            Probing Office Mac LMS Slots...
          </div>
        );
      }

      if (isUnavailable) {
        return (
          <div className="p-8 border border-amber-500/20 bg-amber-500/5 rounded-2xl">
            <div className="flex items-center space-x-3 mb-6">
              <AlertCircle className="text-amber-500" size={24} />
              <div className="text-sm font-black text-amber-500 uppercase tracking-widest">Observation Endpoint Unavailable</div>
            </div>
            <div className="p-6 border border-white/5 bg-black/40 rounded-xl space-y-4">
              <p className="text-[10px] text-gray-400 font-bold leading-relaxed uppercase">
                No receipt-backed LMS slot manifest endpoint is available yet.
                The backend observation-plane contract for "/api/world/agent-society/latest" is not currently fulfilled.
              </p>
              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="text-[9px] font-black text-amber-500/60 uppercase">Status: DEGRADED_OBSERVATION</div>
                <div className="text-[9px] font-black text-gray-500 uppercase">truth_mode: truth_safe_unverified</div>
              </div>
            </div>
          </div>
        );
      }
      
      return (
        <div className="space-y-8">
          {/* Header Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-6 border border-white/5 bg-white/[0.02] rounded-2xl space-y-1">
              <div className="text-[10px] font-black text-gray-500 uppercase tracking-wider">Reported Slots</div>
              <div className="text-2xl font-black text-gray-100">{society.reportedCount}</div>
            </div>
            <div className="p-6 border border-white/5 bg-white/[0.02] rounded-2xl space-y-1">
              <div className="text-[10px] font-black text-emerald-500/60 uppercase tracking-wider">Accepted Echoes</div>
              <div className="text-2xl font-black text-emerald-500">{society.acceptedCount}</div>
            </div>
            <div className="p-6 border border-white/5 bg-white/[0.02] rounded-2xl space-y-1">
              <div className="text-[10px] font-black text-rose-500/60 uppercase tracking-wider">Harness Rejections</div>
              <div className="text-2xl font-black text-rose-500">{society.rejectedCount}</div>
            </div>
          </div>

          {/* Readiness Checks */}
          <div className="p-6 border border-white/5 bg-white/[0.02] rounded-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Harness Readiness</h3>
              <div className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${society.readiness.isReady ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                {society.readiness.isReady ? 'Ready for Deployment' : 'Harness Incomplete'}
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {society.readiness.checks.map(check => (
                <div key={check.label} className="flex flex-col items-center p-3 border border-white/5 bg-black/20 rounded-xl space-y-2">
                  {check.ok ? <CheckCircle2 className="text-emerald-500" size={16} /> : <XCircle className="text-rose-500" size={16} />}
                  <span className="text-[9px] font-bold text-gray-500 uppercase text-center">{check.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Slots Table */}
          <div className="overflow-hidden border border-white/5 bg-white/[0.02] rounded-2xl">
             <table className="w-full text-left border-collapse">
               <thead>
                 <tr className="border-b border-white/5 bg-white/[0.01]">
                   <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase">Slot</th>
                   <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase">Role</th>
                   <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase">Model</th>
                   <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase">Status</th>
                   <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase text-right">Safety</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                 {society.slots.map(slot => (
                   <tr key={slot.id} className="hover:bg-white/[0.01] transition-colors">
                     <td className="px-6 py-4">
                       <div className="text-xs font-black text-gray-200 uppercase">{slot.id}</div>
                       <div className="text-[9px] text-gray-500 font-mono">{slot.lmsId}</div>
                     </td>
                     <td className="px-6 py-4">
                       <span className="px-2 py-1 bg-blue-500/10 text-blue-400 text-[10px] font-black rounded uppercase tracking-tighter">
                         {slot.role}
                       </span>
                     </td>
                     <td className="px-6 py-4">
                       <div className="text-[10px] text-gray-400 font-mono">{slot.model}</div>
                     </td>
                     <td className="px-6 py-4">
                       <div className="flex items-center space-x-2">
                         <div className={`w-1.5 h-1.5 rounded-full ${slot.statusSeverity === 'NORMAL' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]'}`} />
                         <span className="text-[10px] font-bold text-gray-300 uppercase">{slot.status}</span>
                       </div>
                     </td>
                     <td className="px-6 py-4 text-right">
                       <div className="flex flex-col items-end space-y-1">
                         <div className="flex items-center space-x-1">
                           <Shield size={10} className="text-emerald-500" />
                           <span className="text-[9px] font-black text-emerald-500/80 uppercase">No-Vision</span>
                         </div>
                         <div className="text-[8px] font-black text-gray-600 uppercase">truth_mode: unverified</div>
                       </div>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
             {society.slots.length === 0 && !isUnavailable && (
               <div className="p-12 text-center text-gray-500 font-bold uppercase tracking-widest">
                 No Agent Slots Allocated in Substrate
               </div>
             )}
          </div>

          {/* Legal/Doctrine Disclaimer */}
          <div className="p-4 bg-white/[0.01] border-l-2 border-amber-500/40 text-[9px] font-bold text-gray-500 uppercase leading-relaxed tracking-wider">
            Observation only — not Truth-plane state. Harness not authorized for gameplay. 
            Receipt-backed evidence required for state mutation.
          </div>
        </div>
      );
    }
  });
};
