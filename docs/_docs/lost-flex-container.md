---
title: "Lost Flex Container"
nav: "lost-flex-container"
code-example: "true"
type: "property-option"
description: "Creates a flexbox container."
rules:
  - rule: "row | column"
    description: "The flex-direction the container should create. This is typically opposite to the element you're creating so a row would need `lost-flex-container: column;`."
---

{% highlight css %}
section {
  lost-flex-container: row;
}

div {
  lost-column: 1/2 flex;
}
{% endhighlight %}
