import React from 'react';
import { Shield, Users, AlertCircle, Clock } from 'lucide-react';
import type { RealtimeReport } from '../../types/ui';

interface Props {
  report: RealtimeReport;
}

export const RealtimeReportCard: React.FC<Props> = ({ report }) => {
  return (
    <div className="space-y-6">
      {/* Top Status Bar */}
      <div className="flex flex-wrap gap-4 items-center justify-between bg-white/[0.02] border border-white/5 p-4 rounded-2xl">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full animate-pulse ${report.freshness === 'live' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-amber-500'}`} />
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
              {report.freshness} Observation
            </span>
          </div>
          <div className="h-4 w-px bg-white/10" />
          <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center space-x-2">
            <Shield size={12} className="text-amber-500" />
            <span>{report.truthMode}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 text-[10px] font-bold uppercase tracking-tighter">
          <div className="flex items-center space-x-2">
             <span className="text-gray-600">API:</span>
             <span className={report.service.vercelApi === 'healthy' ? 'text-emerald-500' : 'text-rose-500'}>
               {report.service.vercelApi}
             </span>
          </div>
          <div className="flex items-center space-x-2">
             <span className="text-gray-600">DB:</span>
             <span className="text-gray-500">{report.service.supabase}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <Clock size={12} />
            <span>{new Date(report.generatedAt).toLocaleTimeString()}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Players Section */}
        <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 text-blue-400">
              <Users size={18} />
              <h3 className="text-sm font-black uppercase tracking-widest">Active Players</h3>
            </div>
            <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">
              {report.players.length} Detected
            </span>
          </div>
          
          <div className="space-y-2">
            {report.players.map(player => (
              <div key={player.id} className="flex items-center justify-between p-3 bg-black/40 border border-white/5 rounded-xl">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-black text-gray-200 uppercase">{player.label}</span>
                    <span className={`text-[8px] font-black px-1.5 py-0.5 rounded uppercase ${
                      player.liveness === 'active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-gray-800 text-gray-500'
                    }`}>
                      {player.liveness}
                    </span>
                  </div>
                  <div className="text-[8px] text-gray-600 font-bold uppercase tracking-widest">
                    Backend: {player.backend}
                  </div>
                </div>
                <div className="text-right space-y-1">
                   <div className={`text-[9px] font-black uppercase ${player.harnessStatus === 'verified' ? 'text-emerald-500/60' : 'text-gray-600'}`}>
                     Harness: {player.harnessStatus}
                   </div>
                </div>
              </div>
            ))}
            {report.players.length === 0 && (
              <div className="text-center py-4 text-[10px] font-bold text-gray-600 uppercase italic">
                No active players in current substrate.
              </div>
            )}
          </div>
        </div>

        {/* Judges Section */}
        <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 text-amber-500">
              <Shield size={18} />
              <h3 className="text-sm font-black uppercase tracking-widest">Verdict Status</h3>
            </div>
          </div>
          
          <div className="space-y-2">
            {report.judges.map(judge => (
              <div key={judge.id} className="p-3 bg-black/40 border border-white/5 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-gray-200 uppercase">{judge.label}</span>
                  <span className={`text-[8px] font-black px-1.5 py-0.5 rounded uppercase ${
                    judge.status === 'clear' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                  }`}>
                    {judge.status}
                  </span>
                </div>
                {judge.summary && (
                  <div className="text-[9px] text-gray-500 font-bold uppercase leading-tight border-t border-white/5 pt-2">
                    {judge.summary}
                  </div>
                )}
              </div>
            ))}
            {report.judges.length === 0 && (
              <div className="text-center py-4 text-[10px] font-bold text-gray-600 uppercase italic">
                Awaiting judge allocation...
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Warnings / Blockers */}
      {report.warnings.length > 0 && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-start space-x-4">
          <AlertCircle className="text-rose-500 shrink-0" size={20} />
          <div className="space-y-1">
            <h4 className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Active Blockers</h4>
            <div className="text-[10px] font-bold text-rose-500/60 uppercase">
              {report.warnings.join(' | ')}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
