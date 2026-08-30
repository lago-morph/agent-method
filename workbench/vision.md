---
id: vision
type: vision
title: Idea Workbench vision
links:
  related-to:
    - note-v1-scope-and-prototyping-intent.md
---

*Draft 2026-08-30 by the AI partner, restructured per the vision
template; awaiting Jonathan's markup. Remove this line when the vision
reads as his.*

## Pain points

My ideas are scattered and disorganized. They live in paper notebooks,
on my reMarkable tablet, as voice notes in several different apps, as
lists spread across many git repos, and as GitHub issues spread around
just as widely. Because of that:

- I cannot see my ideas in one place.
- Finding an idea means remembering where I captured it.
- Related ideas captured in different places never get connected.
- Organizing anything means manually copying between surfaces.

## Who experiences the pain

Me — one person who captures ideas continuously, on whatever surface is
at hand, across many concurrent projects.

## How the software alleviates the pain

Idea Workbench gives the ideas a single home and the means to organize
them there:

- One application holds every idea. An idea is a title, a blob of
  text, and optional labels.
- A three-pane screen — labels on the left, idea list in the middle,
  idea text on the right — shows the collection in one place.
- Hierarchical labels (`x.y.z`), filtering, and hierarchical display
  organize ideas without moving or copying them.
- Splitting turns a raw capture containing several thoughts into
  individual ideas.
- Importing text files brings the scattered material in: existing
  lists and notes become ideas without retyping.
- Automatic saving and restored UI state make it a trustworthy home —
  close it, reopen it, and everything is where I left it.

The written use cases ([input/00-use-case-list.md](input/00-use-case-list.md),
detailed in the pages alongside it) define this behavior completely, in
an order that builds each capability on the previous one.

## Who will use it

The same person who experiences the pain: me, and me alone. There are
no other users, no accounts, and no sharing. If friends ever want it,
they fork the repo and run their own copy.

## Alternatives considered

- **Keep the current surfaces** (notebooks, voice notes, repo lists,
  issues) — rejected: the pain grows with every idea captured, and
  none of the surfaces can see the others.
- **Adapt an existing tool such as Obsidian** — rejected: I need only
  a tiny portion of its features, and bending a large tool to my needs
  is a struggle I don't want.
- **Build it custom** — chosen: the functionality is straightforward,
  and building it also serves as the application we use to try out and
  refine agent-method.

## What success looks like

1. Every use case on the written v1 list is implemented and behaves as
   its detail page describes.
2. I can import an existing idea list from one of my git repos as text
   files, split the entries into individual ideas, label them, and
   filter to see just one topic.
3. I can close the browser and reopen the app, and my ideas, labels,
   and UI state (selection, filter, collapsed labels, detail toggle)
   are exactly as I left them, with nothing lost.
4. When a new idea occurs to me while the workbench is available, I put
   it in the workbench instead of starting a new scattered list.

## Non-goals

- Multi-user operation, authentication, sharing, or hosting for
  anyone but me.
- Automated integration with agent-method or any other system; moving
  content in or out of the workbench beyond its own import is a manual
  act.
- Capturing directly from sources — voice, handwriting, URLs, GitHub —
  content enters as plain text (typed, pasted, or imported text files).
- Rich text, formatting, attachments, or links between ideas; an idea's
  body is plain text.
- Being a general note-taking or knowledge-management application.

## Open issues

- What durable storage concretely is (the save use case says memory
  syncs to "durable storage" without naming it). Needs an answer by the
  first prototype that saves.
- What form the app takes to run (a page in a browser tab is implied
  by the use cases; the exact packaging is unresolved).

## Deliberately open issues

- Whether idea-workbench and agent-method ever get linked. Today the
  connection is completely manual, and that is fine; deciding is
  deferred because we don't care right now.
- What, if anything, comes after v1. Deferred until v1 is implemented
  and I have had time to use it, because what I think I want may change
  once I do.
