
import { registry } from '../core';
import type { ArenaViewModelBundle } from '../../types/ui';
import { FeedCard } from '../../components/ui/FeedCard';
import { ProgressLadder } from '../../components/ProgressLadder';

export const registerArenaItems = () => {
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
    render: ({ data }: { data: ArenaViewModelBundle }) => {
      const { research } = data;
      
      return (
        <div className="space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <FeedCard 
              title="Official Neurons" 
              severity="NORMAL" 
              subtitle="Authoritative Count"
            >
              <div className="text-4xl font-black text-gray-100 font-mono italic">{research.officialNeuronCount}</div>
            </FeedCard>

            <FeedCard 
              title="PASS Network" 
              severity="NORMAL" 
              subtitle="Largest Grounded"
            >
              <div className="text-4xl font-black text-amber-500 font-mono italic">{research.largestGroundedPassNetwork}</div>
            </FeedCard>

            <FeedCard 
              title="Truth Class" 
              severity={research.truthSeverity === 'GROUNDED' ? 'NORMAL' : research.truthSeverity === 'INFERRED' ? 'WARNING' : 'CRITICAL'} 
              subtitle="State Attestation"
            >
              <div className="text-4xl font-black text-gray-100 font-mono italic uppercase">{research.truthClass}</div>
            </FeedCard>
          </div>

          <div className="h-[500px]">
            <ProgressLadder 
              current={research.officialNeuronCount} 
              total={research.nextUnlockThreshold || 100}
              threshold={research.nextUnlockThreshold}
              truthClass={research.truthClass}
            />
          </div>
        </div>
      );
    }
  });
};
