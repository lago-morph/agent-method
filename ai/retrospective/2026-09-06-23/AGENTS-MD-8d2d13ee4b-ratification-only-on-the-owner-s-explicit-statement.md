# agent instruction

**Ratification only on the owner's explicit statement.** Do not mark any artifact, ADR, or convention as ratified because a pull request merged, because review comments were addressed, or because the owner said 'ok' to one item. Mark ratified only when the owner states in words that the named items are ratified, and record the date and the statement.

*Grounded in: 'Always wait for me to state this explicitly' after the ratification pass at the end of the session.*

# justification

Documents in this repository carry a ratified-or-draft state and the lessons forbid any pending-approval state. Through nine pull requests, every merge was a plausible signal that the content was accepted, and every addressed review comment was a plausible signal that the item was settled. Neither was ratification. The owner ratified everything at once at the end, in one message, and then added "Always wait for me to state this explicitly", a standing direction that now lives in a lesson file.

Getting this wrong has an asymmetric cost. A premature ratification marker turns a draft into a binding document that a future clean-context subagent will build from, and nobody notices until the implementation embodies a decision the owner never made. Waiting costs one question at the end of a round.
