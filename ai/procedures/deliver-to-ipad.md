# Delivering a single HTML file to an iPad for the checkpoint

**Status:** working document, non-normative. Retrospective.
**Observed in:** implementation 1, after PR #15, when Jonathan asked
for the file in a form Safari could open.

## What was done

Two routes were used together:

1. **The file itself, attached in the working session** with the
   send-file tool, display mode "attach", so it could be saved to the
   Files app and opened from there in Safari with its `.html`
   extension intact.
2. **A hosted copy as a page** on the artifact host, for a quick look
   from a link. The host wraps pages in its own document skeleton, so
   a variant was generated with the `<!DOCTYPE>`, `<html>`, `<head>`,
   and `<body>` tags removed and only `<title>`, `<style>`, the body
   content, and the script kept:

   ```python
   import re
   src = open('workbench/implementations/1/idea-workbench.html').read()
   title = re.search(r'<title>.*?</title>', src, re.S).group(0)
   style = re.search(r'<style>.*?</style>', src, re.S).group(0)
   body  = re.search(r'<body>(.*)</body>', src, re.S).group(1).strip()
   open(out, 'w').write(title + '\n' + style + '\n\n' + body + '\n')
   ```

   The design pass the artifact tooling asks for was deliberately not
   applied: the page is the implementation, and its appearance is
   governed by the spec and reserved for Jonathan's markup.

## What was not done

- No GitHub Pages, release asset, or other durable delivery method.
  Delivery is recorded as an open decision in
  `workbench/note/implementation-record-1.md`.

## Pitfalls observed

- **Downloading the raw file from GitHub on iPadOS appends `.txt`**,
  and the extension cannot be removed on the device, so Safari opens
  it as text. This is what prompted the two routes above.
- The hosted copy is not "opened directly from a file": it exercises
  the UI but not the delivery method the implementation record
  specifies. Say so when handing over the link.
- The host's watch subscription for the page could not be registered
  from this session, so comments left on the page would not have
  reached the session; markup was directed to the PR instead.

## Notes for formalizing

- A delivery guide (foreseen in `workbench/note/decision-guides.md`)
  should list the routes with their properties: keeps the extension,
  is durable, exercises the real opening method, needs no account.
