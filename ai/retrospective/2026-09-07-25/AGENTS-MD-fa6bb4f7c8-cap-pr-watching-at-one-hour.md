# agent instruction

**Cap PR watching at one hour.** When subscribing to a pull request's activity, schedule one unsubscribe an hour out and no check-ins. Each check-in re-enters the session with its whole context and costs tokens out of proportion to what it finds.

*Grounded in: the owner's direction during implementation 4, after two agents checked overnight with nearly full contexts.*

# justification

The harness asks for a self check-in roughly every hour until a PR is merged. On this owner's account that produced two agents polling overnight, each wake carrying a nearly full context, for PRs that only he merges. His words: "Each check is a horrible drain on tokens." In this session one send_later reminder fired once, unsubscribed, and stopped; the cost was one wake. The rule is one scheduled call at subscription time.
