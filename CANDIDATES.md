# Candidate requirements register

> **What this is:** proposed requirements for the methodology, each written to
> stand alone, each with its source. Candidates cost nothing while parked and
> are never deleted for being unfashionable. Promotion moves a candidate's
> full text into `REQUIREMENTS.md` (mechanic defined there).
> **Read this file only when requirements selection or markup is the
> session's explicit task** — candidates must not leak into ordinary session
> context.

Status: draft, under markup · Updated: 2026-07-03 · Vocabulary per GLOSSARY.md

## Register conventions (stakeholder markup, PR #1)

- Every candidate is written to be **understood standalone** — no reading of
  other candidates required. Verbosity is acceptable in service of this.
- Candidates are kept **as independent as possible**, so adding, removing, or
  modifying one does not disturb the others.
- Where a dependency is unavoidable, it is **explicit and documented in both
  directions** ("Depends on" / "Depended on by").
- Every candidate carries a **source**.
- IDs are stable and never reused.

## What the methodology must let you express

**R1 — Record project intent.**
The methodology must let a project record its objective (what the project
exists to achieve), its users (who it serves), and its scope (what is in and
what is out).
*Source:* stakeholder, 2026-07-03: "Where do I put the objective of the
application, the users…"

**R2 — Record decisions with rejected alternatives.**
The methodology must let a project record decisions at the time they are
made, including the alternatives that were considered and rejected, and why.
*Source:* stakeholder, 2026-07-03; k8s-platform's provider-version crisis
traced to an unrecorded decision ("nothing pinned the versions").

**R3 — Describe required behavior.**
The methodology must let a project describe each behavior the system must
provide and who that behavior serves.
*Source:* stakeholder note, 2026-07-01 (use cases).

**R4 — Record constraints.**
The methodology must let a project record the constraints that bound any
acceptable solution: implementation platform, performance, data durability,
and properties of the operating environment (for example, an intentionally
ephemeral cloud account).
*Source:* stakeholder, 2026-07-03; k8s-platform post-mortem trap 2 (code
written as if an ephemeral account were durable).

**R5 — Describe implementation and deployment.**
The methodology must let a project describe how the system is constructed
(implementation: architecture, technology choices, the code) and how it runs
(deployment: environments, topology, operations).
*Source:* stakeholder, 2026-07-03: "at the VERY least you also need an
implementation artifact, and some sort of deployment definition."

**R6 — Name and verify the seams.**
The methodology must let a project name each boundary where one system,
layer, or component hands off to another, and make each such seam verifiable
before implementation of it begins.
*Source:* k8s-platform post-mortem trap 3 — "After apply, ArgoCD takes over"
was the entire specification of a boundary, and all four standing blockers
mapped to unspecified seams.

**R7 — Certify one artifact for multiple purposes.**
The methodology must allow a single artifact to carry more than one named
checklist at the same time, so the same artifact can be certified for
different purposes independently — for example, complete enough to prototype
against while not yet complete enough for production.
*Source:* design conversation, 2026-07-03; mechanism recorded in GLOSSARY.md
("Checklist").

## What the methodology must let you do

**R8 — Verify by evidence, relative to upstream.**
The methodology must make every completion claim checkable by evidence, and
always relative: an artifact is "verified" only with respect to what the
artifacts it depends on currently say, never as a free-standing permanent
assertion.
*Source:* k8s-platform post-mortem trap 1 (the agent graded its own
homework); the first attempt's only gate, which never ran; definition
recorded in GLOSSARY.md ("Verified").

**R9 — Compute status; detect staleness.**
The methodology must derive the status of any artifact from recorded,
re-checkable answers, so that status can always be recomputed, staleness is
detectable, and no participant — human or AI — can set status by declaration.
*Source:* first attempt's standing docs went stale within days of edits;
stakeholder, 2026-07-02: "metrics measure the status of an artifact or a
workflow, based on the rules associated with" it.

**R10 — Make change impact visible.**
When any artifact changes, the methodology must identify which dependent
checklist items elsewhere are affected and mark them as needing
re-evaluation, so the impact of a change is surfaced immediately rather than
discovered later.
*Source:* stakeholder note, 2026-07-01 ("change impact analysis 1st class");
propagation mechanism recorded in GLOSSARY.md ("Change propagation").

**R11 — Route change through the owning artifact.**
The methodology must route every change through the artifact that owns the
decision being changed: a reaction such as "I don't like how the application
flows" becomes an edit to the artifact where flow requirements are defined,
and the effects propagate visibly from there. The routing and bookkeeping
burden falls on the AI partner, not the human.
*Source:* stakeholder proposal, 2026-07-03 — unrooted downstream changes
"make all the upstream artifacts stale"; recorded in GLOSSARY.md ("Where
change enters").

**R12 — Keep workflows as guidance, not law.**
The methodology must permit free-form manipulation of artifacts: any change
that leaves the affected artifacts' checklists satisfied is legitimate,
whether or not a defined workflow exists for it. Manipulations that recur may
be codified into workflows, which provide what-to-do-next guidance without
restricting experimentation.
*Source:* stakeholder, 2026-07-02: "the load-bearing part should be the
artifacts and the status of their checklists"; workflows are glue.

**R13 — Evaluate checklists automatically, early.**
The methodology must support automatic, deterministic, fast evaluation of
checklist items, implemented early in the methodology's life. Evaluation is
read-only with respect to artifacts: it recomputes checklist status and
changes nothing else.
*Source:* stakeholder, 2026-07-03: "automatic and fast evaluation should be
implemented early"; evaluation "does not change any artifacts."
*Depended on by:* R25 (storage format exists to make this evaluation fast).

**R14 — Treat judged items as bookmarks.**
Where a checklist item requires judgment rather than a deterministic check,
the methodology must record it as judged (answer, evaluator, and time), treat
it as a bookmark for intent not yet externalized into artifacts, and expect
judged items that repeatedly cause rework to be made concrete — and where
possible deterministic — over time. Driving the judged count to zero is not a
goal.
*Source:* stakeholder, 2026-07-03: "anything that is judged is a bookmark for
something that needs to be fixed"; recorded in GLOSSARY.md ("Judged item").

**R15 — Enforce checker independence.**
The methodology must ensure that whoever evaluates a checklist item — human
or AI — is independent of whoever authored the thing being evaluated.
Independence is a property of roles, not of species: an AI checker is
acceptable.
*Source:* agreed 2026-07-03; k8s-platform post-mortem trap 1.

**R16 — Adopt existing projects (later).**
The methodology must eventually support adopting an existing, in-flight
project — not only projects started fresh under it. This capability is
explicitly sequenced after greenfield support works.
*Source:* stakeholder note, 2026-07-01; the k8s-platform turnaround is the
live case waiting for it.

**R17 — Resume from durable state alone.**
All state needed to continue work must live in durable, versioned artifacts,
so that a fresh AI session with no memory of prior conversations can resume
correctly from the repository alone.
*Source:* the context-loss incidents behind the first attempt's HANDOFF
(LESSONS.md les-0003).
*Depended on by:* S3 (the success criterion that exercises this).

## Qualities the methodology itself must have

**R18 — Preserve flow.**
Day-to-day use must preserve the human's flow state: minimal interruptions,
no re-explaining of context, and the routing/bookkeeping burden carried by
the AI partner.
*Source:* stakeholder, 2026-07-03: "make my own experimentation with building
with AI more enjoyable and something that keeps me in a flow state."
*Depended on by:* S4 (the success criterion that exercises this).

**R19 — Bound the instruction load.**
The human-facing surface of the methodology must stay small, and the
instruction load an AI session must absorb before doing useful work must stay
bounded — flat or shrinking over time even as the methodology matures.
*Source:* k8s-platform post-mortem: roughly 15,000 tokens of accumulated
instructions per fresh session, with no behavioral effect.

**R20 — Grow only on demonstrated need.**
The methodology must start minimal and grow only when a demonstrated need
arrives; removing a piece must be cheap; and the methodology must not contain
machinery for extending itself — extensions happen by conversation, not by
meta-process.
*Source:* stakeholder, twice: "start out simple and build from there"; "avoid
a methodology about the methodology… too much meta work, not enough work."

**R21 — Optimize cost-to-change.**
Every part of the methodology must be cheap to revise, on the standing
assumption that first versions are wrong. Optimizing the cost of change beats
optimizing first-run correctness.
*Source:* stakeholder (software-factory corpus): "there is basically 0 chance
that any of these will work first time."

**R22 — Fit the real environment.**
The methodology must operate natively in the actual working environment: git
repositories, markdown documents, Claude Code sessions, attended interactive
operation. It is not a system for unattended autonomous operation ("not a
dark factory").
*Source:* both repos' stated identity and working environment.

**R23 — Separate human-facing from AI-facing forms.**
Human-facing renderings and AI-facing canonical forms of the same information
must be allowed to differ; no single document is forced to serve both
audiences badly.
*Source:* the stakeholder's SQL-underlay vs. human-layer distinction
(human-scoped-deliverables skill, lago-morph/software-factory).

**R24 — Define roles by capability.**
Roles must be defined by the skills and goals they bring to the project,
never by who fills them. Assigning a specific human or AI to a role is a
per-project, revisable experiment.
*Source:* stakeholder, 2026-07-02; recorded in GLOSSARY.md ("Role").

**R25 — Storage supports fast evaluation.**
The storage format for artifacts, checklists, recorded answers, and
relationships must support fast, deterministic machine evaluation.
*Source:* design conversation, 2026-07-03.
*Depends on:* R13 (this candidate exists to make R13's evaluation achievable;
if R13 is dropped, revisit this one).

## Success criteria candidates

**S1 — The pilot completes inside the methodology.**
A real pilot project runs end-to-end inside the methodology — from recorded
intent to a validated result — and the methodology is never the reason work
stalls.
*Source:* design conversation, 2026-07-03.

**S2 — The documented failure classes do not recur.**
The failure classes named in the post-mortems do not recur: self-certified
done, unspecified seams, rule-pile growth, and meta-work displacing project
work. Any recurrence is recorded and drives a change.
*Source:* the four post-mortems (see reviews/2026-07-03-complexity-review.md).

**S3 — A cold session continues correctly.**
A fresh AI session, given only the repository, continues the work correctly
without re-explanation from the human.
*Source:* design conversation, 2026-07-03.
*Depends on:* R17 (this criterion is the exercise of that requirement).

**S4 — It feels like leverage.**
The stakeholder keeps choosing to use the methodology even for weekend-size
work, because it feels like leverage rather than drag.
*Source:* design conversation, 2026-07-03.
*Depends on:* R18 (this criterion is the exercise of that requirement).

## Promoted log

*(empty — when a candidate is promoted, its ID, date, and destination are
recorded here and its full text moves to REQUIREMENTS.md)*

## Register maintenance

Add candidates freely, each standalone and each with a source. Never delete
one for being unfashionable — strike through with a reason if invalidated.
Promotion and demotion follow the mechanic in REQUIREMENTS.md.
