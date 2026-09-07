# agent instruction

**Capture review threads verbatim before acting.** When the owner leaves a review with several threads, write every thread verbatim into `ai/feedback-pr-<N>.md` with its file, line, and disposition before changing anything. Reply on a thread only to answer a direct question, with the attribution footer. Never resolve a thread the owner will process himself.

*Grounded in: the 19-thread review of PR #25 and its umbrella instruction to capture, not fix.*

# justification

The owner's review of PR #25 opened with an instruction: capture everything for future PRs, change existing text only where it implied editing a delivered implementation is acceptable, move or delete nothing. Nineteen threads spanned use-case markup, workbench structure, verbosity, procedure hygiene, and two questions. A session that starts fixing loses the ones it did not get to and hides the rest by resolving them. The capture document cost one file; every thread survived with its words intact, and his later processing pass sees all of them.
