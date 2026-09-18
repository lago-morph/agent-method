# agent instruction

**Every scripted substitution asserts its anchor.** When rewriting a document by script, express each change as `(old, new)` and assert that `old` occurs in the text before replacing it. A missing anchor aborts the run before any file is written. After the run, reflow any paragraph the substitution lengthened, and grep for the strings the change was meant to remove.

*Grounded in: the method-plan rewrite of 2026-09-17, sixteen asserted substitutions over phase 2, one reflow, one stale-reference grep.*

# justification

A substitution that finds no anchor is a silent no-op: the file is written, the reference stays wrong, and nothing reports it. The assert turns that into a loud failure at zero cost, since the anchor text has to be written either way. The reflow matters too: one substitution in this session produced a 131-character line in a 72-column document, visible only because line lengths were checked afterward. Retrospective 2026-09-09-27's suggestion to rewrite all-or-nothing covers the transaction; this rule covers each step inside it.
