---
title: "Lost Variables"
nav: "lost-vars"
code-example: "true"
type: "function"
description: "Use to output Lost Variables anywhere in the project to help consistency and readability."
rules:
  - rule: "gutter"
    description: "Outputs the value of the global gutter. Use this anywhere in your project."
  - rule: "gutter-local"
    description: "Outputs the value of the gutter for that particular declaration."
---

{% highlight css %}
.hero-area {
  lost-column: 1/3 4 50px;
  padding: lost-vars('gutter-local'); /* 50px */
  margin-top: lost-vars('gutter'); /* 30px default gutter */
}
{% endhighlight %}