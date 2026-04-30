interface StatusCardProps {
  title: string;
  value: string | number | null;
  label?: string;
  truthClass?: "GROUNDED" | "DEGRADED" | "INFERRED";
  source?: string;
}

export const StatusCard = ({ title, value, label, truthClass = "GROUNDED", source }: StatusCardProps) => (
  <div className="arena-panel">
    <div className="arena-header flex justify-between items-center">
      <span>{title}</span>
      <span className={`text-[10px] ${truthClass === 'GROUNDED' ? 'text-green-500' : 'text-amber-600'}`}>
        {truthClass}
      </span>
    </div>
    <div className="p-4">
      <div className="text-3xl font-bold text-amber-400 glow-amber tracking-tighter">
        {value ?? "---"}
      </div>
      {label && <div className="text-[10px] text-amber-700 mt-1 uppercase tracking-wider">{label}</div>}
    </div>
    {source && (
      <div className="px-4 py-1 border-t border-amber-900/10 text-[8px] text-amber-900 uppercase">
        Source: {source}
      </div>
    )}
  </div>
);
