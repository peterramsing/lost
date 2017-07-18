---
title: "Lost Column"
nav: "lost-column"
code-example: "true"
type: "property-option"
description: "Creates a column that is a fraction of the size of its containing element's width with a gutter."
rules:
  - rule: "fraction"
    description: "This is a simple fraction of the containing element's width."
  - rule: "cycle"
    description: "Lost works by assigning a margin-right to all elements except the last in the row. It does this by default by using the denominator of the fraction you pick. To override the default use this param., e.g.: .foo { lost-column: 2/4 2; }"
  - rule: "gutter"
    description: "The margin on the right side of the element used to create a gutter. Typically this is left alone and settings.gutter will be used, but you can override it here if you want certain elements to have a particularly large or small gutter (pass 0 for no gutter at all)."
    sub-note: "When specifying the gutter, you need to also specify the cycle."
  - rule: "flex | no-flex"
    description: "Determines whether this element should use Flexbox or not."
  - rule: "none"
    description: "Resets the column (back to browser defaults)"
---

{% highlight css %}
div {
  lost-column: 1/3;
}

div {
  lost-column: 2/6 3 60px flex;
}
{% endhighlight %}
