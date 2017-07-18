---
title: "Lost Offset"
nav: "lost-offset"
code-example: "true"
type: "property-option"
description: "Margin to the left, right, bottom, or top, of an element depending on if the fraction passed is positive or negative. It works for both horizontal and vertical grids but not both at the same time."
rules:
  - rule: "fraction"
    description: "Fraction of the container to be offset."
  - rule: "row | column"
    description: "Direction the grid is going. Should be the opposite of the column or row it's being used on. Defaults to row."
  - rule: "gutter"
    description: "How large the gutter involved is, typically this won't be adjusted, but if you have set the elements for that container to have different gutters than default, you will need to match that gutter here as well."
  - rule: "clear | clear-left | clear-right | clear-top | clear-bottom"
    description: If you are needing to clear an offset, like within a media query, you can do that using the clear parameter. `clear` with clear both left and right margin or top and bottom margin depending on the offset's direction.
---

**Note: the direction of the offset changed in Version 8 to be more natural. [Read More](https://github.com/peterramsing/lost/pull/331)**

{% highlight css %}
.two-elements {
  lost-column: 1/3;
}

.two-elements:first-child {
  lost-offset: 1/3;
}

@media (max-width: 350px) {
  .two-elements:first-child {
    lost-offset: clear-left;
  }
}
{% endhighlight %}
