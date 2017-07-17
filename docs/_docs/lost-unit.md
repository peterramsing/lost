---
title: "Lost Unit"
nav: "lost-unit"
code-example: "true"
type: "property-option"
description: "Allows for a custom unit to be specified for `lost-column`, `lost-row`, and `lost-waffle`"
rules:
  - rule: "unit"
    description: "`%` is default, `vh`, or `vw` pending the property."
---

{% highlight css %}
section {
  lost-column: 1/3;
  lost-unit: vw;
}
{% endhighlight %}
