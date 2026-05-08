# Workspace Digest: Gamma Labyrinth

## Purpose
This repository contains the observation UI and browser validation components for the Gamma Labyrinth. It is the primary observation-plane surface for monitoring mission status and agent society activity.

## Doctrine Alignment
This workspace adheres to the **Global Agent Instructions** located at `~/.gemini/GEMINI.md`. 

### Plane Classification: Observation
- **Role**: Render reported state, telemetry, and progression evidence.
- **Truth Safety**: Use `truth_mode: truth_safe_unverified`. Do not hardcode scientific truth. 
- **Validation**: Every frontend change requires:
  - `npm run build` or `npx tsc -b` (typecheck).
  - Browser visual validation of the relevant observation panel.
  - Verification of the transport rail status (e.g., SUCCESS_POPULATED).

### Coordination
- Durable task coordination is managed via **GitHub Project `gamma`**.
- Cross-agent alignment is recorded in **gamma-tools** ledgers.
- Antigravity Windows is the primary owner of this repository's observation surfaces.

### Repository Hygiene
- **Branch**: `main` is the canonical branch.
- **Secrets**: Zero tolerance. Verify `.env` is ignored before work.
- **Reporting**: Include durable browser evidence (screenshots/recording hashes) in final reports.
