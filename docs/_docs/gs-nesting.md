---
order: 4
title: "Nesting"
nav: "nesting"
code-example: "true"
type: "getting-started"
description: "Nesting is simple, but context is not supported. Nested elements are relative to their direct parent’s dimensions."

---

{% highlight html %}
<section>
  <div>a</div>
  <div>
    <div>b</div>
    <div>
      <div>c</div>
      <div>c</div>
    </div>
  </div>
</section>
{% endhighlight %}

{% highlight css %}
div {
  lost-column: 1/2;
}
{% endhighlight %}
