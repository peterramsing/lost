---
order: 12
title: "Global Grid Settings"
nav: "global-grid-settings"
code-example: "true"
type: "getting-started"
description: "Lost uses PostCSS which means to override global variables we need to use something called `at-rules`. They're easy enough. Just define them at the top of your stylesheet and you're good to go."

---

{% highlight css %}
@lost gutter 60px;
@lost flexbox flex;
@lost cycle none;
@lost clearing left;
@lost rounder 100;
@lost --beta-direction rtl;

.foo {
  ...
}
{% endhighlight %}

- `gutter` accepts any unit value. `30px` (default).
- `flexbox` accepts `flex` or `no-flex` (default).
- `cycle` accepts `none` or any digit (although this is really weird). `auto` by default.
- `clearing` accepts `left` or `both` (default).
  - See [#276](https://github.com/peterramsing/lost/issues/276) for details
- `rounder` accepts any number, decimal or whole.
- `--beta-direction` accepts "rtl" and offers initial support of Right-to-Left for `lost-column` and `lost-waffle`. This support is a "beta" feature and should be expected to change. Please submit any issues or suggestions as an [issue](https://github.com/peterramsing/lost/issues/new). Thanks!
