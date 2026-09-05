# ADR 0006: Use cases are platform-neutral — function, not position

- **Date**: 2026-09-05
- **Status**: Accepted
- **Adopted from**: Jonathan's markup on the Edit ideas use case
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

## Decision

A use case describes behavior in terms that hold for any kind of user
interface. Specifically:

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
- **Where platform detail is unavoidable** — a command that will be a
  shortcut on one platform, a button on another, and a menu item on a
  third — the behavior section stays generic, and the use case carries
  a separate **Implementation guidance** section with one subsection
  per kind of interface (browser, terminal, native windowed, command
  line where applicable), stating how each is expected to expose the
  behavior. That section is guidance for implementers, not behavior,
  and is not part of the acceptance criteria.
- **Links carry the dependency.** A use case that builds on another
  says so through its `depends-on` link and at most one sentence
  naming what it builds on; the rest of the text stands alone.

This decision binds every use case written from now on and is to be
carried into the use-case type's schema and agent-facing guidance in
`method/types/` when those are written, so it is applied without being
rediscovered.

## Alternatives considered

- **Let use cases describe the concrete screen** — rejected: it welds
  the specification to one implementation, so a second implementation
  with a different interface cannot be checked against the same use
  cases, and UI decisions get made in prose nobody marks up as UI.
- **Strip platform detail entirely, with no guidance section** —
  rejected: implementers then invent how a command is exposed, and
  the same question is answered differently in every implementation.

## Consequences

- Use cases become the stable centre that many implementations are
  checked against; UI decisions move to implementation records and
  UI standards, where they are made deliberately.
- Use cases gain an implementation-guidance section when they need
  one; it grows a subsection whenever a new kind of interface is
  first implemented.
- The Initial UI use case (`../../workbench/use-case-initial-ui.md`)
  predates this decision and names its areas by position ("left
  pane", "middle pane", "right pane"). It is ratified and is not
  changed by this ADR; bringing it into line is a use-case round for
  Jonathan to call.

## References

- `../../workbench/use-case-edit-ideas.md` — the worked example: its
  behavior sections are position-free and its Implementation guidance
  section shows the per-interface pattern.
- `0005-specify-corner-cases-in-use-cases.md` — the previous rule
  about what a use case must contain; this one is about how it may
  not be phrased.
