import { registry } from './core';
import { registerOverviewItems } from './domains/overview';
import { registerAgentItems } from './domains/agents';
import { registerArenaItems } from './domains/arena';
import { registerPersistenceItems } from './domains/persistence';
import { registerLogItems } from './domains/logs';
import { registerDemoItems } from './domains/demo';

/**
 * Initializes the global UI registry by loading domain-specific fragments.
 * This function is idempotent and safe to call multiple times (e.g. HMR).
 */
export const initializeRegistry = () => {
  // Clear existing to ensure idempotence if called repeatedly
  registry.clear();

  registerOverviewItems();
  registerAgentItems();
  registerArenaItems();
  registerPersistenceItems();
  registerLogItems();
  registerDemoItems();
};
