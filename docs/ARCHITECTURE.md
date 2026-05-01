# Gamma Arena: Operator Console Architecture (Hardened)

## Overview
The Gamma Arena frontend is a **schema-driven operator console**. It uses a slot-based registry system to enable dynamic composition and a hardened mapper layer to enforce a strict observational boundary.

## Core Principles

### 1. Decentralized UI Registry (`src/registry/`)
To avoid monolithic bottlenecks, the registry is split into **Domain Fragments**.
- **`core.ts`**: The registry instance.
- **`setup.ts`**: Orchestrates the initialization of all domains.
- **`domains/`**: Contains domain-specific registrations (Overview, Agents, Arena, Logs).
- **Extensibility**: Adding a new feature requires creating a new domain fragment (or adding to an existing one) and registering it in `setup.ts`.

### 2. Feed Semantics & Sorting
Slots handle items as a dynamic feed with stable ordering rules:
1. **Stickiness**: `PINNED` items always appear at the top.
2. **Priority**: Lower `priority` numbers appear higher in the feed.
3. **Timestamp**: Optional for chronological event streams.

### 3. Fallback Doctrine (`src/view-models/mappers.ts`)
The system follows a **Safety First** rendering standard. Every backend data point is passed through a mapper that provides documented fallbacks for missing or unsupported fields.
- **`SAFE_DEFAULTS`**: Every view-model has an explicit fallback object (e.g., `DEGRADED` status, `Unknown` labels).
- **Graceful Degradation**: If the backend drifts or a field is missing, the UI remains stable and informs the operator of the data status (e.g., "Source Unreachable") rather than crashing.

## UI Primitives (`src/components/ui/`)
- **`FeedCard`**: Standard container with severity color-coding (`NORMAL`, `WARNING`, `CRITICAL`).
- **`PanelShell`**: Standard layout container.

## Implementation Workflow
1. **Define Data**: Update types in `contract.ts` and `ui.ts`.
2. **Map Data**: Add/update a mapper in `mappers.ts` with explicit fallbacks.
3. **Register UI**: Create/update a registry fragment in `src/registry/domains/`.
4. **Render**: The `SlotRenderer` will automatically pick up and sort the new item.

## Build Integrity
All changes are gated by:
```bash
npm run build && npm run lint
```
This ensures that the "Register-by-Default" workflow maintains full type safety across all domain fragments.
