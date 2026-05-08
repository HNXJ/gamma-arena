import React from 'react';
import type { TechTreeNode } from '../../types/techTree';
import * as LucideIcons from 'lucide-react';

interface TechTreeNodeCardProps {
  node: TechTreeNode;
  isSelected?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

const KIND_ICONS: Record<string, string> = {
  repo: 'Database',
  directory: 'Folder',
  file: 'FileCode',
  function: 'Code2',
  class: 'Box',
  script: 'Terminal',
  equation: 'Sigma',
  dataset: 'Layers',
  tool: 'Wrench',
  paradigm: 'Lightbulb',
  runtime: 'Cpu',
  compiler: 'Hammer',
  artifact: 'Archive',
  manifest: 'ClipboardList'
};

const TRUTH_COLORS: Record<string, string> = {
  observation_only: 'border-blue-500/30 text-blue-400 bg-blue-500/5',
  truth_safe_unverified: 'border-amber-500/30 text-amber-400 bg-amber-500/5',
  manifest_derived: 'border-purple-500/30 text-purple-400 bg-purple-500/5',
  receipt_backed: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/5',
  unknown: 'border-gray-500/30 text-gray-400 bg-gray-500/5'
};

export const TechTreeNodeCard: React.FC<TechTreeNodeCardProps> = ({ 
  node, 
  isSelected, 
  onClick,
  style 
}) => {
  const iconName = KIND_ICONS[node.kind] || 'HelpCircle';
  const Icon = (LucideIcons as unknown as Record<string, React.ElementType>)[iconName] || LucideIcons.HelpCircle;
  const colorClass = TRUTH_COLORS[node.truthStatus] || TRUTH_COLORS.unknown;

  return (
    <div 
      className={`absolute w-48 p-3 rounded-xl border transition-all cursor-pointer group shadow-lg flex flex-col space-y-2
        ${isSelected ? 'ring-2 ring-white scale-105 z-50' : 'hover:scale-102 z-10'}
        ${colorClass}
      `}
      style={style}
      onClick={onClick}
    >
      <div className="flex items-center space-x-2">
        <Icon size={14} className="shrink-0" />
        <span className="text-[10px] font-black uppercase tracking-widest truncate">{node.kind}</span>
      </div>
      <div className="text-xs font-bold leading-tight line-clamp-2">
        {node.label}
      </div>
      {node.repo && (
        <div className="text-[8px] font-bold opacity-40 uppercase tracking-tighter truncate">
          {node.repo}
        </div>
      )}
      {isSelected && (
        <div className="pt-2 border-t border-white/10 text-[9px] opacity-60 leading-relaxed italic">
          {node.description || 'No description available.'}
        </div>
      )}
    </div>
  );
};
