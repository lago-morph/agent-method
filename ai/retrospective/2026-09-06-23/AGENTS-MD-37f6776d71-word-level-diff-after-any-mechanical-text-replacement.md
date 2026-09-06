# agent instruction

**Word-level diff after any mechanical text replacement.** After a scripted find-and-replace across documents (renames, path moves, id changes), run `git diff --word-diff` and read every changed word before committing. Restrict bare-word replacements to prefixed or delimited forms; a bare identifier that is also an English word will match prose.

*Grounded in: the bare id 'vision' became 'vision/vision' inside three sentences during the per-type folder move.*

# justification

Moving forty artifacts into one folder per type required rewriting every link from `note-x.md` to `note/x.md`, done with a scripted regular expression over all markdown files. The bare id `vision` was also rewritten, so the English word "vision" in the plan, in the vision type definition, and in ADR 0002 became `vision/vision` mid-sentence, and the path `method/types/vision.md` was mangled too. A word-level diff caught it before the commit; without that read, three documents would have shipped with corrupted prose and one broken path.

The check is one `git diff --word-diff` and a few minutes of reading. The alternative is corruption that survives review, because a reviewer skimming a forty-file rename does not read every sentence.
