---
order: 6
title: "Alignment"
nav: "alignment"
code-example: "true"
type: "getting-started"
description: "Easily align children elements with the `lost-align` property. It accepts options like `top-left`, `right`, `center`."

---

See [lost-align](#lost-align) for more details.

{% highlight html %}
<section>
  <div>Aligned</div>
</section>
{% endhighlight %}

{% highlight css %}
section {
  lost-align: center;
  width: 600px;
  height: 400px;
}

div {
  width: 100px;
  height: 100px;
}
{% endhighlight %}
