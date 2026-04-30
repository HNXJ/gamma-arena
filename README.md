# gamma-arena

Read-only operator console for the live Gamma Arena runtime.

## Status

Under construction.

## Purpose

`gamma-arena` is a separate viewer application for the live `gamma` runtime. Its job is to render authoritative Arena state, progression, persistence, agent activity, and debugging proof without mutating the scientific game.

## Scope

This repository will provide:

* operator dashboards
* progression views
* per-agent activity panels
* persistence/recovery panels
* raw log and event inspection
* grounded/degraded/inferred truth labeling

## Non-Goals

This repository will not:

* run the scientific game
* edit live runtime state
* activate patches
* write mailbox messages
* restart backend services
* parse freeform logs as its primary semantic contract

## Architecture

Source of truth remains in `gamma` on the Office Mac.

Planned flow:

`gamma runtime -> read-only API/events -> SSH tunnel or proxy -> gamma-arena viewer`

## Read-Only Contract

The viewer will consume structured endpoints for:

* status
* progression
* agents
* persistence
* health
* event stream
* raw logs

## Safety Model

`gamma-arena` is read-only by design. It must never be able to halt, mutate, or steer the live Arena directly.

## Migration Plan

1. Create repo and freeze purpose
2. Stabilize backend read-only contracts in `gamma`
3. Build standalone viewer skeleton here
4. Connect through SSH-forwarded live endpoints
5. Iterate toward the full operator console
