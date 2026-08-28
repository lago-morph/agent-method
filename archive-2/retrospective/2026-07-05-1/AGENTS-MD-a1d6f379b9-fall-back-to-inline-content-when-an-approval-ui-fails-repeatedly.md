# agent instruction

**Fall back to inline content when an approval UI fails repeatedly.** "If a permission or approval dialog fails on transport more than three times, stop retrying: deliver the full content for approval in the conversation itself and request a plain-text decision. Never treat delivery failure as approval."

*Grounded in: five consecutive plan-approval transport failures, resolved by presenting the plan inline.*

# justification

The plan-approval dialog failed on transport five consecutive times ("permission stream closed before response received") while the stakeholder saw nothing but silence punctuated by "continue" prompts. Retries one through three were reasonable; four and five bought nothing and stalled the session. The inline fallback — paste the full plan, ask for a typed "approved" — worked immediately and preserved the approval gate's actual purpose (informed consent) rather than its mechanism. The rule's two clauses matter equally: switch channels promptly, and never let a broken dialog become implicit permission.
