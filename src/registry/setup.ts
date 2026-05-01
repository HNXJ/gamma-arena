import { registerOverviewItems } from './domains/overview';
import { registerAgentItems } from './domains/agents';
import { registerArenaItems } from './domains/arena';
import { registerLogItems } from './domains/logs';
import { registerDemoItems } from './domains/demo';

/**
 * Initializes the global UI registry by loading domain-specific fragments.
 * Call this once at the application entry point.
 */
export const initializeRegistry = () => {
  registerOverviewItems();
  registerAgentItems();
  registerArenaItems();
  registerLogItems();
  registerDemoItems();
};
