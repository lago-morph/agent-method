# Hierarchical display — ideas

*Source: PDF page 13, dated 2026-08-16.*

- Middle pane list — in order of tags alphabetically, by hierarchy; then
  within the same tag, alphabetically by idea content.
- Indent idea display based on depth of tag: `x` = no indent, `x.y` = 1
  indent, etc.
- Anything displayed has all previous headers. If filtering does not show
  more general items, headers are greyed out.

  E.g., if showing tag `x.y.z`, would display:

  ```
  # x        (grey)
    # y      (grey)
      # z    (not grey)
        item 1   (tag x.y.z)
        item 2   (tag x.y.z)
  ```

- If showing items from the filtering example
  ([07-filter-ideas.md](07-filter-ideas.md)), would look like:

  ```
  # m
    D        (m)
  ## n
      C      (m.n)

  # x
    A        (x)
  ## y
      B      (x.y)
  ### z
        C    (x.y.z)
  ```
