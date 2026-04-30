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

## PHASE 1.6 — CONTRACT HARDENING (COMPLETED)

Backend contracts in `gamma` have been hardened to support the read-only split.

### Hardened Surfaces

| Endpoint | Method | Response | Grounding |
| :--- | :--- | :--- | :--- |
| `/api/events/stream` | GET | `text/event-stream` | Live council events (SSE) |
| `/api/health` | GET | Object | Grounded `uptime_seconds` |
| `/api/agents` | GET | Array | Split: `grounded_evidence` |
| `/api/progression` | GET | Object | Multi-source grounding |
| `/_internal/terminal/exec`| POST | Object | **NON-MIGRATABLE** |

### Verified Frozen Schema (Contract)

**`/api/events/stream`**
```json
data: {"type": "COUNCIL_CHAT", "data": {"time": "...", "agent": "...", "msg": "..."}}
```

**`/api/health`**
```json
{"status": "OK", "uptime_seconds": 1234, "heartbeat": "OK/STALLED"}
```

**`/api/agents`**
```json
[{"id": "G01", "role": "...", "grounded_evidence": true, "truth_class": "GROUNDED"}]
```

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
