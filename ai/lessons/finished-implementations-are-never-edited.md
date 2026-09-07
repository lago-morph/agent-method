# A finished implementation is never edited

Once an implementation has been delivered, its artifacts —
`workbench/implementations/<N>/` and the implementation's record and
per-area notes — are the historical record from which the method is
derived. They are never edited afterwards, not even to apply markup.
Markup after delivery goes to the specification (the use cases) and is
implemented by the next implementation. Changes made to a delivery PR
after its first commit are sectioned off into their own PR, so the
comparison surface between implementations stays intact.

Grounding (2026-09-06): at the implementation 3 checkpoint the AI
partner applied a markup ("the message list opens empty") to
implementation 3's HTML, checks, and notes on the delivery PR (#20).
Jonathan: "you should never update a finished implementation. That is
the historical record we need to create the agent method!" The files
were restored to the delivery commit and the markup moved to a stacked
PR touching only the use cases.

Grounding (2026-09-07): reviewing implementation 4 before its PR was
merged, the AI partner applied a fix and note edits to the run's
output in a "review commit". Jonathan: "Do not modify implementation 4
in any way." The delivery PR's review happens in the procedure and the
guides; the implementation, its record, and its notes stay as the run
produced them from their first commit onward.
