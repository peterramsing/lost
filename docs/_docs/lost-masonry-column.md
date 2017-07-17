---
title: "Lost Masonry Column"
nav: "lost-masonry-column"
code-example: "true"
type: "property-option"
description: "Creates a column for working with JS masonry libraries like Isotope. Assigns a margin to each side of the element."
rules:
  - rule: "flex | no-flex"
    description: "Determines whether this element should use Flexbox or not."
  - rule: "gutter"
    description: "How large the gutter involved is, typically this won't be adjusted and will inherit settings.gutter, but it's made available if you want your masonry grid to have a special gutter, it should match your masonry-row's gutter."
---

{% highlight css %}
section {
  lost-masonry-wrap: flex 60px;
}

div {
  lost-masonry-column: 1/3 60px flex;
}
{% endhighlight %}
