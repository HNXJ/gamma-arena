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
    slot: 'TECH_TREE' as any, // Using a specific slot id
    label: 'Inventory Graph',
    priority: 10,
    render: () => {
      return (
        <div className="h-[calc(100vh-200px)] -m-10">
          <TechTreeCanvas graph={techTreeSeed} />
        </div>
      );
    }
  });
};
