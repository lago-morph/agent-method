# agent instruction

**Keep the three concerns separate.** "In agent-method, method material goes in method/, artifact instances of the application being specified go in workbench/, and AI-generated working documents (plans, drafts, checklists, status reports, handoffs, retrospectives) go in ai/. Never mix them, and keep workbench/ self-contained - relative links only, no references outside the directory - so it can later move wholesale to its own repository."

*Grounded in: the 2026-08-28 three-directory layout ruling.*

# justification

Jonathan stated this separation twice in one message on 2026-08-28, closing with "Please make sure to keep separate the three concerns." The cost of drift is concrete: a workbench/ that references outside paths cannot be lifted to its own repository (a move Jonathan already plans); method documents polluted with application content recreate the abstraction tangle that got the previous two attempts archived; AI residue mixed into either concern makes both unreadable. The marginal cost is choosing one of three directories per file - effectively zero.
