---
order: 3
title: "Controlling Cycle"
nav: "controlling-cycle"
code-example: "true"
type: "getting-started"
description: "Every element gets a float: left; and margin-right: gutter; applied to it except the last element in the row and the last item in a container. Lost will automatically detect the last item in a row (based on the denominator you passed) and apply a margin-right: 0;, and float: right; to it by default. To override this behavior and tell Lost to apply margin-right: 0; and float: right; to a specific iteration, simply pass a cycle param to your lost-column property as the second argument."

---

{% highlight css %}
div {
  lost-column: 2/4 2;
}
{% endhighlight %}

This will tell Lost to create `div:nth-child(2n) { margin-right: 0; }` *instead* of `div:nth-child(4n) { margin-right: 0; }` (like it would by default and break).

Using this knowledge we can create really flexible layouts with varying widths like so (this will work for a single row nicely).

{% highlight html %}
<section class="row">
  <div class="quarter">1</div>
  <div class="half">2</div>
  <div class="quarter">3</div>
</section>
{% endhighlight %}

{% highlight css %}
.row {
  lost-utility: clearfix;
}

.quarter {
  lost-column: 1/4 0;
}

.half {
  lost-column: 1/2 0;
}
{% endhighlight %}

There is a global setting to disable/enable `cycle` by default. Just put `@lost cycle auto;` or `@lost cycle none;` at the top of your stylesheet.

It's suggested that you learn the Lost shorthand syntax, but you can specify cycle (and other params) the verbose way with `lost-column-cycle`.

{% highlight css %}
div {
  lost-column: 2/6;
  lost-column-cycle: 3;
}
{% endhighlight %}

The concept of `cycle` is **extremely important** to Lost and what sets good Lost developers apart from great Lost developers.
