import React from 'react';
import type { UISlot } from '../types/ui';
import { registry } from './core';

export const SlotRenderer: React.FC<{ slot: UISlot, data: unknown, state?: unknown }> = ({ slot, data, state }) => {
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
