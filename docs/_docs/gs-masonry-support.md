---
order: 11
title: "Masonry Support"
nav: "masonry-support"
code-example: "true"
type: "getting-started"
description: "Lost supports masonry plugins like Isotope. To accomplish this we need to change how the margins work. Instead of applying a `margin-right` to everything, we need to apply it to both sides. We've made a couple special properties to help with this: `lost-masonry-column` which creates a margin on the left and right of each element it's applied to, and `lost-masonry-wrap` which wraps your columns and applies a negative margin to the left and right to them to help line them up with containing elements."

---

{% highlight html %}
<section>
  <div>1</div>
  <div>2</div>
  <div>3</div>
</section>
{% endhighlight %}

{% highlight css %}
section {
  lost-masonry-wrap: no-flex;
}

div {
  lost-masonry-column: 1/3;
}
{% endhighlight %}
