# agent instruction

**Unsubscribe from a PR right after creating it in this repository.** The harness subscribes the session to a PR the moment it is created, before any tool call of yours. In this repository, call `unsubscribe_pr_activity` for the new PR immediately after creation unless Jonathan has asked for a watch, and never tell him the PR is unwatched before that call has returned.

*Grounded in: PR #29, told "not subscribed" and then found subscribed by a `subscription.created` event.*

# justification

The lesson caps PR watching at one hour because each wake re-enters the session with its whole context. In this session the recap said no subscription existed, then a notification arrived showing the harness had created one. The statement was wrong for a few minutes and cost one wake; had the session ended, the subscription would have run until the PR closed, exactly the overnight drain Jonathan described. One unsubscribe call after each PR creation removes the risk and makes the recap true.
