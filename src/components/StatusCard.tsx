import React from 'react'
import { LucideIcon, Info } from 'lucide-react'

interface StatusCardProps {
  title: string;
  value: string | number | null | undefined;
  label?: string;
  truthClass?: "GROUNDED" | "DEGRADED" | "INFERRED" | "UNKNOWN";
  source?: string;
  icon?: LucideIcon;
  color?: "amber" | "emerald" | "blue" | "rose" | "gray";
}

const colorMap = {
  amber: "text-amber-500 bg-amber-500/10 border-amber-500/20",
  emerald: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
  blue: "text-blue-500 bg-blue-500/10 border-blue-500/20",
  rose: "text-rose-500 bg-rose-500/10 border-rose-500/20",
  gray: "text-gray-500 bg-white/5 border-white/10"
}

export const StatusCard: React.FC<StatusCardProps> = ({ 
  title, 
  value, 
  label, 
  truthClass = "GROUNDED", 
  source, 
  icon: Icon = Info,
  color = "amber"
}) => {
  const isGrounded = truthClass === 'GROUNDED'
  
  return (
    <div className="bg-[#141414] border border-white/5 rounded-xl overflow-hidden group transition-all duration-300 hover:border-white/10 shadow-lg">
      <div className="p-4 border-b border-white/5 bg-white/[0.01] flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className={`p-1.5 rounded-md ${colorMap[color]}`}>
            <Icon size={14} />
          </div>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{title}</span>
        </div>
        <div className={`text-[8px] font-bold px-2 py-0.5 rounded-full border ${
          isGrounded ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-gray-500/10 text-gray-500 border-white/10'
        }`}>
          {truthClass}
        </div>
      </div>
      
      <div className="p-6 space-y-2">
        <div className={`text-3xl font-bold tracking-tighter font-mono group-hover:scale-105 transition-transform origin-left ${
          color === 'amber' ? 'text-amber-500' : 
          color === 'emerald' ? 'text-emerald-500' :
          color === 'blue' ? 'text-blue-500' :
          color === 'rose' ? 'text-rose-500' : 'text-gray-200'
        }`}>
          {value ?? "---"}
        </div>
        {label && <div className="text-[10px] text-gray-500 uppercase font-medium tracking-tight leading-none">{label}</div>}
      </div>

      {source && (
        <div className="px-4 py-2 bg-black/20 border-t border-white/5 text-[8px] text-gray-600 font-mono flex items-center justify-between">
          <span>SOURCE: {source}</span>
          <Info size={10} className="opacity-30" />
        </div>
      )}
    </div>
  )
}
