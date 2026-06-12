---
artifact: vision
template: method/content/templates/vision.md
state: draft
gate-status: not-yet-run (open slots remain; mechanical gate 2 will fail by design)
---
# Vision: agent-method

## 1. Introduction
agent-method is a guided workflow for building systems interactively with an
AI agent partner. It revives the methodology-plus-tool pairing of the CASE era
(Foundation/Method-1, RUP/RMC) on the hypothesis that those methods failed only
because humans would not do the bookkeeping - and agents will. Method content
is harvested from EPF/OpenUP; enactment is by agents; honesty comes from
mechanical and tightly-scoped judgment gates; traceability is load-bearing.

## 2. Positioning

### 2.1 Problem Statement
The problem of: unstructured human-agent collaboration - where context
evaporates between sessions, status is self-certified, references rot
silently, and agents generate unbounded process mass that buries the builder
affects: the builder (Jonathan) and his agent partners, and any future
collaborator or future-self trying to resume or understand the work
the impact of which is: projects going off the rails (k8s-platform, five
weeks without one clean verified build), unusable spec corpora
(software-factory v4, 3.2MB of prose), lost evenings, and work that feels
like work instead of craft
a successful solution would be: a guided, gated workflow where each session
ends with witnessed, mechanically-verified progress that accumulates across
sessions, with computable change impact and honest visible state

### 2.2 Product Position Statement
For: a builder working interactively with AI agent partners
who: needs to turn many ideas into verified, high-quality systems within
limited free time
the agent-method is: a method system (versioned methodology content + gate
toolchain + traceable state stores)
that: tells you where you are and what is next, executes the clerk-work
(drafting, tracing, checking), and refuses to call anything done without
mechanical evidence
unlike: {open: awaiting stakeholder - primary alternative this displaces}
our product: combines twenty years of vetted method content (EPF/OpenUP,
GUID-traced) with agent enactment, beads/Dolt work tracking, and a
mechanical truth layer that no prior generation of these methods could have

## 3. Stakeholder Descriptions

### 3.1 Stakeholder Summary
| Name | Description | Responsibilities |
|---|---|---|
| Jonathan | Stakeholder and builder; the only reality contact | Judgment calls, priorities, phase sign-off, gate autopsies, human checklist items |
| Agent partner | Claude (chat + Code) acting in harvested roles as hats | Drafting from templates, tracing, gate execution, consistency-keeping, decanting |
| {open: awaiting stakeholder} | {additional stakeholders, e.g. future collaborators via public repos} | {} |

### 3.2 User Environment
Claude chat (iPhone/iPad/desktop) and Claude Code CLI; GitHub repos written
via Jentic/GitHub API from chat; Gas City + beads (Dolt) for work tracking;
evening-sized sessions; visual plane via beads dashboards and the
content-graph viewer; everything public and legible by default.

## 4. Product Overview

### 4.1 Needs and Features
| Need | Priority | Features | Planned Release |
|---|---|---|---|
| Durable evolving system store | P1 | Content plane in git: GUID-stable work products, typed edges, gate records beside artifacts | bootstrap |
| Honest quality gates | P1 | Checklists decomposed to mechanical / scoped-judge / human items; gate records; judge cage (fixed I/O, evidence spans, cannot-determine); calibration sets | bootstrap-elaboration |
| Guided process | P1 | Harvested OpenUP tasks/activities as skills and formulas; where-are-we navigator; phase milestones as gates | inception |
| Work-in-flight tracking | P1 | Beads as state-transition tokens for all artifacts; reconciler mints beads from maturity gaps; blocks-edges from task preconditions | inception |
| Contracts and seams discipline | P1 | Contract/data-schema/API work products + checklists; Spectral rulesets (OpenAPI/AsyncAPI/Arazzo); CDC expectations; breaking-change diffs | elaboration |
| Executable use-case realization | P2 | Arazzo workflows realizing use-case flows; run as end-to-end tests | elaboration |
| Visualization | P2 | Existing beads UIs (Foolery, beads-web, Thread) + adapted content-graph viewer (kind=hue, maturity=light); rewind via Dolt | inception-elaboration |
| First-class documentation | P2 | Diataxis work products (tutorial/how-to/reference/explanation) with own checklists; reference generated from contracts | elaboration |
| Self-improvement loop | P1 | Retro -> bridge -> practice plugin with replay-proof admission; escapes feed calibration sets; Thread metrics before/after; method versions pinned per project | continuous from inception |

## 5. Other Product Requirements
| Requirement | Priority | Planned Release |
|---|---|---|
| EPL-1.0 attribution preserved on all harvested content (source GUIDs kept) | P1 | always |
| Adopt-first: existing tools (beads, Gas City, Spectral, Pact-class, Thread, viewers) over building; building requires a demonstrated gap | P1 | always |
| Interactive scale only: one human + a handful of role-hats per session | P1 | always |
| Sessions are evening-sized and end with a witnessed verified transition, pushed | P1 | always |
| Git is canonical for artifacts; Dolt/beads for work-in-flight; no method internals in project repos (pin only) | P1 | always |
| No secrets in chat or repos | P1 | always |

## 6. Scope and Non-Goals
In scope: the guided interactive workflow, its method content, gates,
tracking, visualization, and self-improvement loop; dogfooding it by building
its own automation under it.
Non-goals (explicit): a dark factory or any unattended autonomous operation;
parallel agent-fleet coordination (freeze-before-fanout, isolation builds -
parked as a possible later adaptation); productizing for third parties in v1
(public and legible, yes; supported product, no).

## 7. Success Criteria
{open: awaiting stakeholder confirmation of proposed criteria:}
1. One harvested OpenUP activity enacted end-to-end by role-hats with
   decomposed gates and gate records written from minute one.
2. One defect traced through an autopsy to a replay-admitted new check, with
   the defective artifact added to the calibration set.
3. One practice plugin introduced via retrospective, its before/after effect
   visible in Thread metrics across a pinned version bump.
