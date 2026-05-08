import React from 'react';
import type { TechTreeNode, TechTreeEdge } from '../../types/techTree';
import { X, ExternalLink, Hash, Info, FileText } from 'lucide-react';

interface TechTreeInspectorProps {
  node: TechTreeNode | null;
  edges: TechTreeEdge[];
  onClose: () => void;
}

export const TechTreeInspector: React.FC<TechTreeInspectorProps> = ({
  node,
  edges,
  onClose
}) => {
  if (!node) return null;

  const connectedEdges = edges.filter(e => e.source === node.id || e.target === node.id);

  return (
    <div className="absolute top-20 right-6 bottom-6 w-80 bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-3xl z-[200] flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="p-6 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Info size={14} className="text-amber-500" />
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 italic">Node Inspector</h3>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-gray-500 hover:text-white transition-colors">
          <X size={16} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-8 space-y-8">
        {/* Title Section */}
        <div className="space-y-3">
          <div className="text-[9px] font-black uppercase tracking-widest text-amber-500/60 bg-amber-500/5 border border-amber-500/20 px-3 py-1 rounded-full inline-block">
            {node.kind}
          </div>
          <h2 className="text-xl font-black text-white italic tracking-tighter leading-tight">
            {node.label}
          </h2>
          <div className="flex items-center space-x-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
            <Hash size={12} />
            <span>ID: {node.id}</span>
          </div>
        </div>

        {/* Metadata */}
        <div className="space-y-6">
          {node.description && (
            <div className="space-y-2">
              <div className="text-[10px] font-black uppercase tracking-widest text-gray-600">Description</div>
              <p className="text-xs text-gray-400 leading-relaxed font-medium">
                {node.description}
              </p>
            </div>
          )}

          {node.repo && (
            <div className="space-y-2">
              <div className="text-[10px] font-black uppercase tracking-widest text-gray-600">Repository</div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                <span className="text-xs font-bold text-gray-300">{node.repo}</span>
                {node.url && (
                  <a href={node.url} target="_blank" rel="noopener noreferrer" className="text-amber-500 hover:text-amber-400">
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>
          )}

          {node.path && (
            <div className="space-y-2">
              <div className="text-[10px] font-black uppercase tracking-widest text-gray-600">Source Path</div>
              <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-xl border border-white/5 group cursor-default">
                <FileText size={14} className="text-gray-500" />
                <span className="text-[10px] font-mono text-gray-400 truncate">{node.path}</span>
              </div>
            </div>
          )}
        </div>

        {/* Connectivity */}
        <div className="space-y-4">
          <div className="text-[10px] font-black uppercase tracking-widest text-gray-600">Relationships</div>
          <div className="space-y-2">
            {connectedEdges.map(edge => (
              <div key={edge.id} className="p-3 bg-white/[0.02] border border-white/5 rounded-xl flex flex-col space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-black uppercase tracking-widest text-amber-500/40">{edge.kind}</span>
                  <span className="text-[8px] font-bold text-gray-600 italic uppercase tracking-tighter">{edge.truthStatus}</span>
                </div>
                <div className="text-[10px] font-bold text-gray-400">
                  {edge.source === node.id ? `To: ${edge.target}` : `From: ${edge.source}`}
                </div>
              </div>
            ))}
            {connectedEdges.length === 0 && (
              <div className="text-center py-4 text-[10px] text-gray-600 italic font-bold uppercase">
                No active relations mapped
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 bg-white/[0.02] border-t border-white/5 text-[9px] font-bold uppercase tracking-widest text-center text-gray-600 italic">
        Observation-Plane derived derived state.
      </div>
    </div>
  );
};
