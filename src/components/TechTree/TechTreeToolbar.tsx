import React from 'react';
import { Search, ZoomIn, ZoomOut, Maximize2, Info } from 'lucide-react';

interface TechTreeToolbarProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  onSearch: (term: string) => void;
}

export const TechTreeToolbar: React.FC<TechTreeToolbarProps> = ({
  onZoomIn,
  onZoomOut,
  onReset,
  onSearch
}) => {
  return (
    <div className="absolute top-6 left-6 right-6 z-[100] flex items-center justify-between pointer-events-none">
      <div className="flex items-center space-x-4 pointer-events-auto">
        {/* Search Bar */}
        <div className="flex items-center bg-black/60 backdrop-blur-xl border border-white/10 rounded-full px-4 py-2 w-64 shadow-2xl">
          <Search size={14} className="text-gray-500 mr-3" />
          <input 
            type="text" 
            placeholder="Search tech tree..." 
            className="bg-transparent border-none outline-none text-[10px] uppercase font-bold tracking-widest text-gray-200 w-full placeholder:text-gray-600"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center space-x-2 pointer-events-auto">
        <button 
          onClick={onZoomIn}
          className="p-3 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full text-gray-400 hover:text-white transition-colors shadow-2xl"
          title="Zoom In"
        >
          <ZoomIn size={16} />
        </button>
        <button 
          onClick={onZoomOut}
          className="p-3 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full text-gray-400 hover:text-white transition-colors shadow-2xl"
          title="Zoom Out"
        >
          <ZoomOut size={16} />
        </button>
        <button 
          onClick={onReset}
          className="p-3 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full text-gray-400 hover:text-white transition-colors shadow-2xl"
          title="Reset View"
        >
          <Maximize2 size={16} />
        </button>
        <div className="ml-4 p-3 bg-emerald-500/10 backdrop-blur-xl border border-emerald-500/20 rounded-full text-emerald-500 flex items-center space-x-2 px-6 shadow-2xl">
          <Info size={14} />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Observation Only</span>
        </div>
      </div>
    </div>
  );
};
