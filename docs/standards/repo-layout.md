---
artifact: standard
state: draft
name: repo-layout-and-document-states
enforcement: manual now; mechanical linter is a planned toolchain item
---
# Standard: repository layout, standing documents, document states

## Directory layout (this repo, the method system)

    README.md            orientation (human + AI)
    HANDOFF.md           STANDING. AI-audience session-state dump. Always current.
    LESSONS.md           STANDING. Lessons register; entries cite incidents.
    LICENSE
    docs/standards/      repo standards (this file and successors)
    method/content/      harvested + authored method content
      templates/         work-product templates (frontmatter: source-guids)
      checklists/        checklist .md + sibling .gates.yaml decomposition
      tasks/ roles/ formulas/   (as harvested; future)
    method/harvest/      harvest notes + pipeline (NOTES.md is standing)
    method/toolchain/    gate kit, judges, extractors, reconciler, linters (future)
    model/               THIS repo's own work products (it dogfoods itself)
      vision.md plan.md  standing work products
      use-cases/         (future)
      gate-records/      gr-NNNN-<artifact>.md, immutable, append-only
    calibration/         known-good / known-bad sets for judges (future)

Project repos (consumers) contain ONLY: their own model/, src/, .beads/,
gate records, and a method-version pin. No method internals. Versions flow
down; proposals flow up.

## Standing documents
README, HANDOFF, LESSONS, model/vision.md, model/plan.md,
method/harvest/NOTES.md. Standing documents are updated in place (history
lives in git); everything else is append-or-supersede.

## Document states
Every model/ document carries frontmatter: artifact, state, depends-on (list
of paths or GUIDs).

- state: draft - MAY merge to main without passing gates. ONLY draft
  documents may depend on a draft document.
- state: gated - has passed its decomposed checklist; a gate record exists
  and is referenced (gate-record: <path>). A gated document may depend ONLY
  on gated documents.

Consequences: draft-ness propagates down the dependency chain; gating a
document requires its whole dependency closure to be gated. Demotion of a
dependency to draft forces dependents back to draft (future linter computes
this; until then, enforce by hand at gate time).

## Naming
Gate records: model/gate-records/gr-NNNN-<artifact-slug>.md, NNNN
monotonic. Lessons: les-NNNN. Use-case files: model/use-cases/uc-NNNN-<slug>.md.
Harvested content keeps source GUIDs in frontmatter forever.
