import React from 'react'

interface ProgressLadderProps {
  current: number;
  total: number;
  threshold?: number;
  truthClass?: string;
}

export const ProgressLadder: React.FC<ProgressLadderProps> = ({ 
  current, 
  total, 
  threshold, 
  truthClass = "GROUNDED" 
}) => {
  const totalSegments = 100
  const activeSegments = Math.min(Math.floor((current / total) * totalSegments), totalSegments)
  const thresholdSegment = threshold ? Math.floor((threshold / total) * totalSegments) : null

  return (
    <div className="bg-[#141414] border border-white/5 rounded-xl h-full flex flex-col shadow-2xl overflow-hidden group">
      <div className="p-4 border-b border-white/5 bg-white/[0.01] flex justify-between items-center">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest italic">Research Progression Ladder</span>
        <div className={`text-[8px] font-bold px-2 py-0.5 rounded-full border ${
          truthClass === 'GROUNDED' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-gray-500/10 text-gray-500 border-white/10'
        }`}>
          {truthClass}
        </div>
      </div>

      <div className="flex-1 p-6 flex flex-col space-y-4">
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Observed Level</span>
            <div className="text-4xl font-bold font-mono text-amber-500 tracking-tighter leading-none">
              {current}<span className="text-sm text-gray-600 ml-1 italic font-sans tracking-tight">neurons</span>
            </div>
          </div>
          {threshold && (
            <div className="text-right">
              <span className="text-[10px] uppercase tracking-widest text-gray-600 font-bold">Next Unlock</span>
              <div className="text-sm font-bold text-gray-400">{threshold}N</div>
            </div>
          )}
        </div>

        <div className="flex-1 min-h-[300px] flex flex-col-reverse gap-[1px] relative">
          {Array.from({ length: totalSegments }).map((_, i) => {
            const isPassed = i < activeSegments
            const isThreshold = i === thresholdSegment
            const isCurrent = i === activeSegments - 1
            
            return (
              <div 
                key={i} 
                className={`flex-1 rounded-[1px] transition-all duration-700 ${
                  isPassed ? 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.2)]' : 
                  isThreshold ? 'bg-blue-500/30' : 
                  'bg-white/5'
                } ${isCurrent ? 'animate-pulse' : ''}`}
              />
            )
          })}
          
          {/* Milestone markers on side */}
          <div className="absolute inset-y-0 -right-2 flex flex-col justify-between text-[8px] font-mono text-gray-700 py-1 pointer-events-none">
            <span>100%</span>
            <span>75%</span>
            <span>50%</span>
            <span>25%</span>
            <span>0%</span>
          </div>
        </div>
      </div>

      <div className="p-4 bg-black/20 border-t border-white/5 flex justify-between items-center text-[10px] font-bold text-gray-500 uppercase tracking-widest">
        <span>Baseline</span>
        <div className="flex items-center space-x-2">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          <span className="text-amber-500/80">Grounded Ladder Active</span>
        </div>
        <span>Target: {total}N</span>
      </div>
    </div>
  )
}
