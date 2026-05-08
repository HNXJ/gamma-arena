import { registry } from '../core';
import { TechTreeCanvas } from '../../components/TechTree/TechTreeCanvas';
import { techTreeSeed } from '../../data/techTreeSeed';

export const registerTechnologyItems = () => {
  registry.registerTab({
    id: 'technology',
    label: 'Technology Tree',
    icon: 'Network',
    priority: 30,
    domain: 'TECH_TREE'
  });

  registry.register({
    key: 'tech-tree-main',
    slot: 'TECH_TREE', // Using a specific slot id
    label: 'Inventory Graph',
    priority: 10,
    render: () => {
      return (
        <div className="h-[calc(100vh-200px)] -m-10 relative">
          <div className="absolute top-14 left-14 z-50 p-4 bg-black/60 border border-white/10 rounded-xl backdrop-blur-md max-w-xs space-y-2">
             <div className="text-[10px] font-black text-amber-500 uppercase tracking-widest flex items-center space-x-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                <span>Inventory Observation</span>
             </div>
             <p className="text-[9px] font-bold text-gray-400 uppercase leading-relaxed">
               This graph visualizes the reported technology and artifact inventory. Nodes are not scientific truth until receipt-verified.
             </p>
          </div>
          <TechTreeCanvas graph={techTreeSeed} />
        </div>
      );
    }
  });
};
