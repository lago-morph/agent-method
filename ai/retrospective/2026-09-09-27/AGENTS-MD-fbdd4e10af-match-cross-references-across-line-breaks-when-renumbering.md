# agent instruction

**Match cross-references across line breaks when renumbering.** When renumbering steps, sections, or figures in a wrapped markdown document, find every cross-reference with a whitespace-tolerant pattern (`steps?\s+\d+(\s+(to|and)\s+\d+)?`) over the whole text, not a line-by-line grep. List them by section before editing and rerun the same listing after, and read the after list in full.

*Grounded in: the first cross-reference grep over ai/method-plan.md missed "steps 14\nto 21" and "steps 14\nand 21", which wrapped across lines.*

# justification

Restructuring the 22-step plan into two phases changed most step numbers. The first `grep -o` pass over the document listed 55 references and missed at least two that wrapped across a line, one of them the range that tells step 2 which steps its budgets govern. A whitespace-tolerant Python scan found them; without it, a session executing step 2 would have been pointed at the wrong steps. The cost of the rule is one regex over the file, twice. The cost of not having it is a silent wrong pointer in a document that fresh contexts are told to trust.
