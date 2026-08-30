# agent instruction

**Reset to a known state by tree restore verified by empty diff.** "To undo merged work without rewriting history, stage the target commit's entire tree over the working tree (`git rm -r . && git checkout <commit> -- .`), commit, and prove correctness with an empty `git diff <commit> HEAD` before pushing. Never force-push main and never hand-pick files when the goal is 'exactly the state after commit X'."

*Grounded in: resetting the repo to the post-PR#9 state via a forward commit verified against 05da187.*

# justification

The first removal attempt hand-picked files (delete the use case, unpick two link edits, restore a marker) and still needed a follow-up pass; when Jonathan then asked for "the state after PR 9," the tree-restore produced it in one commit with a machine-checkable proof — `git diff 05da187 HEAD` returning nothing. Hand-picking a revert invites exactly the partial-state errors a reset exists to eliminate, and force-pushing main would have broken the reviewer's own checkout. The technique costs three commands and gives a verifiable guarantee instead of a plausible one.
