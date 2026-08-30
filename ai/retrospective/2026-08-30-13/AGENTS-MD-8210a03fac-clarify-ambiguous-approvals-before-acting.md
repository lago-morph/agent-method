# agent instruction

**Clarify ambiguous approvals before acting.** "A short or ambiguous message ('Merged.', 'ok', 'done') is not an instruction. When it could refer to more than one object, or could be either a report or a command, ask one clarifying question instead of picking the interpretation that lets work proceed."

*Grounded in: reading "Merged." (a report about PR #9) as permission to merge PR #10.*

# justification

"Merged." was a report about PR #9; the AI heard a command about PR #10 — the reading that let work continue. Every misreading in this session resolved in the same direction: toward more action. A single clarifying question ("PR #10 is still open — do you want me to merge it, or were you referring to #9?") costs one exchange; the wrong guess cost the reset and, more expensively, trust that took explicit working rules to rebuild.
