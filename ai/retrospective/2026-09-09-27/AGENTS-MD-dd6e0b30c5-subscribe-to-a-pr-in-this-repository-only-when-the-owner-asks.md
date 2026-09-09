# agent instruction

**Subscribe to a PR in this repository only when the owner asks.** In a repository with no CI, where the owner reviews in PR threads and states decisions in conversation, do not subscribe a session to a PR on creation. Subscribe only when the owner asks for the PR to be watched; the one-hour cap then applies.

*Grounded in: PR #27's subscription produced three wakes (two subscription echoes and the scheduled unsubscribe) and zero review events.*

# justification

The repository has no workflows, so there is no CI to go red. The owner's reviews arrive as threads he then discusses in conversation, and every session is told to wait for his word. On PR #27 the subscription cost three wakes, each re-entering the session with its full context, and delivered nothing. The owner's earlier direction was that each check is a drain on tokens; the one-hour cap reduced the drain but did not remove the two echo wakes that arrive on subscription itself. Not subscribing costs nothing here. This rule is for the owner to confirm, since the session's harness asks for a subscription by default.
