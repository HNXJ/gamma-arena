
import { registry } from '../core';
import type { ArenaViewModelBundle, AgentSocietyViewModel } from '../../types/ui';
import { Shield, CheckCircle2, XCircle, AlertCircle, Cpu, Database } from 'lucide-react';

const REPORTED_OBSERVATION_SNAPSHOT: AgentSocietyViewModel = {
  reportedCount: 8,
  acceptedCount: 8,
  rejectedCount: 0,
  truthMode: 'truth_safe_unverified',
  readiness: {
    isReady: true,
    checks: [
      { label: 'Session Manifest', ok: true },
      { label: 'Transcript', ok: true },
      { label: 'Artifact Hashes', ok: true },
      { label: 'Receipt', ok: true },
      { label: 'Redaction Scan', ok: true }
    ]
  },
  slots: [
    { id: 'receptionist', lmsId: 'gemma-4-e4b-it-mlx', model: 'gemma-4-e4b-it-mlx', role: 'receptionist', status: 'assigned_not_started', statusSeverity: 'WARNING', truthMode: 'unverified', isVisionDisabled: true },
    { id: 'worker_alpha', lmsId: 'gemma-4-e4b-it-mlx:2', model: 'gemma-4-e4b-it-mlx', role: 'worker_alpha', status: 'assigned_not_started', statusSeverity: 'WARNING', truthMode: 'unverified', isVisionDisabled: true },
    { id: 'worker_beta', lmsId: 'gemma-4-e4b-it-mlx:3', model: 'gemma-4-e4b-it-mlx', role: 'worker_beta', status: 'assigned_not_started', statusSeverity: 'WARNING', truthMode: 'unverified', isVisionDisabled: true },
    { id: 'critic', lmsId: 'gemma-4-e4b-it-mlx:4', model: 'gemma-4-e4b-it-mlx', role: 'critic', status: 'assigned_not_started', statusSeverity: 'WARNING', truthMode: 'unverified', isVisionDisabled: true },
    { id: 'judge', lmsId: 'gemma-4-e4b-it-mlx:5', model: 'gemma-4-e4b-it-mlx', role: 'judge', status: 'assigned_not_started', statusSeverity: 'WARNING', truthMode: 'unverified', isVisionDisabled: true },
    { id: 'redaction_auditor', lmsId: 'gemma-4-e4b-it-mlx:6', model: 'gemma-4-e4b-it-mlx', role: 'redaction_auditor', status: 'assigned_not_started', statusSeverity: 'WARNING', truthMode: 'unverified', isVisionDisabled: true },
    { id: 'receipt_verifier', lmsId: 'gemma-4-e4b-it-mlx:7', model: 'gemma-4-e4b-it-mlx', role: 'receipt_verifier', status: 'assigned_not_started', statusSeverity: 'WARNING', truthMode: 'unverified', isVisionDisabled: true },
    { id: 'synthesizer', lmsId: 'gemma-4-e4b-it-mlx:8', model: 'gemma-4-e4b-it-mlx', role: 'synthesizer', status: 'assigned_not_started', statusSeverity: 'WARNING', truthMode: 'unverified', isVisionDisabled: true },
  ]
};

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
      const { society: liveSociety, transport } = data;
      
      const societyState = transport.endpointStates.find(s => s.name === 'Agent Society');
      const isUnavailable = societyState?.kind === 'http_error' || societyState?.kind === 'network_error' || societyState?.kind === 'payload_error';
      const isLoading = societyState?.kind === 'loading';

      // Use live data if available and populated, otherwise fallback to the reported snapshot fixture
      const isLivePopulated = liveSociety && liveSociety.slots && liveSociety.slots.length > 0;
      const society = isLivePopulated ? liveSociety : REPORTED_OBSERVATION_SNAPSHOT;
      const isFixture = !isLivePopulated;

      if (isLoading) {
        return (
          <div className="p-12 text-center text-emerald-500/40 animate-pulse uppercase font-black tracking-widest flex flex-col items-center">
            <Cpu className="mb-4 animate-spin" size={32} />
            Probing Office Mac LMS Slots...
          </div>
        );
      }
      
      return (
        <div className="space-y-8">
          {/* Safety Header */}
          <div className="p-6 border border-amber-500/20 bg-amber-500/5 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
               <div className="flex items-center space-x-3">
                 <Shield className="text-amber-500" size={20} />
                 <h2 className="text-sm font-black text-amber-500 uppercase tracking-widest">LMS Slot Society</h2>
               </div>
               {isFixture && (
                 <div className="px-3 py-1 bg-amber-500/20 rounded border border-amber-500/40 text-[10px] font-black text-amber-500 uppercase animate-pulse">
                   reported_observation_snapshot
                 </div>
               )}
            </div>
            <div className="space-y-2">
              <p className="text-[11px] font-black text-gray-400 uppercase tracking-tight">
                Observation only. Shared model dictionary; separate contexts. truth_mode: truth_safe_unverified.
              </p>
              <div className="flex flex-wrap gap-4 pt-2 border-t border-white/5">
                 <div className="flex items-center space-x-2">
                   <Database size={12} className="text-gray-500" />
                   <span className="text-[10px] font-bold text-gray-500 uppercase">Model: gemma-4-e4b-it-mlx</span>
                 </div>
                 <div className="flex items-center space-x-2">
                   <span className="text-[10px] font-bold text-gray-600 uppercase">Variant: nightmedia/gemma-4-E4B-it-mxfp4-mlx</span>
                 </div>
                 <div className="flex items-center space-x-2">
                   <span className="text-[10px] font-bold text-gray-600 uppercase">Endpoint: office_mac_lms_players</span>
                 </div>
                 <div className="flex items-center space-x-2">
                   <Shield size={12} className="text-rose-500/60" />
                   <span className="text-[10px] font-bold text-rose-500/60 uppercase">vision: false</span>
                 </div>
              </div>
            </div>
          </div>

          {/* Header Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-6 border border-white/5 bg-white/[0.02] rounded-2xl space-y-1">
              <div className="text-[10px] font-black text-gray-500 uppercase tracking-wider">Reported Loaded Slots</div>
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
                {society.readiness.isReady ? 'harness-ready, not truth-bearing' : 'Harness Incomplete'}
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
                   <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase">Slot Role</th>
                   <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase">Instance ID</th>
                   <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase">Status</th>
                   <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase text-right">Observation Safety</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                 {society.slots.map(slot => (
                   <tr key={slot.id} className="hover:bg-white/[0.01] transition-colors">
                     <td className="px-6 py-4">
                       <span className="px-2 py-1 bg-blue-500/10 text-blue-400 text-[10px] font-black rounded uppercase tracking-tighter">
                         {slot.id}
                       </span>
                     </td>
                     <td className="px-6 py-4">
                       <div className="text-[10px] text-gray-400 font-mono">{slot.lmsId}</div>
                     </td>
                     <td className="px-6 py-4">
                       <div className="flex flex-col space-y-1">
                         <div className="flex items-center space-x-2">
                           <div className={`w-1.5 h-1.5 rounded-full ${slot.statusSeverity === 'NORMAL' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]'}`} />
                           <span className="text-[10px] font-bold text-gray-300 uppercase">{slot.status}</span>
                         </div>
                         <div className="text-[8px] font-black text-gray-600 uppercase">no gameplay turns</div>
                       </div>
                     </td>
                     <td className="px-6 py-4 text-right">
                       <div className="flex flex-col items-end space-y-1">
                         <div className="flex items-center space-x-1">
                           <Shield size={10} className="text-emerald-500" />
                           <span className="text-[9px] font-black text-emerald-500/80 uppercase">No-Vision Verified</span>
                         </div>
                         <div className="text-[8px] font-black text-gray-600 uppercase">truth_mode: unverified</div>
                       </div>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
             {society.slots.length === 0 && !isLoading && (
               <div className="p-12 text-center text-gray-500 font-bold uppercase tracking-widest">
                 No Agent Slots Allocated in Substrate
               </div>
             )}
          </div>

          {/* Operational Notices */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white/[0.01] border-l-2 border-rose-500/40 text-[9px] font-bold text-gray-500 uppercase leading-relaxed tracking-wider space-y-2">
              <div className="text-rose-500/80">CRITICAL CONSTRAINTS:</div>
              <div>• no science run authorized</div>
              <div>• no gameplay turns enabled</div>
              <div>• awaiting authorized player-turn protocol</div>
            </div>
            <div className="p-4 bg-white/[0.01] border-l-2 border-emerald-500/40 text-[9px] font-bold text-gray-500 uppercase leading-relaxed tracking-wider space-y-2">
              <div className="text-emerald-500/80">INTEGRITY PROTOCOL:</div>
              <div>• observation-ready only</div>
              <div>• receipt-backed before truth</div>
              <div>• not truth-bearing</div>
            </div>
          </div>

          {/* Legal/Doctrine Disclaimer */}
          <div className="p-4 bg-white/[0.01] border border-white/5 rounded-xl text-[9px] font-bold text-gray-500 uppercase leading-relaxed tracking-wider text-center">
            Observation only — not Truth-plane state.
          </div>

          {isUnavailable && (
             <div className="p-4 border border-rose-500/20 bg-rose-500/5 rounded-xl flex items-center justify-between">
               <div className="flex items-center space-x-2">
                 <AlertCircle className="text-rose-500" size={14} />
                 <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Live Telemetry Link Unavailable</span>
               </div>
               <span className="text-[9px] font-bold text-rose-500/60 uppercase">{societyState?.detail}</span>
             </div>
          )}
        </div>
      );
    }
  });
};
