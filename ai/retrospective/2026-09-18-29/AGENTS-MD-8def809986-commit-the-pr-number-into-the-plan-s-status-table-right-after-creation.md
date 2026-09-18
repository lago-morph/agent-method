# agent instruction

**Commit the PR number into the plan's status table right after creation.** A step's PR number is not known until the PR exists, so a step's status row is completed in two commits: the step's content, then, after `create_pull_request` returns, one commit that fills the PR column. Do not guess the next number from the last one.

*Grounded in: step 1 of the method plan, committed as `done` with an empty PR column and completed by a second commit naming #29.*

# justification

The status table is the one place a fresh session looks to find what happened to a step, and a row without its PR number sends the reader to the git log. Guessing the number from the previous PR fails whenever an issue or another PR takes the number first. The two-commit pattern costs one small commit and keeps the table right from the moment the PR is open.
