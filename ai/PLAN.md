# PLAN - the artifacts-first experiment

Originally captured 2026-08-28 as method/SEED.md from Jonathan's
direction; moved here and renamed 2026-08-30, with status added, once
the experiment was underway. The starting decisions below remain the
plan's foundation; the status section tracks where we are. The next
session's starting prompt is ai/HANDOFF.md.

## The objective

We are prototyping the design artifacts themselves by building real
software with them. Idea-workbench is the first application, but the
point is not just to build the workbench: the experience of specifying
and implementing it is used to create the method — templates,
agent-facing guidance for each artifact type, and eventually tooling —
so these artifacts can be used for future applications.

## The move

Stop designing process in the abstract. Instead, define a small set of
typed artifacts by putting real content into them, organized as a graph
(linked data, one node per artifact) rather than one linear document.
Experiment without ceremony and see where it takes us. Process, schema,
and further artifact types get added only when real friction shows they
are needed - the archived attempts remain available to mine for them.

## The imagined workflow (Jonathan, 2026-09-17)

The direction the method is growing toward. Not yet how we work; the
trial that tests it is ADR 0008.

A spec starts rough. An implementation run reads the design artifacts
and, wherever they are silent, decides and logs the decision. The log
of what the agent decided is the way the spec grows: Jonathan reads
the decisions as a list, and each one is locked into a design
artifact, delegated to the agent by a guide entry, reversed, or left
open. A decision is ratified only by being preserved in a design
artifact; a decision with no artifact to hold it goes into a note, and
when enough notes hold the same kind of decision the artifact types
and their guidance are refactored to give it a proper home. The log
therefore surfaces both what Jonathan wants locked down and what he
delegates, and drives the schema from evidence.

The agent drafts the design artifacts. Jonathan interfaces with the
work through conversation, deciding and marking up, rather than by
reviewing pull requests full of typed artifacts. The agent's job is to
make each round a short, decidable list.

## The high-level sequence (from the ratified kickstart)

1. **Conventions** — the simplest file convention for artifact nodes
   (done: `method/CONVENTIONS.md`).
2. **Vision first** — drafted from Jonathan's existing material,
   marked up until it reads as his (done).
3. **Grow outward** — from the ratified vision: use cases; from those,
   component definitions and language-neutral typed interfaces — one
   artifact at a time, linked as we go, pausing for markup each round.
   Anything that doesn't fit these types becomes a note rather than
   being forced into the wrong shape or lost. Implementations of
   versions of the spec are built along the way, with a checkpoint
   after each.
4. **Type descriptions last** — once at least one real instance of
   each artifact type exists, write the agent-facing description of
   each type in `method/`: the intent behind the type and guidance for
   how instances may evolve, derived from what we actually made, not
   from theory. (The vision type's was pulled forward at Jonathan's
   direction: `method/types/vision.md`. The rest wait for real
   instances.)

## Starting artifact types

- Project vision document
- Use cases
- Component definitions
- Typed interfaces, specified in a language-neutral way
- Note - a catch-all for content that does not fit the other types, so
  nothing is forced into the wrong shape or lost. A note has a title, a
  body, and links. Over time, groups of notes that record similar
  information are identified and promoted into new artifact types.

Each artifact type also gets background material written for an AI
agent: the intent behind the type, and guidance for how instances may
evolve.

## Graph structure

- Links are two-way: traversable in both directions.
- Links are typed, and optionally directional.
- Initial link types:
  - `is part of` (directional)
  - `depends on` (directional)
  - `is related to` (non-directional)

The ratified file convention implementing this is
`method/CONVENTIONS.md`.

## Repository layout - three concerns, kept separate

- `method/` - everything about the method itself: artifact type
  descriptions and schemas, link conventions, agent-facing background,
  eventually linters and other tooling.
- `workbench/` - the actual artifacts of **idea-workbench**, the first
  application specified with the method, including its implementations
  under `workbench/implementations/`. Expected to move wholesale to its
  own repository later, so its contents stay self-contained.
- `ai/` - AI-generated working documents: plans, lessons, handoffs,
  retrospectives (this file lives here).

Never mix the concerns: method material never goes in `workbench/`,
artifact instances never go in `method/`, and AI working documents
never go in either.

## Related material elsewhere

- `lago-morph/idea-pipeline` holds the spec analyses (reference only)
  and, in `spec-test-organization/`, a preserved unimplemented idea
  from the previous direction plus `PERCEIVED-INTENT.md`, an unratified
  AI summary of what Jonathan wants, written when this restart was
  decided.

## Status (2026-08-30)

The method phase that followed implementation 4 is planned in
`ai/method-plan.md`; its status table is current.

The kickstart prompt was crafted, ratified, and executed; its steps are
complete or absorbed into ai/HANDOFF.md, which now carries the current
state and next step. In summary: conventions, the vision (with the
vision type's guidance and template in method/types/), the Initial UI
use case, and the implementation notes (record definition, standards,
and implementation record 1) are ratified on main. The next step is
building implementation 1: a single-page HTML file for Safari on an
iPad implementing the Initial UI use case, into
workbench/implementations/1/. Collaboration lessons learned so far are
in ai/lessons/.
