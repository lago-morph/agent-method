# Requirements — purpose, scope, and the active set

> **What this is:** the requirements the methodology is currently being
> designed against, plus the purpose and scope facts that frame everything.
> Sessions load this file. Proposed requirements live in `CANDIDATES.md`,
> which is read **only** when requirements selection or markup is the
> session's explicit task — so speculative candidates cannot leak into
> ordinary session context.

Status: active set EMPTY — nothing promoted yet · Updated: 2026-07-03

## Purpose (draft, under markup)

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

## Active requirements

*(none — promotion pending; see HANDOFF.md next actions)*

## Promotion mechanic

- Promotion and demotion are **joint stakeholder + agent decisions**, made in
  conversation — never unilateral.
- Mechanic: the requirement's full standalone text **moves** from
  `CANDIDATES.md` into the Active section above, keeping its ID and source
  and gaining a promoted date. `CANDIDATES.md` keeps a one-line entry in its
  Promoted log so numbering stays visibly unique. Demotion is the reverse
  move, with the reason recorded.
- IDs are stable and never reused, in either direction.
- The dependency rule survives promotion: if a promoted requirement declares
  a dependency on something still in `CANDIDATES.md`, either promote both or
  record the dangling dependency explicitly here.

## Promotion log

*(empty)*
