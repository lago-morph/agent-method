# Implementation notes

> **These are brainstorming notes and are not normative.** They capture
> early thinking about implementation options and open questions, not
> decisions.

*Source: PDF page 4 (handwritten).*

## UI design

- Stable across iterations.
- Want to decouple hosting, storage, UI design from app specs.

## App hosting — UI same across all

- Single-page HTML
- Electron
- Hosted — needs auth (Google?)

## Data storage

- None
- Files (local)
- GitHub
- S3 or Cloudflare equivalent

## Specs / use case / plan storage

- Markdown in git
- JSON/YAML with schema in git
- Beads

## Open questions

- How to specify testing?
  - Unit
  - Integration
  - UI (Playwright) — decouple from implementation choices
- What does implementation/prototyping look like?
- What documentation is produced? Both for users and for maintainers?
- How is config info stored and edited?

## What are key artifacts?

- UI spec — repeatable prototypes. Also defines technology/frameworks,
  e.g., TypeScript + Angular.
- Domain model (data structures)
- Numbered prototypes, test report, lessons learned
- Use cases
- App architecture (components) — MVC or other?
- Component definitions including interfaces, error handling
- Project vision
- Auth spec
- Storage spec
- Hosting spec
- Documentation requirements
- Testing guidelines
  - Unit
  - Integration
  - e2e
- Project file layout
