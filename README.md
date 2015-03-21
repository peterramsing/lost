<p align="center">
  <img src="http://corysimmons.github.io/lost/lost-grid.svg">
</p>

<p align="center">
  <img src="https://img.shields.io/npm/v/lost-grid.svg">
  <img src="https://img.shields.io/bower/v/lost-grid.svg">
  <img src="http://img.shields.io/npm/dm/lost-grid.svg">
</p>

Lost Grid is a grid system for SCSS or Stylus. It is built upon years of studying grid systems and building dozens of grid systems with tons of community feedback.

It makes use of [`calc()`](http://caniuse.com/#feat=calc) to create stunning grids based on fractions you define, and falls back to a heavily modified, much cleaner version of [Jeet](http://jeet.gs/) on older browsers.

To support [Isotope](http://isotope.metafizzy.co/) and similar plugins, it mimics Bootstrap's [grid](http://getbootstrap.com/css/#grid) markup.


## Better than X
Lost is better than any grid system out there and it can prove it.

Feature | Lost | [Bootstrap](http://getbootstrap.com/css/#grid) | [Foundation](http://foundation.zurb.com/grid.html) | [Jeet](http://jeet.gs/) | [Neat](http://neat.bourbon.io/) | [Susy](http://susy.oddbird.net/)
:-:|:-:|:-:|:-:|:-:|:-:|:-:
[Responsive](https://github.com/corysimmons/lost/wiki/Comparison-Explanation#responsive) | :+1: | :+1: | :+1: | :+1: | :+1: | :+1:
[Small learning curve](https://github.com/corysimmons/lost/wiki/Comparison-Explanation#small-learning-curve) | :+1: | :+1: | :+1: | :+1: | :+1:
[Easy-to-implement](https://github.com/corysimmons/lost/wiki/Comparison-Explanation#easy-to-implement) | :+1: | :+1: | :+1:
[Works with Masonry](https://github.com/corysimmons/lost/wiki/Comparison-Explanation#works-with-masonry) | :+1: | :+1: | :+1:
[On-the-fly grids](https://github.com/corysimmons/lost/wiki/Comparison-Explanation#on-the-fly-grids) | :+1: | | | :+1: | :+1: | :+1:
[Clean markup](https://github.com/corysimmons/lost/wiki/Comparison-Explanation#clean-markup) | :+1: | | | :+1: | :+1: | :+1:
[Real gutters](https://github.com/corysimmons/lost/wiki/Comparison-Explanation#real-gutters) | :+1: | | | :+1: | :+1: | :+1:
[Stylus support](https://github.com/corysimmons/lost/wiki/Comparison-Explanation#stylus-support) | :+1: | | | :+1:
[No Additional Ratio Context](https://github.com/corysimmons/lost/wiki/Comparison-Explanation#no-additional-ratio-context) | :+1:
[Consistent Horizontal Gutters](https://github.com/corysimmons/lost/wiki/Comparison-Explanation#consistent-horizontal-gutters) | :+1:
[Lightweight](https://github.com/corysimmons/lost/wiki/Comparison-Explanation#lightweight) | :+1:
[Old browser fallback](https://github.com/corysimmons/lost/wiki/Comparison-Explanation#old-browser-fallback) | :+1:

<sup>If you notice anything in this table is incorrect or unfair, please don't hesitate to [open an issue](https://github.com/corysimmons/lost/issues/new).</sup>


## Getting Started

Feel free to follow along by forking a CodePen demo in either [SCSS](http://codepen.io/corysimmons/pen/emQQPV?editors=110) or [Stylus](http://codepen.io/corysimmons/pen/XJyyBE?editors=110).

You can either use the `row()` mixin or the helper class. Then just specify with a fraction how large you'd like each element to be.

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

Want to add a ton of items to your row? Use `cycle()` to make sure each group of elements is cleared (for uneven height elements).

```html
<div class="row">
  <figure>...</figure>
  <figure>...</figure>
  <figure>...</figure>
  <figure>...</figure>
  <figure>...</figure>
  <figure>...</figure>
</div>
```

```stylus
figure
  column(1/3)
  cycle(3)
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

You can center that `section` with a mixin or the helper class `.container`.

```stylus
section
  container()
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

You can `offset` columns and perform source ordering with `move`.

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
    offset(1/3) // or move(1/3)
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
- `$gutter = 30px`
- `$breakpoint = 1000px`
- `$old = false`
- `$rtl = false`


## Mixin Options

##### `edit()`
Sets a translucent background color to all elements it affects. Helpful while setting up, or debugging, the structure of your site to make sure all items are cleared correctly.

- `$bg = blue` - A color to be lightened, so make sure you pick a darkish color.

```stylus
section
  edit(red)
```

##### `cf()`
Clearfix used to clear floated children columns. http://nicolasgallagher.com/micro-clearfix-hack

```stylus
.parent
  cf()
  .child
    column(1/2)
```

##### `align()`
Vertically and/or horizontally align nested elements.

- `$direction = both` - Either `vertical`, `v`, `horizontal`, or `h`. Defaults to `both`.

```stylus
.parent
  align(vertical)
  width: 600px
  height: 400px
  .child
    width: 300px
    height: 150px
```

##### `container()`
Create a container that is centered in the middle of the page with some padding on the left and right sides of it.

- `$pad = 0` - Padding on the left and right side of the element. `0` by default, but feel free to increase it so containers don't touch the edge of the viewport.
- `$mw = $breakpoint` - The `max-width` of the element.

```stylus
section
  container(45px)
```

##### `row()`
Apply a negative margin on each side of the element. This is required when adding columns and such to negate their outer margins. This mixin automatically applies clearfix as it's assumed floated elements will be nested within it.

- `$ratios = 1` - If `$old` is `false`, a single fraction used to determine the negative left and right margins of the element. If `$old` is `true`, a collection of container ratios (fractions).
- `$gut = $gutter` - The gutter width. This is typically left alone, but if you want a specific row/column combination to have a larger or smaller gutter, you need to specify the same `$gut` on both types of elements.

```stylus
.parent
  row()
  .children
    column(1/2)
```

##### `column()`
Creates a column that is a fraction of the size of it's containing element with a margin on each side of the element. If `$old` is set to `false`, you don't need to pass any additional ratios (fractions), as the grid system will make use of `calc()`. If `$old` is set to `true`, the grid system will support more browsers, but you will need to pass additional ratios for each nested container. It's highly recommended you use the `calc()` syntax to avoid confusion.

- `$ratios = 1` - If `$old` is `false`, this is a simple fraction of the containing element's width. If `$old` is `true`, this is a collection of fractions with the containing element's fraction passed each time it is nested.
- `$gut = $gutter` - The margin on each side of the element used to create a gutter. Typically this is left alone, but if you need to have a specifically large or small gutter, you will need to alter this along with the containing row's gutter so they are the same.

```stylus
// Clean calc() syntax
.parent
  row()
  .children
    column(1/4)
```

```stylus
// Supports old browsers syntax
.parent
  row()
  .child
    column(1/2)
    .nested-parent
      row(1/2)
      .nested-child
        column(1/4 1/2)
```

##### `offset()`
Margin to the left or right of an elements depending on if the fraction passed is positive or negative.

- `$ratios = false` - Fraction of the container to be offset.
- `$gut = $gutter` - How large the gutter involved is, typically this won't be adjusted, but if you have set the columns for that row to have different gutters than default, you will need to match that gutter here as well.

```stylus
.two-elements
  column(1/3)
  &:nth-child(2)
    offset(1/3)
```

##### `move()`
Source ordering. Useful for having an element appear above or below another element on mobile devices, and then to the opposite side on larger devices. For instance, a sidebar and article. You might want the sidebar to appear before the article on mobile, but be to the right of the article on desktop. This is how that is achieved.

- `$ratios = false` - Fraction of the container to be moved by it's `left` value.

```stylus
.sidebar
  @media (min-width: 800px)
    column(1/3)
    move(2/3)
.article
  @media (min-width: 800px)
    column(2/3)
    move(-1/3)
```

##### `cycle()`
Since columns are floated, when they are of unequal height, they will misalign easily. By setting `cycle()` you can make sure elements are being cleared on appropriate rows.

- `$item = -1` - The `nth-child + 1` element to clear on. If you want a row to be 3 elements wide, then you'd pass 3.

```stylus
.gallery
  img
    column(1/3)
    cycle(3)
```

##### `.container`
A helper class used for centering by default values.

##### `.row`
A helper class used to create rows with default values.


## Example Code
- https://github.com/corysimmons/lost/tree/gh-pages


## Browser Support
- [`calc()` grids](https://webdesign.tutsplus.com/tutorials/calc-grids-are-the-best-grids--cms-22902) are IE9+ with poor support on old Android browsers ([`calc()` browser support](http://caniuse.com/#feat=calc)), however the fallback grid system based on Jeet has support all the way back to IE7 with a proper HTML [boilerplate](https://github.com/corysimmons/boy).
- Flexbox is required for the `align()` mixin, although there is a fall back that is IE9+. ([Flexbox browser support](http://caniuse.com/#search=flexbox))


## Caveats
- Nesting in the fallback grid system creates gaps a few pixels wide on each side of the nested elements. This is due to a rounding issue that affects a lot of fluid grid systems.
