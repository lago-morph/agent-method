---
id: use-case-edit-ideas
type: use-case
title: Edit ideas
links:
  is-part-of:
    - vision.md
  depends-on:
    - use-case-initial-ui.md
  depended-on-by:
    - note-implementation-record-2.md
---

Derived from [input/02-edit-ideas.md](input/02-edit-ideas.md) ("Edit
ideas" on the master list). Adds editing to the idea list area and the
idea text area that the Initial UI use case establishes; that area is
called the idea edit area here.

## Goal

Put ideas in and change them: enter a new idea, edit an existing one,
and have the list reflect what I typed as I type it.

## Behavior

### Editing the selected idea (idea edit area)

- The idea edit area is a plain-text editor for the selected idea. The
  text shown is the idea's content; typing changes it directly. There
  is no separate edit mode.
- Copy, cut, and paste use the platform's standard text-editing
  facilities; the application adds no facilities of its own for them.
- When no idea is selected, the idea edit area is blank and not
  editable. The only way to start a new idea is the New command.
- The editor keeps the insertion point visible: when the text is larger
  than the area, the area scrolls so that the point where I am typing
  stays in view.
- The selected idea is the **active** idea. It stays active until
  another idea is selected or the New command is issued.

### New ideas

- A New command creates an idea with no content, selects it in the idea
  list area, and puts the insertion point in the idea edit area, at the
  beginning of the (empty) text, ready for typing.
- Until it has content, the new idea appears in the idea list area as
  the "(empty)" placeholder at the top of the list, selected. It is the
  only blank idea that can exist (see "Blank ideas"), so "the top of the
  list" is unambiguous.

### The list follows the text (idea list area)

- The idea list area is **updated** at the moments the UI use case
  specifies (the Initial UI use case: after every change to the
  selected idea's text). An update does four things, in this order:
  strips leading whitespace from every idea (see "Leading whitespace"),
  deletes every blank idea that is not active (see "Blank ideas"),
  re-sorts the list, and keeps the selected idea selected and visible,
  scrolling if needed.
- The selected idea's entry therefore always shows the current first
  line of its text, truncated as the Initial UI use case describes, and
  the idea moves to its new alphabetical position as its first line
  changes.
- While the active idea's content is blank, its entry shows the
  "(empty)" placeholder at the top of the list; as soon as it has
  visible content, it shows its first line and takes its alphabetical
  place.
- Because leading whitespace is stripped, an idea's first line always
  has visible content unless the idea is blank. There is no "blank
  first line with content below" case.

### Leading whitespace

- Whitespace at the beginning of an idea's text — spaces, tabs,
  newlines, and anything else the platform classes as whitespace — is
  not part of the idea. It is stripped from every idea at every update
  of the idea list.
- When an update that was caused by my editing the active idea strips
  whitespace from it, a message tells me that leading whitespace was
  removed (the Initial UI use case says how messages are shown).
  Stripping that happens for any other reason — content that was loaded
  with leading whitespace — is silent.
- Stripped whitespace is gone: undo never brings it back, and the
  insertion point moves left by the amount removed (never before the
  start).

### Blank ideas

- An idea is **blank** when, after stripping, its text is empty.
- A blank idea exists only while it is active. At every update of the
  idea list, every blank idea other than the active one is deleted; when
  the active idea stops being active — because another idea is selected
  or the New command is issued — and it is blank, it is deleted. This
  holds even if the idea has labels, once labels exist (a separate use
  case).
- Issuing New while the active idea is blank therefore deletes it and
  creates a fresh blank idea: repeating New never piles up blank ideas.
- Selecting the already-selected idea again is not leaving it: nothing
  is deleted and nothing else changes.
- Deleting happens only when the idea is not active. An idea that is
  momentarily blank while I am editing it — after selecting all and
  cutting, before pasting — is not deleted, and its undo history is
  intact.
- Loaded content that is blank after stripping is deleted at the update
  that follows loading; it never appears in the list.

### Undo and redo

- An Undo command reverts the most recent change to the active idea's
  text; a Redo command re-applies the most recently undone one.
- **One change is** one of: a run of characters typed one after another
  at the insertion point, consisting of any whitespace followed by any
  non-whitespace — leading whitespace goes with the text that follows
  it, and a sequence of whitespace is treated as one unit; a run of
  consecutive deletions at one place that removes characters of one
  **unit** of the text, a unit being a sequence of non-whitespace
  characters together with the whitespace immediately before it; or a
  single paste, cut, or replacement. "Detailed behavior" below makes
  this exact.
- The undo history is long: it covers every change made since the idea
  was selected, however many, back to the text as it was at selection.
  Undoing at that point does nothing further; redoing when nothing has
  been undone does nothing.
- Making a new change after undoing discards what could have been
  redone, as text editors normally do.
- Undo and redo apply only to the text of the active idea. They never
  create, delete, or change any other idea.
- The undo history is cleared when another idea is selected, when the
  New command is issued, and when the application is closed. Selecting
  an idea always starts with an empty history, so nothing done to a
  previous idea can be undone from a later one.

## Detailed behavior: leading whitespace, blank ideas, undo grouping

The three rules above interact, and an implementation must get the
same answer in every case. This section makes the behavior explicit
and repeatable between implementations: first the edge cases with
their outcomes, then the algorithm. (Captured in the use case for now.
When the method is extracted, material of this kind may move to its
own artifact — a detailed design, or similar. That decision waits until
there are more examples to generalize from.)

Notation: `·` is a space, `⏎` a newline, `⇥` a tab. "Update" means an
update of the idea list; for the Initial UI use case's interface that
is after every change to the active idea's text. The **units** of a
text are found by splitting it so that each unit is a maximal sequence
of whitespace followed by a maximal sequence of non-whitespace;
whitespace at the very end of the text is a unit of its own. So
`hello·world··` has the units `hello`, `·world`, `··`. Typing builds
one unit per change; deleting removes one unit per change.

### Edge cases

| # | Situation | Outcome |
| --- | --- | --- |
| 1 | Loaded content `··⏎⇥·` (whitespace only), not active | At the update after loading: stripped to nothing, blank, not active → deleted. Never appears. No message. |
| 2 | Loaded content empty | Same as 1. |
| 3 | Loaded content `··hello` | Stripped to `hello` at the update after loading. No message. |
| 4 | Active idea empty; I type `·` | The update strips it; text stays empty; message "leading whitespace removed"; entry stays "(empty)"; idea stays (active). No undo entry, because the change left the text unchanged. |
| 5 | Active idea empty; I type `··hello` | The spaces are stripped as they arrive (message); `hello` remains. One undo entry: undo gives empty text. The stripped spaces are not in the history. |
| 6 | Same as 5 in a UI that updates the list only when the idea is left | The spaces stay visible while I type; at the update on leaving they are stripped and the message appears. The history is cleared by leaving. |
| 7 | Text `hello`, insertion point at the start; I type `·` | Stripped; message; text unchanged; insertion point stays at the start; no undo entry. |
| 8 | Text `hello`, insertion point at the start; I type `⏎` | Same as 7: a newline at the start is leading whitespace. This is why no idea has a blank first line. |
| 9 | I type `hello·world` into an empty idea | Runs: `hello`, then `·world` (the space starts a new run and goes with `world`). Undo → `hello`; undo → empty. |
| 10 | I type `hello···world` | Same as 9: `···world` is one run; three undoable states: empty, `hello`, `hello···world`. |
| 11 | I type `a⏎⏎b` | Runs `a` and `⏎⏎b`. Undo → `a`. |
| 12 | I type `hello···` then move the insertion point elsewhere | The whitespace-only run closes as its own change: undo → `hello`. |
| 13 | I type `hello···` then select another idea | The idea is left with `hello···` (trailing whitespace is kept; only leading whitespace is stripped). The history is cleared. |
| 14 | Text `hello`; I paste `·x` at the start | Text `·xhello` → update strips → `xhello`; message; one undo entry; undo → `hello`. |
| 15 | I paste anywhere else | One undo entry for the paste, whatever it contains. |
| 16 | Text `hello·world`, insertion point at the end; I press Backspace five times | Removes `world`: one entry. A sixth Backspace removes the space before it: the same entry (the unit's leading whitespace). A seventh removes `o` of `hello`: a new entry. Backspace, type, Backspace: three entries. |
| 16a | Text `hello·world`, insertion point after `hello`; I press Delete (forward) six times | Removes `·world`, one unit, one entry. |
| 16b | Text `hello···`, insertion point at the end; I press Backspace three times, then twice more | The three spaces are a unit of their own at the end: one entry. The next two, removing `lo`, start a new entry. |
| 16c | I delete a selection that spans several units | One entry, like a paste (a selection is removed in one act). |
| 17 | I select all the text and delete it | One entry. The idea is blank and active: entry shows "(empty)", idea stays. Undo restores the text. Selecting another idea while it is blank deletes it. |
| 18 | I delete the first word of `hello·world`, leaving `·world` | The deletion is one entry; the update strips the space → `world`; message (the stripping was caused by my edit). Undo → `hello·world`. |
| 19 | The platform replaces text (autocorrect, a replacement suggestion) | One entry, like a paste. If the replacement puts whitespace at the start, it is stripped with a message. |
| 20 | I type in the middle of a run, then move the insertion point back and type again | Moving the insertion point closes the run; the next character starts a new run. |
| 21 | New while the active idea is blank | The blank idea is deleted (no longer active), the new idea is created, selected, and active: one "(empty)" row. |
| 22 | Load test data while the active idea is blank | Loading is not leaving; the active blank idea survives the update. Blank loaded ideas are deleted by it (1, 2). |
| 23 | Undo after 14 | Gives `hello`, never `·xhello`: stripped whitespace is not restored. |
| 24 | I type `·` at the start repeatedly | Each update strips and shows the message; the message area shows one message (a new message replaces the last). |

### Algorithm

State per active idea, reset when an idea is selected and when New is
issued:

```
history  : list of snapshots { text, insertionPoint }; history[0] is the
           text at selection
index    : position in history of the current text
run      : none, or { kind: 'type' | 'delete', phase: 'ws' | 'text',
           entry: the history entry this run is extending }

snapshot()      = { text of the active idea, its insertion point }
openRun(kind, phase):
    drop history entries above index          -- a new change discards redo
    push snapshot(); index += 1
    run = { kind, phase, entry: history[index] }
closeRun():
    if run is not none:
        if run.entry.text == history[index - 1].text:   -- change left text unchanged (e.g. only stripped whitespace)
            remove history[index]; index -= 1
        run = none
```

On a user edit of the active idea:

```
on typed character c at the insertion point:
    if run is none or run.kind != 'type' or c is not adjacent to the run's end:
        closeRun(); openRun('type', 'ws' if c is whitespace else 'text')
    else if c is whitespace and run.phase == 'text':
        closeRun(); openRun('type', 'ws')        -- whitespace after text starts the next run
    else if c is not whitespace:
        run.phase = 'text'                        -- whitespace, then text: same run
    apply c; run.entry = snapshot()
    listUpdate(causedByEdit = true)

on deletion of one character (Backspace or Delete):
    if run is none or run.kind != 'delete' or not adjacent to the run's end
       or the character being removed is not in the same unit as the
       characters the run has removed (units taken from the text as it
       was when the run opened):
        closeRun(); openRun('delete', 'text')
    apply; run.entry = snapshot()
    listUpdate(causedByEdit = true)

on deletion of a selection:
    closeRun(); openRun('delete', 'text'); apply; run.entry = snapshot(); closeRun()
    listUpdate(causedByEdit = true)

on paste, cut, or platform replacement:
    closeRun(); openRun('type', 'text'); apply; run.entry = snapshot(); closeRun()
    listUpdate(causedByEdit = true)

on the insertion point being moved by me, on undo, on redo:
    closeRun()

on another idea being selected, or New:
    closeRun(); leave the active idea (delete it if blank)
    history = [snapshot()]; index = 0; run = none
```

The list update:

```
listUpdate(causedByEdit):
    for each idea i:
        removed = length of the leading whitespace of i.text
        if removed > 0:
            i.text = i.text without that prefix
            if i is the active idea:
                insertionPoint = max(0, insertionPoint - removed)
                if causedByEdit: show message "Leading whitespace was removed."
                if run is not none: run.entry = snapshot()
                else: history[index] = snapshot()
        if i.text == "" and i is not the active idea:
            delete i
    sort the list; keep the selection; scroll the selected entry into view
```

Undo and redo:

```
undo: closeRun(); if index > 0: index -= 1; restore history[index]; listUpdate(false)
redo: closeRun(); if index < last: index += 1; restore history[index]; listUpdate(false)
```

"Adjacent to the run's end" means the insertion point is exactly where
the run's last character left it. "Whitespace" is what the platform's
text facilities class as whitespace. `listUpdate(false)` after undo and
redo strips nothing in practice, because no snapshot ever holds leading
whitespace.

## Interface guidance

The behavior above holds for any kind of user interface. This section
says how the interfaces currently specified are expected to expose it;
it is guidance for implementers, not behavior. A subsection is added
here whenever a new kind of interface is specified.

### Browser, touch or pointer (the Initial UI use case)

- New, Undo, and Redo are on-screen buttons, and also respond to the
  platform's standard keyboard shortcuts when a keyboard is present.
  New gives the edit area focus with the insertion point at the start.
- Copy, cut, and paste are the platform's shortcuts and, on touch, its
  text-selection menu.
- The idea list is updated after every change to the edit area's text,
  as the Initial UI use case specifies; so leading whitespace is
  stripped as it is typed, and the "leading whitespace removed" message
  appears in the message area the Initial UI use case defines.
- When an on-screen keyboard covers part of the screen, keeping the
  insertion point visible means scrolling the idea edit area clear of
  the keyboard.
- "The application is closed" means the page's tab or window is
  closed.

## Test data (scaffolding)

- The test data set that the Initial UI use case defines is reused
  unchanged; the loaded ideas are edited like any other. Its empty and
  whitespace-only items now exercise deletion of blank loaded content
  (edge cases 1 and 2): after a load they are not in the list. Walking
  through the corner cases in order:
  - Load test data: the list has 17 entries; no "(empty)" row.
  - Issue New: an "(empty)" row at the top, selected; type "Aardvark":
    the entry moves to the top of the alphabetical list as the first
    letter appears; add a second line and confirm the entry is
    unchanged.
  - With the insertion point at the start of "Aardvark", type two
    spaces: nothing is inserted and the message says leading whitespace
    was removed; undo does nothing.
  - Type " world" at the end of "Aardvark" and undo once: the whole
    " world" goes (edge case 9).
  - Type " world" again, then press Backspace six times: "world" and
    the space before it go; undo once brings " world" back (edge case
    16).
  - Change the first line of "Zebra crossing near the school" to start
    with "Bus ": it moves up the list, staying selected and visible;
    undo twice ("Bus" then " " were typed as text then whitespace —
    see edge case 12 for why the trailing space is its own change),
    and it moves back.
  - In the very large idea, make a long series of edits, then undo all
    the way back to the original text and redo forward; select another
    idea and confirm undo no longer applies to the large idea.
  - Select all of a short idea's text and delete it: the entry shows
    "(empty)" but the idea remains; undo restores it. Then select all,
    delete, and select another idea: the idea is gone.
  - Issue New three times: still one "(empty)" row.
  - Open the message list: it shows each "leading whitespace removed"
    message with the time it appeared.
