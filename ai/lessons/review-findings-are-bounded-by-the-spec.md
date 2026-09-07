# A review finding is a defect only if the spec says so

A reviewer's finding counts as a defect only when a use-case sentence
is violated. A finding with no sentence behind it is not fixed in the
implementation; it is reported to Jonathan as a possible use-case
markup, and the implementation stays as the run produced it. Fixing
behavior the spec does not specify is itself a defect, and is logged
as one.

Grounding (2026-09-07): implementation 4's review reported that a wide
word containing an emoji was split between the emoji's two code units,
and the AI partner "fixed" it by splitting on grapheme clusters.
Jonathan: "Emojis are out of scope for idea text. We can limit to
utf-8. Take out logic about grapheme clusters - the spec explicitly
says not to do that, and making that fix should be logged as a
defect... I explicitly said there should only be rules on length for
splitting." The fix was reverted and logged in the procedure.
