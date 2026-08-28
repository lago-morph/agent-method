# agent instruction

**Move quarantined files without opening them.** "Files a standing rule forbids reading (CANDIDATES.md historically; anything in archive/ or archive-2/) may still be moved, renamed, or archived - use git mv or shell moves that never print the contents, and note in the commit or reply that the file was moved unread."

*Grounded in: archiving CANDIDATES.md to archive-2/ unread.*

# justification

During the 2026-08-28 restart, CANDIDATES.md was under an explicit no-read quarantine yet had to move into archive-2/. git mv moved it without printing a byte, preserving both the quarantine and file history. Without this rule a future agent faces a false dilemma: open the file "just to check what it is" (breaking quarantine and contaminating context with speculative requirements) or refuse to touch it (blocking the archive operation). The rule costs nothing - git mv is already the right tool - and removes the temptation entirely.
