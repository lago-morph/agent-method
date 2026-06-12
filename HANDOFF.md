---
artifact: handoff
state: draft
audience: AI agent instances ONLY. Dense by design. Read before doing anything.
updated: 2026-06-12 (session 1)
---
# HANDOFF - agent-method session state and full design synthesis

You are an agent partner on agent-method. Your context window can be
compressed WITHOUT WARNING (it happened this session: les-0003). This file is
the insurance: everything load-bearing, restated. Keep it current - update it
whenever a decision lands. Chat is never the only home of anything.

## 1. Identity and scope
- agent-method = guided workflow for ONE human (Jonathan, GitHub lago-morph)
  + an agent partner, building systems interactively. NOT a dark factory; no
  unattended operation; no parallel fleet coordination (parked).
- Hypothesis: CASE/RUP-era methods failed only because humans would not do
  the bookkeeping; agents will. Harvest the old method content, enact with
  agents, add the mechanical truth layer 2007 could not have.
- Dogfood: this repo builds its own automation under its own process; gates
  are hand-cranked until automation retires each crank.

## 2. Session protocol (constitution)
- Push everything by end of turn. Sandbox is scratch (les-0002); context is
  volatile (les-0003). Decant continuously, not at session end.
- Verify writes by writing (les-0001). Fresh-clone verify when bash exists;
  otherwise verify via API echo (get-commit files).
- Draft rule: a document with state: draft may merge to main WITHOUT passing
  gates, but ONLY draft documents may depend on it. Corollary: a gated
  document may depend only on gated documents. (Mechanical linter: future.)
- Done = verdict of a gate, never a claim. Stakeholder (human) items cannot
  be answered by any agent.
- The human is Stakeholder (only reality contact) and auditor-general (gate
  autopsies, calibration disputes, phase sign-off).
- Do only what is asked; confirm before extras. Clone public repos to /tmp.
  Never proceed on guesses about inaccessible information - stop and ask.

## 3. Architecture synthesis (the whole design, compressed)
Two planes, one join:
- CONTENT plane: work products as files in git. GUID-stable identity, typed
  edges, frontmatter (artifact, state, depends-on). Gate records live HERE,
  beside the artifacts they certify, immutable, append-only.
- ENDEAVOR plane: Gas City + beads (Dolt). Beads = state-transition tokens
  IN FLIGHT for any artifact ('uc-007 needs elaboration' = task bead with
  metadata artifact=<guid>, transition=outlined->detailed). Artifacts/code
  are NEVER in beads. Bead deps stay the stock five types; blocks edges
  derive from task mandatory-input preconditions; discovered-from carries
  emergent-work lineage. Dolt gives full history, time travel, audit.
- JOIN: artifact GUID in bead metadata; closing a gate-bead requires the
  gate-record pointer. RECONCILER (future tool): desired maturity (plan) vs
  computed maturity (evidence) -> diff materializes as beads. K8s-controller
  pattern applied to methodology.

Method basis:
- EPF is the method SYSTEM (UMA meta-model: GUIDs on every element AND every
  task step; cross-refs carry href+guid; variability contribute/extend/
  replace + configurations). OpenUP is the starter LIBRARY: lifecycle spine
  (Inception/Elaboration/Construction/Transition as risk gates), management
  loop (vision, work items, risk list, iteration plan), 17 tasks/98 steps,
  checklists. Scrum/XP libraries are standalone siblings (no OpenUP refs);
  DSDM overlay proves composition. Known content gaps arrive as practice
  plugins via the retro loop: contracts/CDC, mechanical verification,
  GitOps/ops/observability (Jonathan is SME), security, data modeling.
- Practice admission: replay-proof (a new gate must catch the actual escaped
  defect when replayed); prune checks that never fire; practices ride their
  own maturity ladder (bridge -> lesson -> plugin -> evaluated w/ Thread
  before/after across a pinned version bump).

Gates (the truth layer):
- Every checklist decomposes into mechanical / scoped-judge / human items
  (see method/content/checklists/vision.gates.yaml as the exemplar:
  4/7/5 across 10 items).
- Judge cage: fixed named inputs (never the repo), ONE narrow question,
  verdict in {pass, fail, cannot-determine}, MANDATORY cited evidence spans
  (verdict without citation is invalid), judge != author, read-only,
  version-pinned. Calibration sets = regression tests for judges; re-run on
  any model/prompt change. Prefer small/local models: less gameable (cannot
  model the persuader), bitwise-reproducible at temp 0 pinned weights;
  fine-tune from accumulated calibration data. Check maturity ladder:
  frontier judge -> small classifier -> regex/AST.
- Context firewall: deterministic extractors produce fixed-format dossiers;
  judge sees ONLY the dossier; dossier is itself an auditable artifact.
- Escape analysis: defect autopsy verdicts = coverage gap | judge error |
  extractor blind spot, each with distinct remedy; defective artifact joins
  calibration set as known-bad. NOT every defect is an escape - genuine
  discovery routes to requirements change, not gate blame.
- Goodhart containment: firewall + small judges + replay-admitted gates +
  TERMINAL reality gates (clean build from scratch x2; stakeholder
  validation). Paper gates are provisional; reality gates are terminal.

Other bindings:
- Arazzo = executable REALIZATION of use-case flows (steps reference
  contract operationIds, successCriteria = machine postconditions); NOT the
  requirements language (use-case text stays above the API surface).
- Spectral = mechanical lint for OpenAPI/AsyncAPI/Arazzo. Pact-class CDC for
  expectations. openapi-diff-class for breaking changes. Diataxis for docs
  (tutorial/how-to/reference/explanation; reference generated from
  contracts). Entropy dial (staged ambiguity) = advisory content for now.
- Roles: harvested OpenUP roles worn as hats by the partner ('reviewing as
  Architect'); Stakeholder is never a hat.
- Dual interface: views = read-only eyes (Foolery: verification queue;
  beads-web/BeadBoard: kanban/DAG; Thread: Dolt-history forensics; adapted
  graph viewer from encyclopedia docs/viewer.html: kind=hue,
  maturity=luminance). Chat = the only hand. Dolt rewind scrubber possible.
- Delivery: this repo ships as a Claude Code plugin eventually; verbs
  /next /gate /retro /decant; projects pin a method version (two-repo
  contract: versions down, proposals up, nothing else crosses).

## 4. Repo state (as of this commit)
- agent-method commits: b5e22d2 (repo init w/ LICENSE), 26db72e (harvested
  vision template/checklist/gates), 5baec38 (vision draft + harvest notes),
  this commit (handoff, lessons, standards, plan).
- model/vision.md: state draft; THREE OPEN SLOTS awaiting stakeholder:
  (1) 2.2 'unlike' - primary alternative displaced; (2) 3.1 additional
  stakeholders; (3) 7 success-criteria confirmation. When closed: run
  vision.gates.yaml BY HAND, write gate record #1 to model/gate-records/.
- Harvest sources + measured inventories + XMI format findings:
  method/harvest/NOTES.md. Key GUIDs: vision template -DUD2tbhBn23i6Jm6gcoN9Q,
  workproduct _zHTQUKYSEdmvhNXG0Oc2uA, checklist _qktWQMM0EdmSIPI87WLu3g.
- Founding design provenance: github.com/lago-morph/encyclopedia (39-node
  graph: decisions dec-0001..0010, insights ins-0001..0009, plan, lessons,
  session narrative docs/sessions/2026-06-11.md, graph viewer
  docs/viewer.html). Treat as historical record, not living spec.

## 5. Write path (chat -> GitHub, no bash needed)
Jentic -> GitHub Git Data API. Sequence: get-ref -> create-tree (base_tree =
head commit's tree; inline content, or create-blob base64 for big/binary) ->
create-commit (parents=[head]) -> update-ref. Operation UUIDs:
get-ref op_4a523dbf646c6239 | get-commit op_a6fa2d740d5238e8 |
create-tree op_2c936637d0e737f2 | create-commit op_87eef88a86d93e5f |
update-ref op_6be2385d11f5de30 | create-blob op_3dd46ada2cdb46d0.
Gotcha (les-0001): public-repo READS succeed with any token; only a write
proves the token. Fine-grained PAT must list the repo + Contents read/write.

## 6. Immediate next steps (see model/plan.md)
1. Stakeholder closes the three vision slots.
2. Run vision gates by hand; write model/gate-records/gr-0001-vision.md;
   flip vision.md state draft->gated (it will then depend on nothing draft).
3. Use cases for agent-method itself (run a gated session; harvest a
   checklist; trace a defect to a gate). Use harvested UC template.
4. Harvest pipeline (XMI -> markdown content) as first toolchain work item.
