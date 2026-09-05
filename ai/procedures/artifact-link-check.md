# Artifact link reciprocity check

**Status:** working document, non-normative. Retrospective.
**Observed in:** PR #16, run four times as `workbench/` grew from 12 to
19 artifacts, each time immediately before committing changes to front
matter.

## What was done

`method/CONVENTIONS.md` requires every link to appear in both files it
connects, with the reciprocal name. A throwaway Python script parsed
every `workbench/*.md` front matter and reported any link whose
reciprocal was missing or whose target did not exist. It was run
inline from the shell, exiting non-zero on problems so the commit
command chained after it would not run:

```python
import re, os, glob, sys
recip = {'is-part-of': 'includes', 'includes': 'is-part-of',
         'depends-on': 'depended-on-by', 'depended-on-by': 'depends-on',
         'related-to': 'related-to'}
links = {}
for p in sorted(glob.glob('workbench/*.md')):
    s = open(p).read()
    m = re.match(r'---\n(.*?)\n---', s, re.S)
    if not m:
        continue                       # README and other non-artifacts
    d = {}; cur = None
    for line in m.group(1).split('\n'):
        mm = re.match(r'  (\S+):', line)
        if mm:
            cur = mm.group(1); d[cur] = []; continue
        mm = re.match(r'    - (\S+)', line)
        if mm and cur:
            d[cur].append(mm.group(1))
    links[os.path.basename(p)] = d
problems = [f'{a}: {t} -> {b}'
            for a, d in links.items() for t, ts in d.items() for b in ts
            if b not in links or a not in links[b].get(recip[t], [])]
print('artifacts', len(links), 'link problems:', problems or 'none')
sys.exit(1 if problems else 0)
```

Invocation pattern: `python3 - <<'EOF' … EOF && git add -A && git commit …`.

The parser is deliberately naive: it reads the `links:` block by
indentation (two spaces for the link type, four for entries) and
ignores the `id`, `type`, and `title` keys. It relies on the front
matter being exactly as `CONVENTIONS.md` prescribes.

## What was not done

- It does not check that `id` matches the filename, that `type` is one
  of the five allowed values, that only the four keys are present, or
  that empty lists are omitted rather than written as `[]`.
- It does not check links inside the markdown body, only front matter.
- It was never committed; it was retyped (pasted) each time.

## Pitfalls observed

- Adding a link to a ratified note (the record definition, the
  standards note) to keep reciprocity means touching ratified files in
  a PR about something else. The convention requires it; the PR body
  should say so.
- When a reciprocal was added by string replacement on an anchor line
  such as `    - note-implementation-record-1.md\n`, the replacement
  had to be limited to the first occurrence; otherwise a file linking
  to the record twice (under two link types) gets the new link twice.

## Notes for formalizing

- This is the obvious first linter for `method/`: the checks above plus
  the four omissions listed, run over `workbench/` on every PR.
- It should live in the repository under `method/` (tooling), not be
  retyped; `CONVENTIONS.md` already names a linter as the escape hatch
  once drift shows up.
