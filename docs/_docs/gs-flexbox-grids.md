---
order: 10
title: "Flexbox Grids"
nav: "flexbox-grids"
code-example: "true"
type: "getting-started"
description: "You can easily change your grids to support Flexbox by altering the global at-rule variable `@lost flexbox` to `flex`. Once you do this, all grids throughout your site will use flexed elements. To make sure they are displayed as flexed elements, you need to wrap them in `lost-flex-container` or `lost-center` (which includes `lost-flex-container` by default)."

---

{% highlight html %}
<section>
  <div>1</div>
  <div>2</div>
  <div>3</div>
</section>
{% endhighlight %}

{% highlight css %}
@lost flexbox flex;

section {
  lost-center: 980px;
}

div {
  lost-column: 1/3;
}
{% endhighlight %}

Flexbox offers slightly cleaner output and avoids the use of `clearfix` and other issues with float-based layouts. It also allows you to have elements of even height rather easily, and [much more](https://github.com/philipwalton/flexbugs/issues/32#issuecomment-90789645). The downside is, Flexbox doesn't work in IE9 or below, so keep that in mind if you have a client that needs that kind of support.

Also note that waffle grids work well for the most part, but are somewhat finicky in fringe situations. All properties provide a way to disable or enable Flexbox per element with the `flex` parameter so if you'd like to disable it for a specific case you could do this:

{% highlight html %}
<section>
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
  <div>5</div>
</section>
{% endhighlight %}

{% highlight css %}
@lost flexbox flex;

section {
  lost-center: 980px no-flex;
}

div {
  lost-waffle: 1/3 no-flex;
}
{% endhighlight %}
