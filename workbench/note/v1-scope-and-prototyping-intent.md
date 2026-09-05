---
id: v1-scope-and-prototyping-intent
type: note
title: V1 scope, prototyping approach, and why custom-built
links:
  related-to:
    - vision/vision.md
---

Captured 2026-08-30 from Jonathan's direction at the start of the vision
round (KICKSTART step 2), and refined by his answers to the clarifying
questions the same day. Transcribed by the AI partner from Jonathan's
own statements; shown to him for markup.

## Scope discipline

- The overall vision for idea-workbench is intentionally much more
  ambitious than the initial v1 use cases. The written v1 use cases are
  known wants ("I know I want what I've put in the initial use cases");
  everything beyond them is brainstorming about what it could be.
- In v1, an idea is a title, a blob of text, and optional labels.
  Anything further than what is written in the use cases is scope creep
  and is not wanted. Scope creep kills Jonathan's projects.
- Scope beyond v1 appears nowhere except the transcribed read-only
  input material (`input/`). The brainstormed vision is used to
  understand intent, not to add scope.
- Do not go further than the initial written use cases until they are
  implemented and Jonathan has had time to play with the result.
- The v1 use cases are intentionally ordered to build on each other.

## Relationship to agent-method

- Agent-method is a way to build specifications in a structured way.
  Idea-workbench is simply an application used to try out and refine
  agent-method — nothing more.
- The link between agent-method and idea-workbench is completely manual
  right now. Maybe it gets linked, maybe it doesn't; we don't care right
  now.

## Why custom-built

- The v1 functionality is straightforward; adapting something like
  Obsidian is not worth the struggle when only a tiny portion of its
  features is needed.
- The tool is for Jonathan and Jonathan alone. Maybe friends fork the
  repo someday, but he is the only one who needs to be happy with it.

## Working style

- Development proceeds through progressively more capable prototypes.
  What Jonathan thinks he wants when writing use cases may morph and
  change as he uses the prototypes, so trying them out along the way is
  part of the method, not an afterthought.

## Caution on inputs

- `input/implementation-notes.md` was early brainstorming; a lot of it
  no longer fits. Do not let it drive anything.
