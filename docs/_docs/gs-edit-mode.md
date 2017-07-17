---
order: 7
title: "Edit Mode"
nav: "edit-mode"
code-example: "true"
type: "getting-started"
description: "Use `lost-utility: edit;` on `body` to visualize the entire structure of your site, or just specify the areas you're working on. You can also set custom colors of your lost-utility: edit; declaration by adding an rgb value after `edit`."

---

{% highlight html %}
<section>
  <div>1</div>
  <div>2</div>
  <div>3</div>
</section>

<section>
  <div>4</div>
  <div>5</div>
  <div>6</div>
</section>
{% endhighlight %}

{% highlight css %}
section:nth-of-type(1) {
  lost-utility: edit;
}

section:nth-of-type(2) {
  lost-utility: edit rgb(166, 0, 0);
}
{% endhighlight %}
