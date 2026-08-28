# Spec: `idea-shelving`

- **ID**: SKILL-SPEC-e96a67b9a0
- **Source retrospective**: ../2026-08-28-4.md

## Intent

Preserve an abandoned or redirected line of work as a durable, resumable idea record instead of deleting it or leaving it half-alive. When a user rejects a deliverable or pivots direction, the work's value is not zero - it is a shelf item. This skill packages the artifact itself, the open line of inquiry that was live when work stopped, and an unratified summary of perceived user intent into a directory a future session can resume from, as was done for the spec-test-organization plan when Jonathan redirected to an artifacts-first experiment on 2026-08-28.

## Trigger

Direct: "store this as an unimplemented idea", "shelve this", "keep this to mine later", "capture what you did and park it", "I don't want to pursue this, but don't lose it".

Proactive: offer when the user rejects or redirects away from a substantial deliverable (a plan, a design, a prototype) without asking for its deletion — especially when they say things like "not now", "interesting but", or describe a new direction that abandons the old one.

Negative: do NOT trigger for work the user asks to delete outright, for trivial rejected suggestions (a rewording, a one-liner), or for work that is merely paused within the same direction.

## Inputs

- The rejected/redirected artifact(s): file paths or PR reference.
- The conversation context in which the redirect happened (what the user said, what questions were open).
- A target directory (default: the artifact's existing directory; otherwise ask).

## Outputs

Four files in one directory, committed and pushed on the working branch, with the PR (if one exists) retitled to describe the capture:

- The original artifact, unchanged except a status banner prepended.
- `LINE-OF-INQUIRY.md` — the open questions and reasoning thread at stop time.
- `PERCEIVED-INTENT.md` — AI-inferred user intent, explicitly labeled unratified.
- `README.md` — an orientation table for a future reader.

## Workflow

1. Prepend a status banner to the original artifact: `STATUS: UNIMPLEMENTED IDEA`, the capture date, one sentence on why it stopped (from the user's own words), a pointer to the sibling files, and "do not implement unless <user> directs it".
2. Write `LINE-OF-INQUIRY.md`: how the thread started, each question that was open when work stopped (verbatim where possible) with one line on why it was asked, any partial answers the redirect itself supplied, and a "if resuming, start here" note.
3. Write `PERCEIVED-INTENT.md`: open with a provenance header (written by the AI, date, inferred from what evidence, unratified — a mirror whose authority comes only from future user markup), then the inferred wants, each traceable to something the user said. Record observed risks honestly (e.g. repeated-reset patterns), not just wants.
4. Write `README.md`: a table of the files, one line each, plus why the work stopped and where the active direction went.
5. Commit with a message of the form "Recast <thing> as preserved unimplemented idea". If a PR exists for the branch, update its title/body to describe the capture rather than the original proposal; do not open a second PR for the same branch.

## Concrete examples

### Example 1: the spec-test-organization plan (this session)

Input: `spec-test-organization/PLAN.md` in `lago-morph/idea-pipeline`, live on PR #38, rejected with "I thought we were going to discuss this first" and later "capture what you did for your pr ... store it as an interesting, unimplemented idea." Output: banner on PLAN.md; `LINE-OF-INQUIRY.md` recording the three unanswered requirements questions (where does it hurt / what decision does the visual surface serve / what must it feel like); `PERCEIVED-INTENT.md` with the unratified header and eight inferred wants; `README.md` orientation table. Commit `499e1fe` "Recast spec-test-organization plan as preserved unimplemented idea"; PR #38 retitled "Preserve spec-test-organization plan as an unimplemented idea record"; merged same day.

### Example 2: a rejected architecture prototype (hypothetical shape)

Input: a `prototype/event-bus/` directory the user redirects away from ("let's go synchronous instead, but keep the async idea around"). Output: `prototype/event-bus/DESIGN.md` gains the status banner; `LINE-OF-INQUIRY.md` records the unresolved question ("what backpressure policy?"); `PERCEIVED-INTENT.md` records that the user wants simplicity now but expects scale later; `README.md` routes. The synchronous work proceeds elsewhere; the shelf item waits.

## Anti-patterns

- **Deleting or letting the branch rot.** The session's redirect explicitly asked to keep the thread resumable; unmerged branches evaporate.
- **Merging the rejected work as if still live.** The banner must make non-pursuit unmistakable before the record lands on main.
- **Writing perceived intent without the unratified header.** Intent authorship belongs to the user; an unlabeled inference document becomes fake requirements.
- **Summarizing the open questions instead of preserving them.** The questions verbatim are what makes the thread resumable; paraphrase loses the hooks.

## Acceptance criteria

- [ ] A fresh-context session pointed at the directory can state why work stopped, what was open, and how to resume, from the files alone.
- [ ] The original artifact is byte-identical except the prepended banner.
- [ ] `PERCEIVED-INTENT.md` carries the provenance/unratified header as its first content.
- [ ] Everything is committed, pushed, and (if a PR exists) the PR describes the capture.

## Files this skill creates / modifies

- `<dir>/<original-artifact>` — status banner prepended.
- `<dir>/LINE-OF-INQUIRY.md` — open questions at stop time.
- `<dir>/PERCEIVED-INTENT.md` — unratified AI-inferred intent.
- `<dir>/README.md` — orientation table.
