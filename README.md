<img src="http://corysimmons.github.io/lost/lost-grid.svg">

Lost Grid is a grid system for SCSS or Stylus.

It makes use of [`calc()`](http://caniuse.com/#feat=calc) to create stunning grids based on fractions you define, and falls back to percentage-based [Jeet](http://jeet.gs/) on older browsers.

To support [Isotope](http://isotope.metafizzy.co/) and similar plugins, it mimics Bootstrap's [grid](http://getbootstrap.com/css/#grid) markup.

You can either use the `row()` mixin or the helper class.

```html
<div class="row">
  <figure>...</figure>
  <figure>...</figure>
  <figure>...</figure>
</div>
```

```stylus
figure
  column(1/3)
```

To give your grid a background color simply wrap your `.row` in another element.

```html
<section>
  <div class="row">
    <figure>...</figure>
    <figure>...</figure>
    <figure>...</figure>
  </div>
</section>
```

```stylus
section
  background: tomato

figure
  column(1/3)
```

You can center that `section` with a mixin or the helper class `.center`.

```stylus
section
  center()
```

Nesting is simple if you are using the default `calc()` version of the grid system.

```html
<div class="row">
  <figure>
    <div class="row">
      <figure>...</figure>
      <figure>...</figure>
    </div>
  </figure>
  <figure>...</figure>
  <figure>...</figure>
</div>
```

```stylus
figure
  column(1/3)
  figure
    column(1/2)
```

If you need to support older browsers, you need to pass *parent ratios*.

```stylus
figure
  column(1/3)
  figure
    column(1/2 1/3)
```

You can `offset` columns and perform source ordering with `shift`.

```html
<div class="row">
  <figure>...</figure>

  <figure>...</figure>
</div>
```

```stylus
figure
  column(1/3)
  &:first-child
    offset(1/3) // or shift(1/3)
```

Easily vertically or horizontally center children elements with the `align()` mixin.

```html
<section>
  <div></div>
</section>
```

```stylus
section
  align()
  width: 600px
  height: 400px

div
  width: 100px
  height: 100px
```

And finally, use the `edit()` mixin at base level to visualize the entire structure of your site, or just specify the areas you're working on.

```html
<section>
  <figure>...</figure>
  <figure>...</figure>
  <figure>...</figure>
</section>

<section>
  <figure>...</figure>
  <figure>...</figure>
  <figure>...</figure>
</section>
```

```stylus
section
  &:first-child
    edit()
  &:last-child
    edit(green)
```


## Grid Settings
- `gutter = 30px`
- `breakpoint = 1000px`
- `old = false`
- `rtl = false`


## Mixin Options
I've only outlined the options you might want to use to prevent confusion. Feel free to browse the [source](lost.styl) to see all options.

##### `edit(bg = blue)`
Set a color to be lightened for your editable areas.

##### `align(direction = both)`
- `both`
- `vertical` or `v`
- `horizontal` or `h`
- `reset`

##### `center(pad = 0, mw = breakpoint)`
- `pad` (padding on the left and right)
- `mw` (max width)

##### `row(ratios = 1)`
- `ratios` (only used if you're nesting rows for older browsers)

##### `column(ratios = 1)`
- `ratios` (fractional width of the containing element - if nesting on older browsers, you will need to pass parent ratios to keep gutters consistent)

##### `offset(ratios = false)`
- `ratios` (a positive or negative fractional margin to the left or right respectively)

##### `shift(ratios = false)`
- `ratios` (a positive or negative fraction to adjust the `left` property of a relatively positioned element)

##### `cycle(item = -1)`
- `item` (`nth-child` to `clear: both` on - useful for clearing items of uneven height, even within media queries)


## Example Code
- https://github.com/corysimmons/lost/tree/gh-pages


## Browser Support
- [`calc()` grids](https://webdesign.tutsplus.com/tutorials/calc-grids-are-the-best-grids--cms-22902) are IE9+ with poor support on old Android browsers ([`calc()` browser support](http://caniuse.com/#feat=calc)), however the fallback grid system based on Jeet has support all the way back to IE7 with a proper HTML [boilerplate](https://github.com/corysimmons/boy).
- Flexbox is required for the `align()` mixin, although there is a fall back that is IE9+. ([Flexbox browser support](http://caniuse.com/#search=flexbox))


## Caveats
- Nesting in the fallback grid system creates gaps a few pixels wide on each side of the nested elements. This is due to a rounding issue that affects a lot of fluid grid systems.
