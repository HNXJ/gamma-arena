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
      .sort((a, b) => a.priority - b.priority);
  }
}

export const registry = new UIRegistry();
