---
title: "Lost Masonry Wrap"
nav: "lost-masonry-wrap"
code-example: "true"
type: "property-option"
description: "Creates a wrapping element for working with JS Masonry libraries like Isotope. Assigns a negative margin on each side of this wrapping element."
rules:
  - rule: "flex | no-flex"
    description: "Determines whether this element should use Flexbox or not."
  - rule: "gutter"
    description: "How large the gutter involved is, typically this won't be adjusted and will inherit settings.gutter, but it's made available if you want your masonry grid to have a special gutter, it should match your masonry-column's gutter."
---

{% highlight css %}
section {
  lost-masonry-wrap: no-flex;
}

div {
  lost-masonry-column: 1/3;
}
{% endhighlight %}
