# ADR 0006: The UI design lives in the UI use cases; other use cases are UI-neutral

- **Date**: 2026-09-05
- **Status**: Accepted
- **Adopted from**: Jonathan's markup on the Edit ideas use case, his
  clarification of its purpose, and his markup on this ADR
  (2026-09-05 working session, PR #16)

## Context

The first draft of the Edit ideas use case described the screen by
position ("the right pane", "the middle pane"), said what it would not
do yet ("nothing persists; saving is the next use case"), referred to
its place in the build order, spoke of closing "the tab or browser",
and specified that undo was available "from its keyboard shortcut and
an on-screen button". Jonathan's markup: there is too much linkage
between this use case and the UI one; specify elements by function,
not position; decouple UI from functionality; do not refer to the
order of use cases or to what a later use case will add; do not talk
about saving or persistence at all outside the use case that owns it;
say "the application is closed", not the tab or browser. His test: the
use case is valid only if it still holds when the software is
implemented as a terminal UI or as a native windowed application.

His stated objective: keep the overall UI design in one place — the UI
use case — with the more general functional decisions in the other use
cases, so that specifying a new UI, such as a TUI, is a change that is
easily isolated. Some overflow of UI detail into the functional use
cases is fine and makes them easier to review, provided it sits in one
specific section of the use case. That section is filled in only for
the interfaces currently being worked on; no placeholder or
"not applicable" subsections for interfaces nobody is thinking about.

## Decision

Use cases are of two kinds, and the split is the point.

**The UI use cases are the single home of the UI design.** They say
what the screen (or terminal, or window) looks like: which areas
exist, where they sit, how they scroll, what is displayed in each, how
commands are exposed. They are the only use cases allowed to speak in
terms of position and widgets. They name the functional areas — the
idea list area, the idea edit area, the label area — and every other
use case refers to them by those names. All the UI use cases that
target one kind of interface are logically one big use case; for ease
of authoring and review it may be split into several — the main
screen in one, a settings interface in another — and the split is an
organizational choice, not a change of kind. A different kind of
interface gets its own UI use case or cases, mapping the same
functional areas and commands onto its own medium, and nothing else
changes.

**Every other use case is UI-neutral.** Specifically:

- **Name elements by function, never by position or widget.** "The
  idea list area", "the idea edit area", "the New command" — not "the
  middle pane", "the right pane", "the New button".
- **A use case owns its own concern and is silent about the others.**
  It does not say what it will not do, what a later use case adds, or
  where it sits in the build order. Persistence is mentioned only in
  the use case that specifies it.
- **Platform-neutral wording for lifecycle and input.** "The
  application is closed", not the tab or browser; "the platform's
  standard copy, cut, and paste facilities", not shortcuts or menus.
- **The acceptance test:** re-read the use case imagining a terminal
  implementation and a native windowed implementation. Any sentence
  that would be false or meaningless for either is rewritten.
- **Interface detail lives in one section: Interface guidance.** Where
  a functional use case has interface-specific detail to give — a
  command that is a shortcut on one platform, a button on another, a
  menu item on a third; what "closed" means; how the insertion point
  is kept visible — the behavior section stays generic, and the detail
  goes in a separate **Interface guidance** section, with one
  subsection per interface, each named for the UI use case it serves.
  That section is guidance for implementers, not behavior, and is not
  part of the acceptance criteria. It contains subsections only for
  the interfaces currently specified: no placeholders, no "not
  applicable" entries for interfaces nobody is working on.
- **Adding a kind of interface is a two-step task.** Write its UI use
  case or cases; then review the Interface guidance section of every
  other use case and add a subsection for it where that use case has
  something interface-specific to say. Kinds of interface named in this ADR
  (browser, native windowed, terminal, command line) are illustrations
  for ADR and schema guidance, not a list use cases must cover.
- **Links carry the dependency.** A use case that builds on another
  says so through its `depends-on` link and at most one sentence
  naming what it builds on; the rest of the text stands alone.

This decision binds every use case written from now on and is to be
carried into the use-case type's schema and agent-facing guidance in
`method/types/` when those are written, so it is applied without being
rediscovered. The type guidance should distinguish UI use cases
from functional use cases explicitly.

## Alternatives considered

- **Let every use case describe the concrete screen** — rejected: it
  welds the specification to one implementation, so a second
  implementation with a different interface cannot be checked against
  the same use cases, and UI decisions get made in prose nobody marks
  up as UI.
- **Strip platform detail entirely, with no home for it** — rejected:
  implementers then invent how a command is exposed, and the same
  question is answered differently in every implementation.
- **Every interface pre-listed in every use case, with "not
  applicable" where it does not fit** — rejected: it fills use cases
  with sections about interfaces nobody is thinking about, and the
  empty entries get no review.

## Consequences

- Functional use cases become the stable centre that many
  implementations, with different interfaces, are checked against.
- The UI use cases are where UI decisions are made and marked up, and
  they are expected to grow: as functional use cases introduce areas
  and commands, the UI use cases say where and how they appear, and
  they are split when one grows unwieldy.
- A new kind of interface costs its own UI use case or cases plus one
  bounded sweep: the Interface guidance sections of the other use
  cases, each gaining at most one subsection. Nothing in the behavior
  sections changes.
- The Initial UI use case (`../../workbench/use-case-initial-ui.md`)
  is, so far, the only UI use case for the current three-pane design;
  its positional language is correct there.

## References

- `../../workbench/use-case-edit-ideas.md` — the worked example of a
  UI-neutral functional use case with an Interface guidance section
  holding the one interface currently specified.
- `../../workbench/use-case-initial-ui.md` — the UI use case for the
  three-pane design.
- `0005-specify-corner-cases-in-use-cases.md` — the previous rule
  about what a use case must contain; this one is about where UI
  belongs and how functional use cases may not be phrased.
