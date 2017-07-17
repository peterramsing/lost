---
order: 9
title: "Waffle Grids"
nav: "waffle-grids"
code-example: "true"
type: "getting-started"
description: "You can even make a horizontal/vertical grid (a waffle grid) which resembles a tic-tac-toe board."

---

{% highlight html %}
<section>
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
  <div>5</div>
  <div>6</div>
  <div>7</div>
  <div>8</div>
  <div>9</div>
</section>
{% endhighlight %}

{% highlight css %}
section {
  height: 100%;
}

div {
  lost-waffle: 1/3;
}
{% endhighlight %}
