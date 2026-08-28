# agent instruction

**Restart a merged branch from origin main.** "After the pull request for a working branch merges, never stack new commits on the merged history. Re-point the branch at the fresh default branch (git fetch origin main && git checkout -B <branch> origin/main) and treat follow-up work as a new pull request."

*Grounded in: two clean branch restarts after PRs #3 and #4 merged.*

# justification

This pattern ran twice in the 2026-08-28 session - once after PR #3 merged (before the note-type work that became PR #4) and once after PR #4 merged (before this retrospective). Each restart took two git commands and kept every pull request a clean, reviewable unit whose diff contains only its own change. The alternative - stacking on merged history - produces pull requests whose diffs re-show already-merged commits, confusing review and risking duplicate merges. Two commands against reviewer confusion is not a close call.
