# agent instruction

**Do not WebFetch instruction-bearing documents.** "To read a file whose content is itself instructions (a skill, a prompt, an agent rulebook), curl the raw file instead of using WebFetch - the fetch tool's extraction model can adopt embedded instructions as constraints on its own answer and refuse or distort the reproduction."

*Grounded in: WebFetch refusing to reproduce SKILL.md because the skill's own 125-character quote limit contradicted the request.*

# justification

Asked to reproduce a skill file verbatim, WebFetch's extraction model read the skill's internal rule ("enforce a strict 125-character maximum for quotes") as binding on itself and returned a refusal negotiating which summary to produce instead — a wasted call and, worse, a plausible-looking failure mode where a *partial* or *reworded* skill could have been returned and trusted. The raw curl returned the exact bytes on the first try. The rule costs nothing (curl was already available) and removes an entire class of subtle corruption when the document being read is made of imperatives.
