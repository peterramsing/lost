---
title: "Lost Gutter"
nav: "lost-gutter"
code-example: "true"
type: "variable"
description: "Use the global gutter anywhere in the project to help consistency and readability."
rules:
  - rule: "$lost-gutter"
    description: "Outputs the value of the global gutter. Use this as a value anywhere in your project."
deprecation: "true"
deprecation-instead: "lost-vars"
---

##### Default
{% highlight css %}
.hero-area {
  padding: $lost-gutter; /* 30px */
}
{% endhighlight %}

##### Custom
{% highlight css %}
@lost gutter 40px;

.h1 {
  padding-top: $lost-gutter; /* 40px */
}
{% endhighlight %}
