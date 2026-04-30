# Gamma Arena Migration Plan

## Mission
Move the Arena UI out of `gamma` and into `gamma-arena`, keeping `gamma` as the live truth source on the Office Mac.

## Core Rule: Read-Only Console
`gamma-arena` is a **read-only** operator console.
- **NO** remote shell execution.
- **NO** `/api/terminal/exec`.
- **NO** runtime state mutation.

## Phase 0: Safety Freeze
- Freeze UI features in `gamma/dashboard/`.
- No new write controls in the legacy UI.
- Mark terminal execution as non-migratable.

## Phase 1: Contract Inventory (`gamma`)
Authoritative endpoints to be exposed by the `gamma` runtime:
1. `/api/status`: Master snapshot.
2. `/api/progression`: Grounded level and unlock manifests.
3. `/api/agents`: Grounded activity and evidence.
4. `/api/persistence`: Checkpoint and resume metadata.
5. `/api/health`: Heartbeat and zero-idle status.
6. `/api/events/stream`: Live structured events.
7. `/api/logs/raw`: Raw tail for debugging.

## Phase 2: App Shell (`gamma-arena`)
- Standalone React/Vite app skeleton.
- Modular route structure (Arena, Agents, Persistence, Logs).
- Decoupled from backend templates.

## Phase 3: Presentation Transplant
- Amber/Gold design tokens.
- 100-segment neuron ladder rendering.
- Provenance footer patterns.
- Agent roster and persistence cards.

## Phase 4: Semantic Cleanup
- Explicitly separate **Backend Slots** from **Grounded Agent Evidence**.
- Differentiate **Official Level** from **Largest PASS Network**.
- Source-label every card with `truth_class`.

## Phase 5: Read-Only Terminal
- Terminal redefined as:
    - API Inspector.
    - Event Stream Tailer.
    - Raw Log Console.
    - Local Command Palette (UI navigation only).

## Phase 6: Read-Only Transport
- **SSH Tunnel MVP**: `gamma runtime -> API (3012) -> SSH Forwarding -> gamma-arena`.

## Phase 7: Cutover
- Point operator workflow to `gamma-arena`.
- Leave legacy UI as a secondary compatibility layer.
