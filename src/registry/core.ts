/* eslint-disable @typescript-eslint/no-explicit-any */
import type { UIRegistryItem, UISlot, UITab } from '../types/ui';

class UIRegistry {
  private items: UIRegistryItem[] = [];
  private tabs: UITab[] = [];

  register(item: UIRegistryItem) {
    this.items.push(item);
  }

  registerTab(tab: UITab) {
    this.tabs.push(tab);
  }

  getItemsForSlot(slot: UISlot, state?: any): UIRegistryItem[] {
    return this.items
      .filter(item => item.slot === slot)
      .filter(item => !item.visibilityRule || item.visibilityRule(state))
      .sort((a, b) => {
        // 1. PINNED items first
        if (a.stickiness === 'PINNED' && b.stickiness !== 'PINNED') return -1;
        if (b.stickiness === 'PINNED' && a.stickiness !== 'PINNED') return 1;
        
        // 2. Numerical priority (lowest first)
        return a.priority - b.priority;
      });
  }

  getTabs(): UITab[] {
    return [...this.tabs].sort((a, b) => a.priority - b.priority);
  }

  clear() {
    this.items = [];
    this.tabs = [];
  }
}

export const registry = new UIRegistry();
