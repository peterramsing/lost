---
title: "Lost Move"
nav: "lost-move"
code-example: "true"
type: "property-option"
description: "Source ordering. Shift elements left, right, up, or down, by their left or top position by passing a positive or negative fraction."
rules:
  - rule: "fraction"
    description: "Fraction of the container to be shifted."
  - rule: "row | column"
    description: "Direction the grid is going. Should be the opposite of the column or row it's being used on."
  - rule: "gutter"
    description: "Adjust the size of the gutter for this movement. Should match the element's gutter."
---

If the gutter within the selector is set by `lost-column` or `lost-row` then it will be retained in the `lost-move` output *unless* the gutter is explicitly set by `lost-move` or `lost-move-gutter`.

{% highlight css %}
div {
  lost-column: 1/2;
}

div:first-child {
  lost-move: 1/2;
}

div:last-child {
  lost-move: -1/2;
}
{% endhighlight %}

{% highlight css %}
div {
  lost-column: 1/2 0 0;
}

div:first-child {
  lost-move: 1/2 0 0;
}

div:last-child {
  lost-move: -1/2 0 0;
}
{% endhighlight %}
