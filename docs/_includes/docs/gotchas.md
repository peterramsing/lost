# Gotchas

- If you're experiencing issues when adding padding to an element with `lost-column`, look into adding `box-sizing: border-box` [See Issue 118](https://github.com/peterramsing/lost/issues/118#issuecomment-100752669)
  - Especially if you're expecting two elements to be next to each other and they end up being on top of each other.
- If you're using [Less](http://lesscss.org/) there are sometimes issues with fractions being divided before Lost can interpret them.
  - To fix, escape the math like so: `lost-column: ~"1/2";`.
  - See: [Lost issue 229](https://github.com/peterramsing/lost/issues/229), [Less issue 974](https://github.com/less/less.js/issues/974)
- If you're using [Less](http://lesscss.org/) in version `<2.6` you need to escape any `@lost` declarations like so: [See Issue 197](https://github.com/peterramsing/lost/issues/197#issuecomment-170324607)

    {% highlight css %}
  .escape-at-rules(@literal) {
        @namespace ~"lostgrid; @{literal}";
    }

    .escape-at-rules("@lost flexbox flex");
    {% endhighlight %}
