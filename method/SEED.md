# SEED - starting point for the artifacts-first experiment

Captured 2026-08-28 from Jonathan's direction in a working session. This file
exists so the starting decisions have a home outside chat. It is raw material
for a kickstart prompt that Jonathan and the AI partner will craft together;
it is not itself the method.

## The move

Stop designing process in the abstract. Instead, define a small set of typed
artifacts by putting real content into them, organized as a graph (linked
data, one node per artifact) rather than one linear document. Experiment
without ceremony and see where it takes us. Process, schema, and further
artifact types get added only when real friction shows they are needed - the
archived attempts remain available to mine for them.

## Starting artifact types

- Project vision document
- Use cases
- Component definitions
- Typed interfaces, specified in a language-neutral way
- Note - a catch-all for content that does not fit the other types, so
  nothing is forced into the wrong shape or lost. A note has a title, a
  body, and links. Over time, groups of notes that record similar
  information are identified and promoted into new artifact types.

Each artifact type also gets background material written for an AI agent:
the intent behind the type, and guidance for how instances may evolve.

## Graph structure

- Links are two-way: traversable in both directions.
- Links are typed, and optionally directional.
- Initial link types:
  - `is part of` (directional)
  - `depends on` (directional)
  - `is related to` (non-directional)

## Repository layout - three concerns, kept separate

- `method/` - everything about the method itself: artifact type
  descriptions and schemas, link conventions, agent-facing background,
  eventually linters and other tooling, plus design documents about how to
  progress with the method (this file lives here).
- `workbench/` - the actual artifacts of **idea-workbench**, the first
  application specified with the method. Expected to move wholesale to its
  own repository later, so its contents stay self-contained.
- `ai/` - AI-generated working documents: plans, checklists, status
  reports, handoffs.

Never mix the concerns: method material never goes in `workbench/`,
artifact instances never go in `method/`, and AI working documents never go
in either.

## Related material elsewhere

- `lago-morph/idea-pipeline` holds the spec analyses (reference only) and, in
  `spec-test-organization/`, a preserved unimplemented idea from the previous
  direction plus `PERCEIVED-INTENT.md`, an unratified AI summary of what
  Jonathan wants, written when this restart was decided.

## Next action

Jonathan and the AI partner craft a single prompt to kickstart the
experiment, starting from the artifact set and link types above. The first
application is **idea-workbench**; Jonathan has substantial existing
material on it to seed the initial artifacts.
