# ADR 0002: Discuss before delivering on intent-level work

- **Date**: 2026-08-28
- **Status**: Accepted
- **Adopted from**: AGENTS-MD-0eb99e74ed (retrospective 2026-08-28-4)

## Context

The costliest detour of the 2026-08-28 session: a complete plan
(`PLAN.md` in idea-pipeline, ten sections, a maturity model, an
iteration sequence) was drafted and opened as a pull request after only
four multiple-choice questions. Jonathan's response — "I thought we were
going to discuss this first, as we need to figure out what my
requirements are" — cost a full round-trip, a reset of the working
relationship, and ultimately the plan's demotion to an unimplemented
idea record. The failure is structural, not situational: on intent-level
work the AI cannot know what the user wants faster than the user can
say it, so a polished early deliverable is always built on assumption.

## Decision

When the task is discovering or defining what Jonathan wants —
requirements, vision, direction — do not produce a polished deliverable
from assumptions; run short discussion rounds, reflect understanding
back, and get explicit markup before designing against it. A
deliverable produced before intent is ratified is a strawman and must
be labeled as one.

## Alternatives considered

- **Deliver-then-iterate** (draft something complete, refine from
  reactions) — rejected on direct evidence: idea-pipeline PR #38 is the
  worked example of its cost. A complete artifact anchors the
  conversation to the AI's framing and makes the user's job "critique
  my structure" instead of "state your intent".
- **Structured questionnaires up front** — rejected: the four
  multiple-choice questions that preceded PLAN.md collected parameters
  for a document already decided on; they simulate discussion without
  performing it.

## Consequences

Intent-level work gets slower at the start — short rounds and markup
gates instead of a single impressive draft — and faster overall,
because nothing gets recast wholesale. The AI must classify tasks
(intent-level vs. execution of ratified intent); when in doubt, a
one-round reflection ("here is what I think you're asking") costs
minutes. Ratified-intent execution (e.g. running `ai/KICKSTART.md`) is
unaffected: the pauses there are already encoded in the prompt.

## References

- [`../../ai/retrospective/2026-08-28-4/AGENTS-MD-0eb99e74ed-discuss-before-delivering-on-intent-level-work.md`](../../ai/retrospective/2026-08-28-4/AGENTS-MD-0eb99e74ed-discuss-before-delivering-on-intent-level-work.md) — the adopted rule (verbatim source).
- [`../../ai/retrospective/2026-08-28-4.md`](../../ai/retrospective/2026-08-28-4.md) — Part 1, Phase 1 ("the plan that ran ahead").
- idea-pipeline PR #38 — the grounding event.
