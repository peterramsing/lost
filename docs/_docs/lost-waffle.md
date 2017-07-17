---
title: "Lost Waffle"
nav: "lost-waffle"
code-example: "true"
type: "property-option"
description: "Creates a block that is a fraction of the size of its containing element's width AND height with a gutter on the right and bottom."
rules:
  - rule: "fraction"
    description: "This is a simple fraction of the containing element's width and height."
  - rule: "cycle"
    description: "Lost works by assigning a margin-right/bottom to all elements except the last row (no margin-bottom) and the last column (no margin-right). It does this by default by using the denominator of the fraction you pick. To override this default use this param., e.g.: .foo { lost-waffle: 2/4 2; }"
  - rule: "gutter"
    description: "The margin on the right and bottom side of the element used to create a gutter. Typically this is left alone and the global $gutter will be used, but you can override it here if you want certain elements to have a particularly large or small gutter (pass 0 for no gutter at all)."
  - rule: "flex | no-flex"
    description: "Determines whether this element should use Flexbox or not."
  - rule: "float-right"
    description: "Tells LostGrid to float the last element in the cycle to the right. `lost-waffle` floats all elements left by default."

---

{% highlight css %}
section {
  height: 100%;
}

div {
  lost-waffle: 1/3 float-right;
}
{% endhighlight %}
