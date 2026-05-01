
import type { ArenaViewModelBundle, UIRegistryItem, UISlot, UITab } from '../types/ui';

class UIRegistry {
  private items: Map<string, UIRegistryItem> = new Map();
  private tabs: Map<string, UITab> = new Map();

  register(item: UIRegistryItem) {
    this.items.set(item.key, item);
  }

  registerTab(tab: UITab) {
    this.tabs.set(tab.id, tab);
  }

  getItemsForSlot(slot: UISlot, state?: ArenaViewModelBundle): UIRegistryItem[] {
    return Array.from(this.items.values())
      .filter(item => {
        if (item.slot !== slot) return false;
        if (item.visibilityRule) return item.visibilityRule(state);
        return true;
      })
      .sort((a, b) => {
        // PINNED items first
        if (a.stickiness === 'PINNED' && b.stickiness !== 'PINNED') return -1;
        if (a.stickiness !== 'PINNED' && b.stickiness === 'PINNED') return 1;
        return b.priority - a.priority;
      });
  }

  getTabs(): UITab[] {
    return Array.from(this.tabs.values())
      .sort((a, b) => b.priority - a.priority);
  }

  clear() {
    this.items.clear();
    this.tabs.clear();
  }
}

export const registry = new UIRegistry();
