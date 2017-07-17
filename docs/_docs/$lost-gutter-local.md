---
title: "Lost Gutter (Local)"
nav: "lost-gutter-local"
code-example: "true"
type: "variable"
description: "Allows you to output the gutter that is declared locally within the declaration."
rules:
  - rule: "$lost-gutter-local"
    description: "Outputs the value of the gutter for that particular declaration."
---

{% highlight css %}
.hero-area {
  lost-column: 1/3 4 50px;
  padding: $lost-gutter-local; /* 50px */
  margin-top: $lost-gutter; /* 30px default gutter */
}
{% endhighlight %}

#### For use with
* `lost-column`
* `lost-waffle`
* `lost-row`
* `lost-offset`
* `lost-center`
* `lost-masonry-wrap`
* `lost-masonry-column`
