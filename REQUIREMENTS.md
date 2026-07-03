# Candidate requirements register — for the methodology itself

> **What this is:** the tracked list of candidate requirements for the
> methodology being built in this repo, each with its source. Candidates cost
> nothing while parked. A joint decision promotes a candidate to **active** —
> the set we design against in the current iteration. The register is never
> finished; "done enough to start an iteration" is the bar. What it is not:
> a design — the vocabulary and converged concepts live in GLOSSARY.md.

Status: all items are candidates — nothing promoted yet · Updated: 2026-07-03

## Purpose (draft, for markup)

Make building software with AI partners enjoyable and flow-preserving for a
single skilled engineer — with intent explicit, "verified" demonstrated rather
than claimed, and the failure patterns documented across four prior efforts
(k8s-platform, software-factory, agent-method first attempt, visual-efp-open-up)
prevented structurally rather than by exhortation. Working phrasing of the
underlying goal, from the software-factory corpus: "get incredible leverage
from the attention of a skilled engineer by providing AI inference coupled
with tools."

## Fixed scope facts (stakeholder answers, 2026-07-03)

- **One person per project.** Do not design for teams; revisit only if reality
  changes.
- **Weekend-size and up.** Must pay its way on a weekend project and scale
  structure via checklists as a prototype grows into a real application.
- **Greenfield first.** A small pilot project is already in mind. Adopting
  ongoing projects (the k8s-platform turnaround is the live case) comes after
  greenfield works.
- **Sharing with others is not a goal right now.** If it works for one person
  it might generalize — later.

## Candidates

### What the methodology must let you express

| # | Candidate | Source |
|---|---|---|
| R1 | Project objective, users, scope | Stakeholder: "Where do I put the objective of the application, the users…" |
| R2 | Decisions, with alternatives considered and rejected | Same; k8s-platform's version crisis was an unrecorded decision ("nothing pinned the versions") |
| R3 | Behavior the system must provide, for whom | 2026-07-01 note (use cases) |
| R4 | Constraints: implementation platform, performance, data durability, environment properties | Stakeholder; k8s-platform trap 2 (code written as if the ephemeral account were durable) |
| R5 | How the system is constructed (implementation) and how it runs (deployment) | Stakeholder: "at the VERY least you also need an implementation artifact, and some sort of deployment definition" |
| R6 | The seams between systems and layers, named and verifiable before implementation | k8s-platform trap 3 ("After apply, ArgoCD takes over" was an entire boundary spec; all four standing blockers were unspecified seams) |
| R7 | Different readiness levels on one artifact — ready-for-prototype vs ready-for-production | Multiple-checklists decision — GLOSSARY.md "Checklist" |

### What the methodology must let you do

| # | Candidate | Source |
|---|---|---|
| R8 | Verify by evidence, never by assertion; "verified" is always relative to current upstream artifacts | k8s-platform trap 1 (self-graded homework); first attempt's gate that never ran; GLOSSARY.md "Verified" |
| R9 | Compute status; detect staleness; make self-certification impossible | First attempt's status docs went stale within days; GLOSSARY.md "Checklist status" |
| R10 | Propagate change: an edit stales exactly the dependent items, statuses recompute, impact is visible | 2026-07-01 note ("change impact analysis 1st class"); GLOSSARY.md "Change propagation" |
| R11 | Route every change through the artifact that owns the decision — "I don't like X" becomes an upstream edit plus visible ripple, with the routing done by the agent | GLOSSARY.md "Where change enters"; stakeholder: unrooted changes "make all the upstream artifacts stale" |
| R12 | Manipulate artifacts freely when checklists stay satisfied; codify recurring manipulations as workflows | Stakeholder: "the load-bearing part should be the artifacts and the status of their checklists"; workflows are glue |
| R13 | Evaluate checklists automatically, deterministically, early — evaluation is read-only over artifacts | Stakeholder: "automatic and fast evaluation should be implemented early"; evaluation "does not change any artifacts" |
| R14 | Record judged items as bookmarks of un-externalized intent; repeated rework earns externalization | GLOSSARY.md "Judged item"; stakeholder: "anything judged is a bookmark for something that needs to be fixed" |
| R15 | Enforce checker independence: an item's checker is never the author of the thing checked (human or AI) | Agreed in conversation; k8s-platform trap 1 |
| R16 | Adopt an existing project into the methodology — after greenfield works | 2026-07-01 note; k8s-platform turnaround as the live case |
| R17 | Resume correctly from durable state alone in a fresh agent session | The context-loss incidents behind the archived HANDOFF (LESSONS.md les-0003) |

### Qualities the methodology itself must have

| # | Candidate | Source |
|---|---|---|
| R18 | Keeps the human in flow: minimal interruptions, no re-explaining, bookkeeping and routing done by the agent | Stakeholder: "make my own experimentation with building with AI more enjoyable and something that keeps me in a flow state" |
| R19 | Small human-facing surface; instruction load per session bounded, flat or shrinking | k8s-platform: ~15,000 tokens of accumulated instructions per fresh session |
| R20 | Starts minimal; grows only on demonstrated need; cheap to remove from; no methodology-about-the-methodology | Stakeholder, twice: start simple and build; "too much meta work, not enough work" |
| R21 | Built for revision: first versions assumed wrong; optimize cost-to-change over first-run correctness | Stakeholder (software-factory corpus): "basically 0 chance that any of these will work first time" |
| R22 | Native to git + markdown + Claude Code sessions; attended operation — not a dark factory | Both repos' stated identity and environment |
| R23 | Human-readable and agent-enactable without forcing one document to serve both audiences | The SQL-underlay vs human-layer distinction (human-scoped-deliverables skill) |
| R24 | Roles defined by capability — what the role brings, not who fills it; assignment experimental | Roles decision — GLOSSARY.md "Role" |
| R25 | Artifact/checklist storage format supports fast deterministic evaluation | Constraint flowing from R13 into the parked storage question |

### Success criteria candidates (how we know the methodology works)

| # | Candidate | Source |
|---|---|---|
| S1 | A real pilot runs end-to-end inside it — recorded intent to validated result — and the methodology is never the reason work stalls | Conversation, 2026-07-03 |
| S2 | The named failure classes do not recur: self-certified done, unspecified seams, rule-pile growth, meta-work displacing project work | The four post-mortems |
| S3 | A cold agent session continues correctly without re-explanation | R17 exercised for real |
| S4 | It feels like leverage, not drag — the stakeholder keeps choosing to use it even for weekend-size work | R18; the flow purpose |

## Promotion

Nothing is promoted yet. Proposed next step: jointly pick a small active set
for iteration one against the pilot project — small enough to try quickly,
per "done enough to start an iteration."

## Register maintenance

Add candidates freely, each with a source. Never delete one for being
unfashionable — strike through with a reason if invalidated. Promotion and
demotion are joint decisions, recorded here.
