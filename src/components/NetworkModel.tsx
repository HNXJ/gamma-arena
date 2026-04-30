import React, { useEffect, useRef } from 'react';
import { NetworkState } from '../types/contract';
import { Share2, Info } from 'lucide-react';

interface NetworkModelProps {
  state: NetworkState | null;
  loading: boolean;
}

export const NetworkModel: React.FC<NetworkModelProps> = ({ state, loading }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !state) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear and scale
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const { width, height } = rect;
    ctx.clearRect(0, 0, width, height);

    // Draw Edges
    ctx.lineWidth = 1;
    for (let i = 0; i < state.edges.src.length; i++) {
      const srcIdx = state.nodes.id.indexOf(state.edges.src[i]);
      const dstIdx = state.nodes.id.indexOf(state.edges.dst[i]);
      if (srcIdx === -1 || dstIdx === -1) continue;

      const x1 = state.nodes.x[srcIdx] * width;
      const y1 = state.nodes.y[srcIdx] * height;
      const x2 = state.nodes.x[dstIdx] * width;
      const y2 = state.nodes.y[dstIdx] * height;

      const sign = state.edges.sign[i];
      ctx.strokeStyle = sign === 'exc' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(59, 130, 246, 0.2)';
      
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }

    // Draw Nodes
    for (let i = 0; i < state.nodes.id.length; i++) {
      const x = state.nodes.x[i] * width;
      const y = state.nodes.y[i] * height;
      const type = state.nodes.cell_type[i];
      
      ctx.beginPath();
      const r = state.nodes.radius[i] * Math.min(width, height) * 2;
      ctx.arc(x, y, r, 0, Math.PI * 2);
      
      if (type === 'E') ctx.fillStyle = '#f59e0b';
      else if (type === 'PV') ctx.fillStyle = '#3b82f6';
      else if (type === 'SST') ctx.fillStyle = '#10b981';
      else ctx.fillStyle = '#6b7280';
      
      ctx.fill();
      
      // Glow
      ctx.shadowBlur = 10;
      ctx.shadowColor = ctx.fillStyle as string;
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

  }, [state]);

  return (
    <div className="bg-[#0d0d0d] border border-white/5 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-full relative group">
      <div className="p-4 border-b border-white/5 bg-white/[0.01] flex items-center justify-between">
        <div className="flex items-center space-x-3 text-amber-500">
          <Share2 size={16} />
          <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] italic">PASS Network Topology</h2>
        </div>
        <div className={`flex items-center space-x-2 text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded border ${
          state?.truth_class === 'GROUNDED' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
        }`}>
          <span>{state?.truth_class || 'SYNCHRONIZING'}</span>
        </div>
      </div>

      <div className="flex-1 relative min-h-[300px]">
        {loading || !state ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 bg-black/40 backdrop-blur-sm z-20">
             <div className="w-12 h-12 border-2 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
             <span className="text-[10px] font-bold text-amber-500 uppercase tracking-[0.3em]">Negotiating Structured State...</span>
          </div>
        ) : null}
        
        <canvas ref={canvasRef} className="w-full h-full block" />
        
        {/* Legend Overlay */}
        <div className="absolute bottom-6 left-6 p-4 bg-black/60 backdrop-blur-md border border-white/5 rounded-xl space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-amber-500" />
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Excitatory (E)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Inhibitory (PV)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Inhibitory (SST)</span>
          </div>
        </div>
      </div>

      <div className="p-4 bg-black/40 border-t border-white/5 flex items-start space-x-3">
        <Info size={14} className="text-gray-600 mt-0.5" />
        <div className="space-y-0.5">
          <div className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">Grounding Proof: {state?.snapshot_id || '---'}</div>
          <p className="text-[8px] text-gray-700 uppercase tracking-tight leading-relaxed">
            Source: <code className="text-gray-600">{state?.source || 'UNRESOLVED'}</code>. Epoch: {state?.network_epoch || '---'}.
            Rendered from structured arrays via normalized coordinate system.
          </p>
        </div>
      </div>
    </div>
  );
};
