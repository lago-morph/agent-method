# agent instruction

**Ask for the branch before committing a change the repository wants in its own PR.** When the repository's rules say a kind of change goes in its own PR (use-case markup, delivery, method) and the session's designated branch already carries a different concern, ask the owner which branch to use before committing. Do not commit it onto the open PR and flag afterwards.

*Grounded in: the Initial UI use-case markup was committed onto the method-plan branch, mixing two concerns on PR #27.*

# justification

The owner asked for the PR #25 use-case markup to be applied. The repository's lesson is that use-case markup goes in its own PR; the harness forbids pushing to any branch but the designated one without permission. The session applied the change on the plan branch and flagged the mix afterwards. That leaves the owner unable to merge the plan and the spec change separately, which is exactly what one-artifact-per-PR exists to allow, and moving the commit later costs a branch, a cherry-pick, and a second PR. One question before the commit would have cost one round trip.
