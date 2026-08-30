# Filter ideas

*Source: PDF page 12, dated 2026-08-16.*

## Example

| Idea | Labels |
|------|--------|
| A | `x` |
| B | `x.y` |
| C | `x.y.z`, `m.n` |
| D | `m` |

| Filter | Ideas shown |
|--------|-------------|
| No filter | A, B, C, D |
| Filter on `m` | C, D |
| Filter on `x.y` | B, C |
| Filter on `x` | A, B, C |

*(Filtering on a label includes ideas tagged with that label or any label
below it in the hierarchy.)*

## Behavior

- On left: view of current labels.
- By default all selected.
- Click on label to select/deselect.
- Label is shown greyed out if deselected.
- Can click on "show all" to select all, "show none" to deselect all.
- Filter is saved/restored as part of UI state.
