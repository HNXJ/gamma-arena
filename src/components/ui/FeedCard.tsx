import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { AlertTriangle } from 'lucide-react';

interface FeedCardProps {
  title: string;
  subtitle?: string;
  severity?: 'NORMAL' | 'WARNING' | 'CRITICAL';
  icon?: LucideIcon;
  children: React.ReactNode;
  footer?: React.ReactNode;
  expandable?: boolean;
  className?: string;
}

export const FeedCard: React.FC<FeedCardProps> = ({
  title,
  subtitle,
  severity = 'NORMAL',
  icon: Icon,
  children,
  footer,
  expandable,
  className = ''
}) => {
  const accentColors = {
    NORMAL: 'border-l-emerald-500/40',
    WARNING: 'border-l-amber-500/40',
    CRITICAL: 'border-l-rose-500/40'
  };

  return (
    <div className={`bg-[#141414] border border-white/5 border-l-2 ${accentColors[severity]} rounded-lg p-5 space-y-4 hover:bg-white/[0.02] transition-all group relative ${className}`}>
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            {Icon && <Icon size={12} className="text-gray-600 group-hover:text-amber-500 transition-colors" />}
            <h4 className="text-[11px] font-black text-gray-200 uppercase tracking-widest italic">{title}</h4>
          </div>
          {subtitle && <p className="text-[9px] text-gray-500 uppercase font-bold tracking-tight">{subtitle}</p>}
        </div>
        {severity === 'CRITICAL' && <AlertTriangle size={14} className="text-rose-500 animate-pulse" />}
      </div>
      
      <div className="text-sm">
        {children}
      </div>

      {footer && (
        <div className="pt-4 border-t border-white/5 flex justify-between items-center text-[9px] font-bold text-gray-600 uppercase tracking-widest">
          {footer}
        </div>
      )}
      
      {expandable && (
        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="text-[8px] font-black text-amber-500/50 uppercase tracking-tighter">Expand View</div>
        </div>
      )}
    </div>
  );
};
