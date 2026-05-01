import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface PanelShellProps {
  title: string;
  icon?: LucideIcon;
  children: React.ReactNode;
  className?: string;
  actions?: React.ReactNode;
}

export const PanelShell: React.FC<PanelShellProps> = ({ 
  title, 
  icon: Icon, 
  children, 
  className = '',
  actions 
}) => {
  return (
    <div className={`bg-[#0d0d0d] border border-white/5 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-full group ${className}`}>
      <div className="px-6 py-4 border-b border-white/5 bg-white/[0.01] flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-3 text-gray-400">
          {Icon && <Icon size={14} className="group-hover:text-amber-500 transition-colors" />}
          <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] italic">{title}</h2>
        </div>
        {actions && <div className="flex items-center space-x-2">{actions}</div>}
      </div>
      <div className="flex-1 overflow-auto p-6">
        {children}
      </div>
    </div>
  );
};
