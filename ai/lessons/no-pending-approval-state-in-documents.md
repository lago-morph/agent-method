# No pending-approval state in merge-approved documents

For any document where merging its PR is implicit acceptance, write the
text so it is already correct after the merge. Status may live inside a
document only when the document is not something approved at creation
time. The PR carries the "up for review" framing; the document states
facts as they will stand once landed.

Grounding (2026-08-30): draft markers saying "awaiting Jonathan's
markup" were merged along with their PRs, leaving stale state claiming
approval hadn't happened.
