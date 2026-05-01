# Gamma Arena: Two-Base Operator Console Architecture

## Overview
The Gamma Arena frontend mirrors the backend's two-base pattern, providing a dual-layer operator product designed for both high-reliability monitoring and modular scientific expansion.

## 1. Safe-Base (Safe Landing Tab)
**Safe-Base** is a minimal, terminal-like lobby designed for extreme stability under degraded backend conditions.
- **Surface**: Compact, low-noise, mono-spaced.
- **Focus**: Core essentials only (Connection state, System status, Heartbeat, Critical Blockers).
- **Hardening**: Minimal dependencies, robust fallback handling, and low visual churn.
- **Slot Targets**: `SAFE_STATUS`, `SAFE_BLOCKERS`, `SAFE_NOTICES`.

## 2. Extended-Base (Scientific Social Layer)
**Extended-Base** is the scalable growth surface for rich research telemetry, agent feeds, and interactive modules.
- **Surface**: Tabbed, modular, feed-oriented.
- **Focus**: Extensible scientific social-media (Council roster, Research arena, Provenance logs).
- **Composition**: Slot-based rendering within registry-driven tabs.

## 3. Core Mechanisms

### Shared Data Orchestration (`ArenaProvider`)
Both bases share a unified data layer. The `ArenaProvider` handles:
- **Hardened Fetching**: Centralized polling from `ArenaClient`.
- **View-Model Mapping**: Applying `SAFE_DEFAULTS` via `mappers.ts`.
- **Global Distribution**: Providing consistent state to all components via `useArena()`.

### Registry-Driven Tabs
Tabs are not hardcoded in the shell. They are registered via domain fragments:
```typescript
registry.registerTab({
  id: 'research',
  label: 'Research Arena',
  icon: 'Activity',
  priority: 20,
  domain: 'ARENA'
});
```
The `ExtendedBase` shell dynamically renders the navigation rail and maps each tab to a corresponding `UISlot` (e.g., Tab `research` maps to Slot `RESEARCH`).

## 4. Extensibility Workflow (No-Restart)
To add a new feature:
1. **Register Tab**: (Optional) Register a new tab in a domain fragment.
2. **Register Items**: Register components to the new tab's slot or existing slots.
3. **Map Data**: (Optional) Add a new mapper if unique data shapes are required.
4. **HMR**: Vite picks up the new registry entries without requiring a full architecture rewrite.

## 5. Verification Doctrine
- **Source Integrity**: `tsc -b && npm run lint`.
- **Visual Validation**: Explicit browser-based inspection of both **Safe-Base** and **Extended-Base**.
- **Exposure Doctrine**: Fallbacks must visibly expose uncertainty (e.g., "DEGRADED", "STALLED") to avoid misleading the operator during backend failures.
