---
order: 14
title: "What's the Rounder Settings?"
nav: "rounder-settings"
code-example: "false"
type: "getting-started"

---

The "rounder" setting is used to fine tune your width of the container based on what browsers you intend to have computability with and how nested the container you're targeting is.

#### How does this work?
You can fine tune the global setting of the "rounder" if you are not intending to target some of the browsers that can have a hard time with rounding 1/3 of 100%. This is done with a global `@lost` rule.

If you want to do this on a per-element basis, you can do that too! This allows you to fine-tune exactly what you need for the situation. This could be if it's nested deeply and you're finding that browsers are not rounding correctly.

##### Global
{% highlight css %}
@lost rounder 99.99999;
{% endhighlight %}

##### Per element
{% highlight css %}
.foo {
  lost-column: 1/3;
  lost-column-rounder: 100;
}
.bar {
  lost-waffle: 1/4;
  lost-column-rounder: 99.98;
}
{% endhighlight %}
