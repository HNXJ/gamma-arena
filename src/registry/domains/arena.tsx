/* eslint-disable @typescript-eslint/no-explicit-any */
import { registry } from '../core';
import type { ResearchViewModel } from '../../types/ui';
import { FeedCard } from '../../components/ui/FeedCard';
import { ProgressLadder } from '../../components/ProgressLadder';

export const registerArenaItems = () => {
  // Register the Arena Tab
  registry.registerTab({
    id: 'arena',
    label: 'Research Arena',
    icon: 'Activity',
    priority: 20,
    domain: 'ARENA'
  });

  registry.register({
    key: 'arena-progression-ladder',
    slot: 'ARENA',
    label: 'Neuron Growth',
    priority: 10,
    render: ({ data }: { data: any }) => {
      const research = data.research as ResearchViewModel;
      return (
        <div className="space-y-12">
          <div className="grid grid-cols-2 gap-8">
            <FeedCard title="Current Neurons" severity="NORMAL" subtitle="N-Count">
              <div className="text-4xl font-black text-gray-100 font-mono italic">{research.neuronCount}</div>
            </FeedCard>
            <FeedCard title="Truth Class" severity={research.truthSeverity === 'GROUNDED' ? 'NORMAL' : 'WARNING'} subtitle="State Attestation">
              <div className="text-4xl font-black text-gray-100 font-mono italic uppercase">{research.truthClass}</div>
            </FeedCard>
          </div>
          <ProgressLadder 
            current={research.neuronCount} 
            total={research.targetCount} 
            threshold={research.targetCount} // Placeholder for next threshold
            truthClass={research.truthClass} 
          />
        </div>
      );
    }
  });
};
