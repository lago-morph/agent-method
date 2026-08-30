---
id: note-implementation-record-definition
type: note
title: Implementation record — what each one must decide
links:
  related-to:
    - note-implementation-standards.md
    - note-implementation-record-1.md
---

Captured 2026-08-30 from Jonathan's direction. This note defines what
an implementation record is: the information every implementation
record must contain, with example options for each decision. It is the
type definition; each numbered implementation record (starting with
[note-implementation-record-1.md](note-implementation-record-1.md)) is
an instance that makes these decisions for one implementation. Both are
preserved separately — "we need to have this type of information" is
not the same as the first instance of it. Candidate for promotion to a
real artifact type.

## Decisions every implementation record must make

Many will stay stable between implementations; each record states them
anyway:

- **Target execution environment** — e.g., lambda functions, local
  node.js, single-page HTML app opened directly in a browser, K8s
  cluster, local docker container.
- **UI method** — e.g., web app, mobile, TUI, CLI.
- **Persistent storage** — e.g., browser data, remote database, local
  file, memory only, git repo.
- **UI design** — what the screen actually looks like.
- **Implementation language.**
- **Use cases and components to include** — which ratified use cases
  and components this implementation covers.
- **Build and installation methods** — how it gets built and how
  Jonathan runs it.
- **Logging requirements.**

The list is open; this is what we know we need today.

Numbering of records and where implementation artifacts are stored are
decided once for all implementations, in
[note-implementation-standards.md](note-implementation-standards.md).
