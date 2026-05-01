import React from 'react';
import type { UISlot, ArenaViewModelBundle } from '../types/ui';
import { registry } from './core';

interface SlotRendererProps {
  slot: UISlot;
  data: ArenaViewModelBundle;
  state?: ArenaViewModelBundle;
}

export const SlotRenderer: React.FC<SlotRendererProps> = ({ slot, data, state }) => {
  const items = registry.getItemsForSlot(slot, state);
  
  if (items.length === 0) return null;

  return (
    <>
      {items.map(item => (
        <React.Fragment key={item.key}>
          {item.render({ data, state })}
        </React.Fragment>
      ))}
    </>
  );
};
