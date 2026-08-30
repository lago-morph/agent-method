# agent instruction

**Sweep for stale pointers when moving or renaming living documents.** "Whenever a document is renamed, moved, or superseded, grep the repository for references to its old name and update every one in the same commit. A stale pointer confuses both the human and the next agent session."

*Grounded in: SEED/KICKSTART references in CLAUDE.md, README.md, and method/README.md found only by grepping during the rename.*

# justification

The KICKSTART→HANDOFF and SEED→PLAN renames would have left four stale references (CLAUDE.md, the root README twice, method/README.md) — including the very first line a fresh session reads, pointing it at a file that no longer exists. One `grep -rn "SEED\|KICKSTART"` found them all in a second. Jonathan's motivating sentence names the cost precisely: "If you have stale files I and probably a future agent session will get confused." In a project whose continuity mechanism *is* the documents, a dangling pointer is a broken bootstrap.
