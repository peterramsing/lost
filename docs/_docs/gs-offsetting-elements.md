---
order: 5
title: "Offsetting Elements"
nav: "offsetting-elements"
code-example: "true"
type: "getting-started"
description: "You can offset columns easily. To offset in the other direction, pass a negative fraction."

---

{% highlight html %}
<section>
  <div>1</div>
  <div>2</div>
</section>
{% endhighlight %}

{% highlight css %}
div {
  lost-column: 1/3;
}

div:first-child {
  lost-offset: 1/3;
}
{% endhighlight %}

**Note: the direction of the offset changed in Version 8 to be more natural. [Read More](https://github.com/peterramsing/lost/pull/331)**
