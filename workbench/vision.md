---
id: vision
type: vision
title: Idea Workbench vision
links:
  related-to:
    - note-v1-scope-and-prototyping-intent.md
---

*Draft 2026-08-30 by the AI partner, awaiting Jonathan's markup. Remove
this line when the vision reads as his.*

## The problem

My ideas are scattered and disorganized: paper notebooks, my reMarkable
tablet, voice notes in several different apps, lists spread across many
git repos, and GitHub issues spread around just as widely. I can't see
them in one place, and I can't work with them.

## What Idea Workbench v1 is

A tool to organize those ideas. An idea is a title, a blob of text, and
optional labels — nothing more. Labels are hierarchical
(dot-separated, `x.y.z`), and they drive how ideas are filtered and
displayed. The written use cases in [input/00-use-case-list.md](input/00-use-case-list.md)
(detailed in the pages alongside it) define v1 completely, and they are
intentionally ordered to build on each other.

## Scope discipline

Anything beyond the written use cases is scope creep, and scope creep
kills my projects. The bigger brainstormed ambition for the workbench
exists, but it lives only in the read-only input material
([input/high-level-scope.md](input/high-level-scope.md)); it appears in
no normative artifact. Nothing gets added until v1 is implemented and I
have had time to play with it.

## Who it is for

Me, and me alone. Maybe I share it with some friends someday and they
fork the repo — but this is a tool I will use, and I am the only one
who needs to be happy with it.

## Why custom-built

The v1 functionality is straightforward. Adapting something like
Obsidian to my needs is a struggle I don't want when I only need a tiny
portion of its features. And Idea Workbench has a second job: it is the
application we use to try out and refine agent-method — nothing more.
The connection between the two is completely manual for now; maybe it
gets linked someday, maybe it doesn't, and we don't care right now.

## How we get there

Through progressively more capable prototypes, following the use-case
order. What I think I want when writing use cases may morph and change
as I use the prototypes, so trying them out as we go is part of the
method, not an afterthought.
