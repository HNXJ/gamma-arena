import type { UIRegistryItem, UISlot } from '../types/ui';

class UIRegistry {
  private items: Map<string, UIRegistryItem> = new Map();

  register(item: UIRegistryItem) {
    this.items.set(item.key, item);
  }

  getItemsForSlot(slot: UISlot, state?: unknown): UIRegistryItem[] {
    return Array.from(this.items.values())
      .filter(item => item.slot === slot)
      .filter(item => !item.visibilityRule || item.visibilityRule(state))
      .sort((a, b) => {
        if (a.stickiness === 'PINNED' && b.stickiness !== 'PINNED') return -1;
        if (a.stickiness !== 'PINNED' && b.stickiness === 'PINNED') return 1;
        return a.priority - b.priority;
      });
  }
}

export const registry = new UIRegistry();
