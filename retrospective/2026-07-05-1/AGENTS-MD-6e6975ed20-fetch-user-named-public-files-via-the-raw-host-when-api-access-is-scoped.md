# agent instruction

**Fetch user-named public files via the raw host when API access is scoped.** "When the user explicitly links content in a public repository outside the session's GitHub scope, fetch it via raw.githubusercontent.com with curl; api.github.com, github.com pages, and git clone are proxy-scoped and return 403 for out-of-scope repositories. Do not use this path for content the user did not name."

*Grounded in: 403 add_repo responses while reading the linked forensics documents.*

# justification

The stakeholder linked post-mortem documents in two public repositories outside the session's repo scope. Three access paths failed in sequence — the GitHub API (403 "use add_repo"), shallow git clone (403 via the git proxy), and the github.com HTML pages (same 403) — before raw.githubusercontent.com served every file cleanly. Without the rule, each future session re-discovers the same dead ends: this session burned four tool calls and a directory-listing workaround (navigating via README links because raw hosts cannot list directories). With the rule, it is one curl. The scoping caveat keeps the workaround inside user intent: only content the user explicitly named.
