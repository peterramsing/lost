<p align="center">
  <img src="http://corysimmons.github.io/lost/lost-grid.svg">
</p>

<p align="center">
  <img src="https://img.shields.io/npm/v/lost-grid.svg">
  <img src="https://img.shields.io/bower/v/lost-grid.svg">
  <img src="http://img.shields.io/npm/dm/lost-grid.svg">
</p>

Lost Grid is a grid system for SCSS or Stylus. It is built upon years of studying grid systems and building dozens of grid systems with tons of community feedback.

It makes use of [`calc()`](http://caniuse.com/#feat=calc) to create stunning grids based on fractions you define.

To support [Isotope](http://isotope.metafizzy.co/) and similar plugins, it mimics Bootstrap's [grid](http://getbootstrap.com/css/#grid) markup.


## Better than X
Lost is better than any grid system out there and it can prove it.

Feature | Lost | [Bootstrap](http://getbootstrap.com/css/#grid) | [Foundation](http://foundation.zurb.com/grid.html) | [Jeet](http://jeet.gs/) | [Neat](http://neat.bourbon.io/) | [Susy](http://susy.oddbird.net/)
:-:|:-:|:-:|:-:|:-:|:-:|:-:
[Responsive](https://github.com/corysimmons/lost/wiki/Comparison-Explanation#responsive) | :+1: | :+1: | :+1: | :+1: | :+1: | :+1:
[Small learning curve](https://github.com/corysimmons/lost/wiki/Comparison-Explanation#small-learning-curve) | :+1: | :+1: | :+1: | :+1: | :+1:
[Easy-to-implement](https://github.com/corysimmons/lost/wiki/Comparison-Explanation#easy-to-implement) | :+1: | :+1: | :+1:
[Works with Masonry](https://github.com/corysimmons/lost/wiki/Comparison-Explanation#works-with-masonry) | :+1: | :+1: | :+1: |
[Terse markup](https://github.com/corysimmons/lost/wiki/Comparison-Explanation#terse-markup) | | | | :+1: | :+1: | :+1:
[On-the-fly grids](https://github.com/corysimmons/lost/wiki/Comparison-Explanation#on-the-fly-grids) | :+1: | | | :+1: | :+1: | :+1:
[Clean markup](https://github.com/corysimmons/lost/wiki/Comparison-Explanation#clean-markup) | :+1: | | | :+1: | :+1: | :+1:
[Real gutters](https://github.com/corysimmons/lost/wiki/Comparison-Explanation#real-gutters) | :+1: | | | :+1: | :+1: | :+1:
[Stylus support](https://github.com/corysimmons/lost/wiki/Comparison-Explanation#stylus-support) | :+1: | | | :+1:
[No Additional Ratio Context](https://github.com/corysimmons/lost/wiki/Comparison-Explanation#no-additional-ratio-context) | :+1:
[Consistent Horizontal Gutters](https://github.com/corysimmons/lost/wiki/Comparison-Explanation#consistent-horizontal-gutters) | :+1:
[Lightweight](https://github.com/corysimmons/lost/wiki/Comparison-Explanation#lightweight) | :+1:
[Vertical Grids](https://github.com/corysimmons/lost/wiki/Comparison-Explanation#vertical-grids) | :+1:

<sup>If you notice anything in this table is incorrect or unfair, please don't hesitate to [open an issue](https://github.com/corysimmons/lost/issues/new).</sup>


## Getting Started

Lost works by putting **blocks** into **boxes**. Imagine blocks are your columns, and boxes are your rows - except you can use them to create vertical grids so we've opted to use the terms `block` and `box`.

```html
<section>
  <figure>...</figure>
  <figure>...</figure>
  <figure>...</figure>
</section>
```

```stylus
section
  box()

figure
  block(1/3)
```

Want to add a ton of items to your row? Use `cycle()` to make sure each group of elements is cleared (for uneven height elements).

```html
<section>
  <figure>...</figure>
  <figure>...</figure>
  <figure>...</figure>
  <figure>...</figure>
  <figure>...</figure>
  <figure>...</figure>
</section>
```

```stylus
section
  box()

figure
  block(1/3)
  cycle(3)
```

To give your grid a background color simply wrap your box in another element.

```html
<div class="wrap">
  <section>
    <figure>...</figure>
    <figure>...</figure>
    <figure>...</figure>
  </section>
</div>
```

```stylus
.wrap
  background: tomato

section
  box()

figure
  block(1/3)
  background: darken(tomato, 10%)
```

Nesting is simple and requires [no extra fractions](https://github.com/corysimmons/lost/wiki/Comparison-Explanation#no-additional-ratio-context) like in other preprocessor grid systems.

```html
<section>
  <figure>
    <section>
      <figure>...</figure>
      <figure>...</figure>
    </section>
  </figure>
  <figure>...</figure>
  <figure>...</figure>
</section>
```

```stylus
section
  box()

figure
  block(1/3)
  figure
    block(1/2)
```

You can `offset` columns and perform source ordering with `move`.

```html
<section>
  <figure>...</figure>
  <figure>...</figure>
</section>
```

```stylus
section
  box()

figure
  block(1/3)
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

Use the `edit()` mixin at base level to visualize the entire structure of your site, or just specify the areas you're working on.

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
  &:nth-of-type(1)
    edit()
  &:nth-of-type(2)
    edit(green)
```

Lost even lets you create your own custom CSS grids in just a few lines of code with the `$output` parameter which accepts `normal` (compiles all `column` styles), `init` (only initial styles), and `bare` (just the `width`).

```stylus
[class*="col-"]
  block($output: init)

for $i in 1..12
  .col-{$i}
    block($i/12, $output: bare)
```

```css
[class*="col-"] {
  float: left;
  margin-left: 15px;
  margin-right: 15px;
}
.col-1 {
  width: calc(100% * 0.083333333333333 - 30px);
}
.col-2 {
  width: calc(100% * 0.166666666666667 - 30px);
}
...
```

Once you've mastered the basic horizontal grid system (it shouldn't take long), you can start to make vertical grids that have the same vertical gutters as your horizontal grids. Just pass `$dir: column` to both your `box()` and `block()` mixins.

```html
<section>
  <figure>...</figure>
  <figure>...</figure>
  <figure>...</figure>
</section>
```

```stylus
section
  box(column)

figure
  block(1/3, column)
```

No other grid system in the world supports vertical grids. You can even use both at the same time to create a horizontal/vertical grid (which resembles a tic-tac-toe board).

```html
<section>
  <figure>...</figure>
  <figure>...</figure>
  <figure>...</figure>
  <figure>...</figure>
</section>
```

```stylus
section
  box(both)

figure
  block(1/2, both)
```

Lost also provides some helper functions for complete control over your grids.

```html
<section>
  <figure>...</figure>
  <figure>...</figure>
</section>
```

```stylus
section
  box()

figure
  float: left
  width: size(1/2)
  gutters()
```


## Grid Settings
Just set any of these in a settings file after you `@import` Lost and before you use a Lost mixin.

- `$gutter = 30px`
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
Clearfix used to clear floated children boxes. http://nicolasgallagher.com/micro-clearfix-hack

```stylus
.parent
  cf()
  .child
    box(1/2)
```

##### `align()`
Vertically and/or horizontally align nested elements.

- `$dir = both` - Direction. Either `vertical`, `v`, `horizontal`, or `h`. Defaults to `both`.

```stylus
.parent
  align(vertical)
  width: 600px
  height: 400px
  .child
    width: 300px
    height: 150px
```

##### `box()`
Creates a horizontal or vertical container for blocks. Applies a negative margin on each side of the element depending on it's direction. This is required when adding blocks to negate their outer margins. The row version of this mixin automatically applies clearfix as it's assumed floated elements will be nested within it.

- `$dir = row` - The direction of the nested grid system. Accepts row, column, or both.
- `$gut = $gutter` - The gutter width. This is typically left alone, but if you want a specific box/block combination to have a larger or smaller gutter, you need to specify the same $gut on both types of elements.

```stylus
.parent
  box()
  .children
    box(1/2)
```

##### `block()`
Creates a box that is a fraction of the size of it's containing element with a margin on each side of the element. You don't need to pass any additional ratios (fractions), as the grid system will make use of calc().

- `$fraction = 1` - This is a simple fraction of the containing element's width or height depending on $dir.
- `$dir = row` - The direction of the containing grid. Can be row (horizontal grid), column (vertical grid), or both.
- `$gut = $gutter` - The margin on each side of the element used to create a gutter. Typically this is left alone, but if you need to have a specifically large or small gutter, you will need to alter this along with the containing row's gutter so they are the same.
- `$output = normal` - Determines what type of code to output. Accepts normal (all styles for a box), init (the initial styles of any box), or bare (just the width of the box). Useful for creating CSS classes with Lost.

```stylus
.parent
  box()
  .children
    block(1/4)
```

##### `offset()`
Margin to the left or right of an elements depending on if the fraction passed is positive or negative. Unfortunately it only works for horizontal grids as percentages are determined by container width exclusively.

- `$fraction = false` - Fraction of the container to be offset.
- `$gut = $gutter` - How large the gutter involved is, typically this won't be adjusted, but if you have set the boxes for that row to have different gutters than default, you will need to match that gutter here as well.

```stylus
.two-elements
  block(1/3)
  &:nth-child(2)
    offset(1/3)
```

##### `move()`
Source ordering. Useful for having an element appear above or below another element on mobile devices, and then to the opposite side on larger devices. For instance, a sidebar and article. You might want the sidebar to appear before the article on mobile, but be to the right of the article on desktop. This is how that is achieved. Unfortunately it only works for horizontal grids as percentages are determined by container width exclusively.

- `$fraction = false` - Fraction of the container to be moved by it's left value.
- `$output = normal` - Determines what styles are compiled. Accepts normal (all styles), init (only initialization styles), or bare (just the left position).

```stylus
.sidebar
  @media (min-width: 800px)
    block(1/3)
    move(2/3)
.article
  @media (min-width: 800px)
    block(2/3)
    move(-1/3)
```

##### `cycle()`
Since row boxes are floated, when they are of unequal height, they will misalign easily. By setting `cycle()` you can make sure elements are being cleared on appropriate rows.

- `$item = -1` - The `nth-child + 1` element to clear on. If you want a row to be 3 elements wide, then you'd pass 3.

```stylus
.gallery
  img
    column(1/3)
    cycle(3)
```

##### `size()`
Helper function for returning the width or height of an element.

- `$fraction = false` - Fraction of the container.
- `$gut = $gutter` - Gutter unit to be used in the calculation.

```stylus
.element
  width: size(1/2)
  height: size(1/3)
```

##### `gutters()`
Helper mixin for setting the gutters of an element.

- `$dir = row` - Whether this is a horizontal (row) or vertical (column) grid.
- `$gut = $gutter` - Gutter unit to be used in the calculation.

```stylus
.element
  width: size(1/2)
  height: size(1/3)
```


## Usage with Node
```javascript
var fs = require('fs'),
    stylus = require('stylus'),
    lost = require('lost-grid');

stylus(fs.readFileSync('./css/style.styl', 'utf8'))
  .use(lost())
  .render(function(err, css){
    if (err) return console.error(err);
    console.log(css);
  });
```

```stylus
@import 'lost'

.element
  column(1/3)
```


## Example Code
- https://github.com/corysimmons/lost/tree/gh-pages


## Browser Support
- [`calc()` grids](https://webdesign.tutsplus.com/tutorials/calc-grids-are-the-best-grids--cms-22902) are IE9+ with poor support on old Android browsers ([`calc()` browser support](http://caniuse.com/#feat=calc)). With the [calc() Polyfill](https://github.com/closingtag/calc-polyfill) the grid works perfect in IE8 as well.
- Flexbox is required for the `align()` mixin. ([Flexbox browser support](http://caniuse.com/#search=flexbox))


### Other Projects
If you like this project then I encourage you to check out a few of my other hand-selected projects.

- [Boy](https://github.com/corysimmons/boy) - A super lightweight, old-browser-friendly, HTML5 boilerplate with tons of features that make it a great start to any project.
- [Typographic](https://github.com/corysimmons/typographic) - Insanely powerful yet easy-to-use responsive typography. Includes vertical rhythm, font stacks, modular scale, and more.
- [lost-grid.js](https://github.com/corysimmons/lost-grid.js) - A purely JavaScript version of Lost v1. You can create your grid system directly in your markup without ever touching a line of preprocessor code. A pretty cool concept that works great for prototypes.
