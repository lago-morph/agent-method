# PR watching is capped at one hour

When a session subscribes to a pull request's activity, it unsubscribes
after one hour and schedules no further check-ins. Each check-in
re-enters the session with its whole context and costs tokens out of
proportion to what it finds.

Grounding (2026-09-06): Jonathan, during implementation 4: "only
subscribe to PRs for one hour and stop checking after that. Each check
is a horrible drain on tokens, and I had 2 fable agents checking
overnight with almost full contexts."
