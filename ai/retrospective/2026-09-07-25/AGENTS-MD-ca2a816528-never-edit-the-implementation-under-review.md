# agent instruction

**Never edit the implementation under review.** From the moment an implementation run finishes, do not change anything under `workbench/implementations/<N>/`, the implementation record, or its per-area notes, for any reason and before any delivery. Record every review finding in the procedure's section for that implementation; list what the owner must decide; change nothing.

*Grounded in: implementation 4's "review commit", reverted at the owner's direction.*

# justification

Reviewing implementation 4, the session applied a reviewer's finding to the run's HTML, added two checks, and edited the record and all six notes, in a commit separate from the run's. The separation did not help: the owner's purpose is to compare what Opus and Sonnet produce from the same artifacts, and one edit makes it a comparison between a model and a model plus the reviewer. Undoing it took a restore of nine files, a rewrite of the procedure's section, the comparison, the handoff, the PR body, and a republished hosted copy. The rule costs nothing: findings go into a section that already exists.
