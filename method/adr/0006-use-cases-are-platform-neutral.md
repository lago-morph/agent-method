# ADR 0006: The UI design lives in the UI use case; other use cases are UI-neutral

- **Date**: 2026-09-05
- **Status**: Accepted
- **Adopted from**: Jonathan's markup on the Edit ideas use case and
  his clarification of its purpose (2026-09-05 working session,
  PR #16)

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
easily isolated.

## Decision

Use cases are of two kinds, and the split is the point.

**The UI use case is the single home of the UI design.** It says what
the screen (or terminal, or window) looks like: which areas exist,
where they sit, how they scroll, what is displayed in each, how
commands are exposed. It is the one use case allowed to speak in terms
of position and widgets. It names the functional areas — the idea list
area, the idea edit area, the label area — and every other use case
refers to them by those names. A different kind of interface is
specified as another UI use case that maps the same functional areas
and commands onto its own medium, and nothing else changes.

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
- **Where a functional use case cannot avoid platform detail** — a
  command that will be a shortcut on one platform, a button on another,
  and a menu item on a third — the behavior section stays generic, and
  the platform detail goes in a separate **Implementation guidance**
  section with one subsection per kind of interface (browser, terminal,
  native windowed, command line where applicable). That section is
  guidance for implementers, not behavior, and is not part of the
  acceptance criteria. It is the fallback, not the norm: whatever can
  be said once in the UI use case is said there instead.
- **Links carry the dependency.** A use case that builds on another
  says so through its `depends-on` link and at most one sentence
  naming what it builds on; the rest of the text stands alone.

This decision binds every use case written from now on and is to be
carried into the use-case type's schema and agent-facing guidance in
`method/types/` when those are written, so it is applied without being
rediscovered. The type guidance should distinguish the UI use case
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
- **Per-platform guidance in every functional use case** — kept only
  as the fallback: it spreads the UI across every use case, which is
  exactly what makes a new UI hard to isolate.

## Consequences

- Functional use cases become the stable centre that many
  implementations, with different interfaces, are checked against.
- The UI use case is where UI decisions are made and marked up, and
  it is expected to grow: as functional use cases introduce areas and
  commands, the UI use case says where and how they appear. A new kind
  of interface is a new UI use case, not a sweep through the others.
- The Initial UI use case (`../../workbench/use-case-initial-ui.md`)
  is the UI use case for the current three-pane design; its positional
  language is correct there.

## References

- `../../workbench/use-case-edit-ideas.md` — the worked example of a
  UI-neutral functional use case, with an Implementation guidance
  section as the fallback pattern.
- `../../workbench/use-case-initial-ui.md` — the UI use case.
- `0005-specify-corner-cases-in-use-cases.md` — the previous rule
  about what a use case must contain; this one is about where UI
  belongs and how functional use cases may not be phrased.
