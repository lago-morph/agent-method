# agent instruction

**Section off post-delivery changes in specification documents.** When a use case or guide is revised after an implementation was delivered against it, put the revision in the document's normal place but record in the next implementation record which use-case changes are new since the previous implementation, so the implementer and the reviewer can see what moved. Never annotate the delivered implementation to point at the change.

*Grounded in: the checkpoint markup after implementation 3, moved to a stacked branch with the record carrying the delta.*

# justification

After implementation 3 was delivered, the checkpoint review changed the Initial UI and Edit ideas use cases in six places. Implementation 3 is frozen, so it now disagrees with the use cases it was built from, and the next implementer needs to know exactly which behaviors are new. The resolution in this session was to keep the revisions in the use cases and have implementation record 4 name the use-case changes since implementation 3, so the delta is visible in one place without touching the delivered files.

Without this, the next subagent reads the current use cases, compares them with the previous implementation's notes, and reports the differences as ambiguities, which is what implementation 3's run did for the gaps between records 2 and 3. Naming the delta in the record is a few bullets and saves the subagent a diff it cannot do reliably.
