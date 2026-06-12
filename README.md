# agent-method

A guided workflow for building systems interactively with an AI agent partner —
methodology content harvested from EPF/OpenUP, enacted by agents, gated by
mechanical checks and tightly-scoped judgment, with traceability as the
load-bearing structure.

**This is not a dark factory.** It is the method system for one human and an
agent partner. It may be adapted toward autonomous operation later; that is
explicitly out of scope now.

## The two-repo contract

This repo is the **method system**: harvested + authored method content,
toolchain, calibration sets, lessons. Projects that *use* the method live in
their own repos and contain only their own artifacts plus a version pin of
this repo. Versions flow down (releases); proposals flow up (from project
retrospectives). Nothing else crosses.

This repo is its own first customer: its `model/` holds its Vision, use cases,
and gate records, produced under its own process — with gates hand-cranked
until the automation exists to replace the crank.

## Standing documents

| Document | Audience | Purpose |
|---|---|---|
| `HANDOFF.md` | AI only | Full session-state and design synthesis; insurance against context loss. Read first. |
| `LESSONS.md` | both | Lessons register; every entry cites its incident. |
| `model/vision.md` | both | What this is and why. |
| `model/plan.md` | both | What's next, ordered. |
| `docs/standards/repo-layout.md` | both | Where documents go; document states (draft/gated) and the draft-dependency rule. |
| `method/harvest/NOTES.md` | both | Harvest sources, measured inventories, XMI format findings. |

Document states: `draft` may merge to main ungated, but only drafts may
depend on a draft; `gated` requires a gate record and a fully-gated
dependency closure. Mechanical enforcement is a planned linter.

## Status

Bootstrapping. Vision drafted with three slots awaiting the stakeholder;
Vision gate run is the next milestone (gate record #1).

## Provenance

Method content harvested from the Eclipse Process Framework practices library
1.5.1.5 (2012-12-12), Eclipse Public License v1.0, via the Internet Archive
snapshot `epf-2021-11-26`. Element GUIDs are preserved from the source XMI.
Founding design sessions are decanted in
[lago-morph/encyclopedia](https://github.com/lago-morph/encyclopedia).
