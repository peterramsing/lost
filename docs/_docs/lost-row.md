---
title: "Lost Row"
nav: "lost-row"
code-example: "true"
type: "property-option"
description: "Creates a row that is a fraction of the size of its containing element's height with a gutter."
rules:
  - rule: "fraction"
    description: "This is a simple fraction of the containing element's height."
  - rule: "gutter"
    description: "The margin on the bottom of the element used to create a gutter. Typically this is left alone and settings.gutter will be used, but you can override it here if you want certain elements to have a particularly large or small gutter (pass 0 for no gutter at all)."
    sub-note: "When specifying the gutter, you need to also specify the cycle."
  - rule: "flex | no-flex"
    description: "Determines whether this element should use Flexbox or not."
  - rule: "none"
    description: "Resets the row (back to browser defaults)"
---

{% highlight css %}
section {
  height: 100%;
}

div {
  lost-row: 1/3;
}
{% endhighlight %}
