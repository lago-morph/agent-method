---
id: note-prototype-record
type: note
title: Prototype record — decisions needed before a prototype is built
links:
  related-to:
    - vision.md
---

Captured 2026-08-30 from Jonathan's direction after the Edit ideas use
case was ratified. There are open issues that must be resolved before a
prototype is built, and no good home for them yet — so, for now, this
note holds them. It is a candidate for promotion to a real artifact
type (a "prototype record" or "implementation record", one per
prototype) once we have made these decisions at least once and can see
the shape.

## Decisions to make before building a prototype

Each prototype needs these decided (many will stay stable between
prototypes; each record would state them anyway):

- **Target execution environment** — e.g., lambda functions, local
  node.js, single-page HTML app opened directly in a browser, K8s
  cluster, local docker container.
- **UI method** — e.g., web app, mobile, TUI, CLI.
- **Persistent storage** — e.g., browser data, remote database, local
  file, memory only, git repo.
- **UI design** — what the screen actually looks like.
- **Implementation language.**
- **Use cases and components to include** — which ratified use cases
  this prototype covers.
- **Build and installation methods** — how it gets built and how
  Jonathan runs it.
- **Logging requirements.**

The list is open; this etc.-shaped set is what we know we need today.

## Decisions to make once, about prototypes in general

- **Where implementation artifacts are stored** — the prototype code,
  and whatever it produces (test reports, lessons learned) — given that
  `workbench/` holds specification artifacts.
- **How implementation artifacts are named, tagged, or labeled** so a
  prototype's artifacts can be traced to the record that defined it.
