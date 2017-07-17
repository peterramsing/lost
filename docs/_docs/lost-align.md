---
title: "Lost Align"
nav: "lost-align"
code-example: "true"
type: "property-option"
description: "Align nested elements. Apply this to a parent container."
rules:
  - rule: "reset | horizontal | vertical | top-left | top-center | top | top-right | middle-left | left | middle-center | center | middle-right | right | bottom-left | bottom-center | bottom | bottom-right"
    description: "The position the nested element takes relative to the containing element."
  - rule: "flex | no-flex"
    description: "Determines whether this element should use Flexbox or not."
---

{% highlight css %}
.parent {
  lost-align: right;
  width: 600px;
  height: 400px;
}

.child {
  width: 300px;
  height: 150px;
}
{% endhighlight %}
