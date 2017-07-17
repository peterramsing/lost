---
order: 1
title: "Basic Columns"
nav: "basic-columns"
code-example: "true"
type: "getting-started"
description: "To create a basic horizontal grid, just insert some elements into any containing element like so and pass a fraction to the `lost-column` property. To unset (or remove) a column rule, possibly at a larger breakpoint, use `lost-column: none;`"

---

{% highlight html %}
<section>
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</section>
{% endhighlight %}

{% highlight css %}
section {
  lost-utility: clearfix;
}

div {
  lost-column: 1/2;
}
{% endhighlight %}


`lost-utility: clearfix;` is just a [clearfix](http://nicolasgallagher.com/micro-clearfix-hack/) function since Lost Grid elements are floated. It's a good idea to give this to the element wrapping your grid elements every time you have nested floated elements.
