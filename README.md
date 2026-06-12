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

## Status

Bootstrapping. First artifact in flight: the Vision (`model/vision.md`),
authored from the harvested OpenUP template and gated by the harvested,
decomposed Vision checklist.

## Provenance

Method content harvested from the Eclipse Process Framework practices library
1.5.1.5 (2012-12-12), Eclipse Public License v1.0, via the Internet Archive
snapshot `epf-2021-11-26`. Element GUIDs are preserved from the source XMI.
Founding design sessions are decanted in
[lago-morph/encyclopedia](https://github.com/lago-morph/encyclopedia).
