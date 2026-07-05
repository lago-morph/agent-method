---
artifact: plan
state: draft
depends-on: [model/vision.md]
---
# Plan (standing)

Order reflects one rule: the Vision gates first, because everything else
depends on it and the gate run is the process's first proof.

1. Stakeholder resolves the three {EDIT-N} markers in model/vision.md
   (inline guidance beside each: 2.2 unlike; 3.1 additional stakeholders;
   7 success criteria).
2. Run vision.gates.yaml BY HAND in-session (mechanical + judge items
   executed by the partner, human items answered by the stakeholder);
   write model/gate-records/gr-0001-vision.md; flip vision.md to gated.
3. Author model/use-cases/ for agent-method itself from the harvested UC
   template: uc-0001 run-a-gated-session, uc-0002 harvest-a-checklist,
   uc-0003 trace-defect-to-gate. Draft state; gate after UC checklist is
   harvested + decomposed.
4. Harvest pipeline v0 (method/toolchain/): XMI -> markdown for tasks,
   workproducts, checklists, templates of the stock OpenUP layer; preserves
   GUIDs; emits typed-edge index. First automation to retire a hand-crank.
5. MECHANICAL LINTER v0 (method/toolchain/): enforces
   docs/standards/repo-layout.md - file/directory placement rules,
   required frontmatter shape (artifact, state, depends-on), gate-record
   naming, and the draft-dependency rule (a gated doc may depend only on
   gated docs; flag violations as errors). Runs in CI on every push.
   Second crank retired.
6. Decompose + harvest the use-case checklist; gate the use cases.
7. Beads: init .beads in this repo; first reconciler sketch (manual): open
   beads minted from plan items 3-6 with blocks edges.

Re-prioritization is cheap and expected; this is a standing document.
