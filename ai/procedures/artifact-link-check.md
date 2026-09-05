# Artifact link reciprocity check

**Status:** working document, non-normative. Retrospective.
**Observed in:** PR #16, run four times as `workbench/` grew from 12 to
19 artifacts (flat layout), each time immediately before committing changes to front
matter; implementation 2's regeneration run (the fresh agent ran it and
separately hand-checked the omissions listed below); the review of that
run, where the omissions were folded into the script (second version
below) and run over 26 artifacts.

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

### Second version (implementation 2 review): front matter and body links too

Folds in the omissions of the first version. Same invocation pattern.

```python
import re, os, glob, sys
recip = {'is-part-of': 'includes', 'includes': 'is-part-of',
         'depends-on': 'depended-on-by', 'depended-on-by': 'depends-on',
         'related-to': 'related-to'}
links = {}; probs = []
for p in sorted(glob.glob('workbench/*.md')):
    s = open(p).read(); m = re.match(r'---\n(.*?)\n---\n', s, re.S)
    if not m: continue
    fm = m.group(1); name = os.path.basename(p)
    keys = [l.split(':')[0] for l in fm.split('\n') if l and not l.startswith(' ')]
    if keys != ['id', 'type', 'title', 'links']: probs.append(f'{name}: keys {keys}')
    if re.search(r'^id: (.*)$', fm, re.M).group(1).strip() != name[:-3]: probs.append(f'{name}: id')
    if re.search(r'^type: (.*)$', fm, re.M).group(1).strip() not in ('vision','use-case','component','interface','note'): probs.append(f'{name}: type')
    if '[]' in fm: probs.append(f'{name}: empty [] list')
    d = {}; cur = None
    for line in fm.split('\n'):
        mm = re.match(r'  (\S+):', line)
        if mm: cur = mm.group(1); d[cur] = []; continue
        mm = re.match(r'    - (\S+)', line)
        if mm and cur: d[cur].append(mm.group(1))
    links[name] = d
    for t in re.findall(r'\]\(([^)#]+\.md)\)', s):
        if not os.path.exists(os.path.join('workbench', t)): probs.append(f'{name}: body link {t} missing')
for a, d in links.items():
    for t, ts in d.items():
        for b in ts:
            if b not in links or a not in links[b].get(recip[t], []): probs.append(f'{a}:{t}->{b}')
print('artifacts', len(links), 'problems:', probs or 'none'); sys.exit(1 if probs else 0)
```

### Third version (per-type folders, PR #18)

When artifacts moved into `workbench/<type>/` (2026-09-05), the glob,
the id rule, and link resolution changed. The validator now used:

```python
import re, os, glob, sys
W = 'workbench'; TYPES = ('vision', 'use-case', 'component', 'interface', 'note')
recip = {'is-part-of': 'includes', 'includes': 'is-part-of',
         'depends-on': 'depended-on-by', 'depended-on-by': 'depends-on',
         'related-to': 'related-to'}
links = {}; probs = []
for p in sorted(glob.glob(f'{W}/*/*.md')):
    folder = p.split('/')[1]
    if folder not in TYPES: continue                       # input/, implementations/, adr/
    s = open(p).read(); m = re.match(r'---\n(.*?)\n---\n', s, re.S)
    if not m: probs.append(f'{p}: no front matter'); continue
    fm = m.group(1); key = p[len(W)+1:]                    # 'type/id.md'
    keys = [l.split(':')[0] for l in fm.split('\n') if l and not l.startswith(' ')]
    if keys != ['id', 'type', 'title', 'links']: probs.append(f'{key}: keys {keys}')
    if re.search(r'^id: (.*)$', fm, re.M).group(1).strip() != os.path.basename(p)[:-3]: probs.append(f'{key}: id')
    if re.search(r'^type: (.*)$', fm, re.M).group(1).strip() != folder: probs.append(f'{key}: type != folder')
    if '[]' in fm: probs.append(f'{key}: empty [] list')
    d = {}; cur = None
    for line in fm.split('\n'):
        mm = re.match(r'  (\S+):', line)
        if mm: cur = mm.group(1); d[cur] = []; continue
        mm = re.match(r'    - (\S+)', line)
        if mm and cur: d[cur].append(mm.group(1))
    links[key] = d
    for t in re.findall(r'\]\(([^)#]+\.md)\)', s):          # body links resolve from the file's folder
        if not os.path.exists(os.path.normpath(os.path.join(os.path.dirname(p), t))): probs.append(f'{key}: body link {t} missing')
for a, d in links.items():
    for t, ts in d.items():
        for b in ts:
            if b not in links or a not in links[b].get(recip[t], []): probs.append(f'{a}:{t}->{b}')
print('artifacts', len(links), 'problems:', probs or 'none'); sys.exit(1 if probs else 0)
```

## What was not done

- No version is committed as tooling; each is retyped (pasted) when
  needed. The third version is the one to promote.

## Pitfalls observed

- Adding a link to a ratified note (the record definition, the
  standards note) to keep reciprocity means touching ratified files in
  a PR about something else. The convention requires it; the PR body
  should say so.
- When a reciprocal was added by string replacement on an anchor line
  such as `    - note/implementation-record-1.md\n`, the replacement
  had to be limited to the first occurrence; otherwise a file linking
  to the record twice (under two link types) gets the new link twice.

## Notes for formalizing

- This is the obvious first linter for `method/`: the checks above plus
  the four omissions listed, run over `workbench/` on every PR.
- It should live in the repository under `method/` (tooling), not be
  retyped; `CONVENTIONS.md` already names a linter as the escape hatch
  once drift shows up.
