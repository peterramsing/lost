---
order: 8
title: "Vertical Grids"
nav: "vertical-grids"
code-example: "true"
type: "getting-started"
description: "Once you've mastered the basic horizontal grid system (it shouldn't take long), you can start to make vertical grids that have the same vertical gutters as your horizontal grids. Just use the `lost-row` property in place of `lost-column`. These rows will stretch to fill their container's height, so if you'd like to see them take up the full height of the page, set `height: 100%` on your container."

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
  height: 100%;
}

div {
  lost-row: 1/3;
}
{% endhighlight %}
