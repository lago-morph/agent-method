# agent instruction

**Recap standalone when the user loses context.** "If Jonathan signals he cannot see prior context ('Hello?', 'I can't see the chat'), reply with a self-contained recap - what the session is about, what has happened, the current state, and what is waiting on him - written for zero visible scrollback. Never reply with something that only makes sense next to earlier messages."

*Grounded in: mid-session context loss on 2026-08-28.*

# justification

Twice in one session Jonathan surfaced with no visible context - first "Hello?", then "I can't see the context for the chat." The recovery that worked was a full standalone recap (what this session is about / what happened / current state / what's waiting on you); anything less would have forced him to ask again. The failure mode this rule prevents is real: a terse "as I said above..." reply to a user with no scrollback is indistinguishable from silence. Marginal cost: a few extra sentences on the turns where it matters.
