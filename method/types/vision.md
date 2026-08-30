# Artifact type: project vision

*Drafted 2026-08-30 from Jonathan's direction; awaiting his markup.*

## Intent of the type

The project vision is the root artifact of an application. It records
why the project exists and what it must achieve — in terms a reader
(human or agent) can verify — without prescribing design, process, or
implementation. Every other artifact ultimately hangs off it: use cases
elaborate how the pain gets alleviated, components and interfaces
realize the use cases.

## Guidance for constructing a vision

- **A vision is a synthesis, not a transcript.** The owner's statements
  of intent are raw material. Restating them under headings does not
  make a vision; the vision must connect pain → relief → verifiable
  success in its own right.
- **No process rules.** How the project is run — scope discipline,
  review gates, working agreements — belongs in method or working
  documents, never in the vision of a piece of software. The
  vision-shaped way to bound a project is the non-goals section: state
  what the software will not do, as facts about the product.
- **Self-contained; no negative pointers.** Never reference material
  only to say it should not be used — telling a reader "don't look
  there" invites exactly that and can poison an agent's session
  context. If material shouldn't inform the document, simply leave it
  unreferenced.
- **Pain and usage may belong to different people.** Identify who
  experiences the pain and who will operate the software separately;
  they may be different people or roles.
- **Success is explicit, objective, and testable.** List the success
  criteria such that anyone can check each one and get the same answer.
- **Checkpoints keep the project honest.** Projects are dynamic; change
  is expected and welcome. Define checkpoints where progress is
  assessed against the success criteria, and grant explicit permission
  to modify or halt the project when criteria aren't being met. It is
  better to change or abandon a project that isn't meeting its goals
  than to slavishly follow plans to the end while the surrounding
  context changes.
- **Organize open issues by when they must be resolved.** Each open
  issue is stated with its resolution dependency — the point in the
  project by which it needs an answer. An intentionally open issue is
  simply one with no required resolution dependency; record why it can
  stay open indefinitely.
- **The owner's voice.** The vision is drafted for the owner and marked
  up until it reads as theirs; it is not ratified until it does.

## Template

```markdown
---
id: vision
type: vision
title: <project name> vision
links:
  ...
---

## Pain points

What hurts today, concretely. The situations that prompted the project.

## Who experiences the pain

The person or role living with the pain points.

## How the software alleviates the pain

What the software does about each pain point — capability-level, not
design-level.

## Who will use it

The person or role operating the software. May differ from who
experiences the pain; say so when it does.

## Alternatives considered

Each alternative that was seriously considered, and why it was
rejected. Include "do nothing" when it was a real option.

## What success looks like

An explicit list of objective, testable criteria. Success is when every
item on this list can be checked off.

## Checkpoints

When progress is assessed against the success criteria, and the
explicit permission to modify or halt the project if criteria aren't
being met. Change is expected and welcome; this section exists so
nobody follows the plan off a cliff.

## Non-goals

What the software will not do. States the boundary of the project as
facts about the product.

## Open issues

Questions that don't have answers yet, organized by when each must be
resolved (its resolution dependency). An issue with no required
resolution dependency is intentionally open — say why it can stay that
way.
```
