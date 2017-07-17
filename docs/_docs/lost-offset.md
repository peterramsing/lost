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
---

**Note: the direction of the offset changed in Version 8 to be more natural. [Read More](https://github.com/peterramsing/lost/pull/331)**

{% highlight css %}
.two-elements {
  lost-column: 1/3;
}

.two-elements:first-child {
  lost-offset: 1/3;
}
{% endhighlight %}
