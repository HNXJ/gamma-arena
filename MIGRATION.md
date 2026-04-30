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

## PHASE 1.5 — VERIFIED CONTRACT FREEZE (COMPLETED)

All backend endpoints in `gamma` (Office Mac) have been audited and verified.

### Verified Surfaces

| Endpoint | Schema Type | Grounded Fields | Inferred/Degraded | Source |
| :--- | :--- | :--- | :--- | :--- |
| `/api/status` | Object | research, progression, persistence | uptime, slots | Integrated |
| `/api/progression` | Object | official_level, patches | omissions | patch_board.json |
| `/api/agents` | Array | id, role, truth_class | status, last_active | Log Tailer |
| `/api/persistence` | Object | boot_type, resume_count | last_checkpoint | runtime_state.json |
| `/api/health` | Object | status, zero_idle | heartbeat | Monitor |
| `/api/logs/raw` | Object | content, path | N/A | FS Tail |

### Grounding Rules
- **GROUNDED**: Data sourced directly from `arena_patch_board.json`, `arena_runtime_state.json`, or a verified log tail.
- **DEGRADED**: Placeholder values or empty strings when the underlying source is unavailable or disconnected.
- **INFERRED**: Heuristic-based metrics (e.g., active slots) that lack direct biophysical grounding.

### Contract Freeze
The schemas returned by these endpoints are now **FROZEN**. The `gamma-arena` app shell must be built against these exact keys.

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
