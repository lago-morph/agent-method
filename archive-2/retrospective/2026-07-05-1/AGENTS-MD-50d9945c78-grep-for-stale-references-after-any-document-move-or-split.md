# agent instruction

**Grep for stale references after any document move or split.** "After moving, renaming, splitting, or merging documents, grep the live tree for every old name and path, and re-verify each document's self-declared constraints (line budgets, required sections) before pushing. Treat a hit as a defect, not a nit."

*Grounded in: the register split leaving three stale references and a 22/20-line HANDOFF, caught only by an after-push grep.*

# justification

Splitting REQUIREMENTS.md into two files stale'd three references in GLOSSARY.md and CLAUDE.md and quietly pushed HANDOFF.md to 22 lines against its own "keep under 20" rule. All four defects were caught by a single grep — but only *after* the first push, costing a follow-up commit and a moment where the repo's live docs lied about where candidates live. This is precisely the change-ripple failure the methodology under construction exists to prevent (candidate R10), demonstrated on the methodology's own documents. Until the deterministic evaluator exists, the manual sweep is one grep plus one wc — seconds of work standing in for the class of bug the whole session was about.
