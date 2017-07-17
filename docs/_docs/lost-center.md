---
title: "Lost Center"
nav: "lost-center"
code-example: "true"
type: "property-option"
description: "Horizontally center a container element and apply padding to it."
rules:
  - rule: "max-width"
    description: "A max-width to assign. Can be any unit."
  - rule: "padding"
    description: "Adds padding to the left and right of the generated container"
  - rule: "flex | no-flex"
    description: "(no-flex is default) Determines whether this element should use Flexbox or not."
---

{% highlight css %}
section {
  lost-center: 980px;
}

section {
  lost-center: 1140px 30px flex;
}
{% endhighlight %}
