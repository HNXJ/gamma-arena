interface ProgressLadderProps {
  current: number;
  total: number;
  threshold?: number;
}

export const ProgressLadder = ({ current, total, threshold }: ProgressLadderProps) => {
  const segments = Array.from({ length: 20 }, (_, i) => i); // 20 segments for the ladder visualization
  const activeCount = Math.floor((current / total) * 20);
  const thresholdIdx = threshold ? Math.floor((threshold / total) * 20) : null;

  return (
    <div className="arena-panel h-full">
      <div className="arena-header">Neural Progression Ladder</div>
      <div className="p-4 flex flex-col-reverse gap-1 h-[300px]">
        {segments.map((idx) => (
          <div 
            key={idx}
            className={`h-3 w-full rounded-sm transition-all duration-500 ${
              idx < activeCount 
                ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.4)]' 
                : idx === thresholdIdx
                ? 'border border-amber-500/50 bg-amber-500/5'
                : 'bg-amber-900/20'
            }`}
          />
        ))}
      </div>
      <div className="p-4 border-t border-amber-900/10 flex justify-between text-[10px] text-amber-600">
        <span>0</span>
        <span className="text-amber-400 font-bold">{current} NEURONS</span>
        <span>{total}</span>
      </div>
    </div>
  );
};
