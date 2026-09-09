# agent instruction

**Rewrite a document by script all-or-nothing.** When a script rewrites a document with many targeted replacements, assert that every replacement matched at least once, keep the result in memory, and write the file only after the last assertion passes. Never write partial results.

*Grounded in: the restructuring script for ai/method-plan.md failed its assertion on one pattern and left the file untouched, so the rerun started from a clean state.*

# justification

The restructuring script for the plan made about forty replacements across twenty-two sections. One pattern was written with a line break in the wrong place and did not match. Because the script asserted every replacement and wrote nothing until the end, the failure left the file byte-identical, confirmed by `git diff --quiet`, and the corrected script ran from the same starting point. The alternative, writing as it went, would have produced a half-renumbered document with no clean way back except a git checkout that also discards any intended edits. The cost is one `assert` per replacement and one write at the end.
