<p align="center">
  <img src="http://corysimmons.github.io/lost/lost-grid.svg">
</p>

<p align="center">
  <img src="https://img.shields.io/npm/v/lost-grid.svg?style=flat-square">
  <img src="https://img.shields.io/bower/v/lost-grid.svg?style=flat-square">
  <img src="http://img.shields.io/npm/dm/lost-grid.svg?style=flat-square">
</p>

Lost Grid is a grid system for SCSS or Stylus. It is built upon years of studying and [building](http://jeet.gs) grid systems with **tons** of community feedback.

It makes use of [`calc()`](https://webdesign.tutsplus.com/tutorials/calc-grids-are-the-best-grids--cms-22902) to create stunning grids based on fractions you define.

I can tell you with no ego, this is [my finest grid](https://www.youtube.com/watch?v=EnjtQQQaDKo).

See for yourself! **Fork a demo** on CodePen and [follow along](#getting-started): [SCSS](http://codepen.io/corysimmons/pen/RNOvpN?editors=110), ~~[LESS](https://github.com/corysimmons/lost/issues/57)~~, or [Stylus](http://codepen.io/corysimmons/pen/zxXeNJ?editors=110)


## Table of Contents
- [Comparison Table](#better-than-x)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Basic Columns](#basic-columns)
  - [Centering Elements](#centering-elements)
  - [Controlling Cycle](#controlling-cycle)
  - [Nesting](#nesting)
  - [Offseting Elements](#offseting-elements)
  - [Alignment](#alignment)
  - [Edit Mode](#edit-mode)
  - [Vertical Grids](#vertical-grids)
  - [Waffle Grids](#waffle-grids)
  - [Flexbox Grids](#flexbox-grids)
  - [Masonry Support](#masonry-support)
- [Grid Settings](#grid-settings)
- [Mixin Options](#mixin-options)
  - [`edit()`](#edit)
  - [`clearfix()`](#clearfix)
  - [`flex-container()`](#flex-container)
  - [`center()`](#center)
  - [`align()`](#align)
  - [`column()`](#column)
  - [`row()`](#row)
  - [`waffle()`](#waffle)
  - [`offset()`](#offset)
  - [`move()`](#move)
  - [`masonry-wrap()`](#masonry-wrap)
  - [`masonry-column()`](#masonry-column)
- [Usage with Node](#usage-with-node)
- [Example Code](#example-code)
- [Browser Support](#browser-support)
- [Other Projects](#other-projects)
- [Thanks](#thanks)


## Better than X
Lost is better than any grid system out there and can prove it.

Feature | Lost | [Bootstrap](http://getbootstrap.com/css/#grid) | [Foundation](http://foundation.zurb.com/grid.html) | [Jeet](http://jeet.gs/) | [Neat](http://neat.bourbon.io/) | [Susy](http://susy.oddbird.net/)
:-:|:-:|:-:|:-:|:-:|:-:|:-:
[Responsive](https://github.com/corysimmons/lost/wiki/Comparison-Explanation#responsive) | <img src="http://corysimmons.github.io/lost/checkmark.svg"> | <img src="http://corysimmons.github.io/lost/checkmark.svg"> | <img src="http://corysimmons.github.io/lost/checkmark.svg"> | <img src="http://corysimmons.github.io/lost/checkmark.svg"> | <img src="http://corysimmons.github.io/lost/checkmark.svg"> | <img src="http://corysimmons.github.io/lost/checkmark.svg">
[Small learning curve](https://github.com/corysimmons/lost/wiki/Comparison-Explanation#small-learning-curve) | <img src="http://corysimmons.github.io/lost/checkmark.svg"> | <img src="http://corysimmons.github.io/lost/checkmark.svg"> | <img src="http://corysimmons.github.io/lost/checkmark.svg"> | <img src="http://corysimmons.github.io/lost/checkmark.svg"> | <img src="http://corysimmons.github.io/lost/checkmark.svg">
[Easy-to-implement](https://github.com/corysimmons/lost/wiki/Comparison-Explanation#easy-to-implement) | <img src="http://corysimmons.github.io/lost/checkmark.svg"> | <img src="http://corysimmons.github.io/lost/checkmark.svg"> | <img src="http://corysimmons.github.io/lost/checkmark.svg">
[Works with Masonry](https://github.com/corysimmons/lost/wiki/Comparison-Explanation#works-with-masonry) | <img src="http://corysimmons.github.io/lost/checkmark.svg"> | <img src="http://corysimmons.github.io/lost/checkmark.svg"> | <img src="http://corysimmons.github.io/lost/checkmark.svg"> |
[Terse markup](https://github.com/corysimmons/lost/wiki/Comparison-Explanation#terse-markup) | <img src="http://corysimmons.github.io/lost/checkmark.svg"> | | | <img src="http://corysimmons.github.io/lost/checkmark.svg"> | <img src="http://corysimmons.github.io/lost/checkmark.svg"> | <img src="http://corysimmons.github.io/lost/checkmark.svg">
[On-the-fly grids](https://github.com/corysimmons/lost/wiki/Comparison-Explanation#on-the-fly-grids) | <img src="http://corysimmons.github.io/lost/checkmark.svg"> | | | <img src="http://corysimmons.github.io/lost/checkmark.svg"> | <img src="http://corysimmons.github.io/lost/checkmark.svg"> | <img src="http://corysimmons.github.io/lost/checkmark.svg">
[Clean markup](https://github.com/corysimmons/lost/wiki/Comparison-Explanation#clean-markup) | <img src="http://corysimmons.github.io/lost/checkmark.svg"> | | | <img src="http://corysimmons.github.io/lost/checkmark.svg"> | <img src="http://corysimmons.github.io/lost/checkmark.svg"> | <img src="http://corysimmons.github.io/lost/checkmark.svg">
[Real gutters](https://github.com/corysimmons/lost/wiki/Comparison-Explanation#real-gutters) | <img src="http://corysimmons.github.io/lost/checkmark.svg"> | | | <img src="http://corysimmons.github.io/lost/checkmark.svg"> | <img src="http://corysimmons.github.io/lost/checkmark.svg"> | <img src="http://corysimmons.github.io/lost/checkmark.svg">
[Stylus support](https://github.com/corysimmons/lost/wiki/Comparison-Explanation#stylus-support) | <img src="http://corysimmons.github.io/lost/checkmark.svg"> | | | <img src="http://corysimmons.github.io/lost/checkmark.svg">
[LESS support](https://github.com/corysimmons/lost/wiki/Comparison-Explanation#less-support) | <img src="http://corysimmons.github.io/lost/checkmark.svg"> | <img src="http://corysimmons.github.io/lost/checkmark.svg">
[No Additional Ratio Context](https://github.com/corysimmons/lost/wiki/Comparison-Explanation#no-additional-ratio-context) | <img src="http://corysimmons.github.io/lost/checkmark.svg">
[Consistent Horizontal Gutters](https://github.com/corysimmons/lost/wiki/Comparison-Explanation#consistent-horizontal-gutters) | <img src="http://corysimmons.github.io/lost/checkmark.svg">
[Lightweight](https://github.com/corysimmons/lost/wiki/Comparison-Explanation#lightweight) | <img src="http://corysimmons.github.io/lost/checkmark.svg">
[Vertical Grids](https://github.com/corysimmons/lost/wiki/Comparison-Explanation#vertical-grids) | <img src="http://corysimmons.github.io/lost/checkmark.svg">
[Waffle Grids](https://github.com/corysimmons/lost/wiki/Comparison-Explanation#waffle-grids) | <img src="http://corysimmons.github.io/lost/checkmark.svg">
[Fixed Gutters](https://github.com/corysimmons/lost/wiki/Comparison-Explanation#fixed-gutters) | <img src="http://corysimmons.github.io/lost/checkmark.svg">
[Flexbox Grids](https://github.com/corysimmons/lost/wiki/Comparison-Explanation#flexbox-grids) | <img src="http://corysimmons.github.io/lost/checkmark.svg">

<sup>If you notice anything in this table is incorrect or unfair, please don't hesitate to [open an issue](https://github.com/corysimmons/lost/issues/new).</sup>


## Getting Started

##### Installation

Installing Lost is easy. Just `bower install lost-grid` in your project directory, then add `@import '/bower_components/lost-grid/PREPROCESSOR/lost.styl'` to the top of your preprocessor stylesheet.

- To modify global settings, look at the [Grid Settings](#grid-settings) section.
- For Node usage, please check out the [Usage with Node](#usage-with-node) section.

&nbsp;

##### Basic Columns

To create a basic horizontal grid, just insert some columns into any element like so and pass a fraction (**as a string**) to `column()`.

<h6 align="right">HTML</h6>
```html
<section>
  <figure>1</figure>
  <figure>2</figure>
  <figure>3</figure>
  <figure>4</figure>
</section>
```

<h6 align="right">SCSS</h6>
```scss
section {
  @include clearfix;
}

figure {
  @include column('1/2');
}
```

<h6 align="right">LESS</h6>
```less
section {
  .clearfix();
}

figure {
  .column(1 of 2);
}
```

<h6 align="right">Stylus</h6>
```stylus
section
  clearfix()

figure
  column('1/2')
```

`clearfix()` is just a [clearfix](http://nicolasgallagher.com/micro-clearfix-hack/) mixin since grid elements are floated. It's a good idea to give this to the element wrapping your grid elements every time.

&nbsp;

##### Centering Elements

You can also make use of the `center()` mixin to assign a `max-width` and `margin: auto` to an element and center it on the page. `clearfix()` will automatically be applied in this case.

<h6 align="right">SCSS</h6>
```scss
section {
  @include center(980px);
}

figure {
  @include column('1/2');
}
```

<h6 align="right">LESS</h6>
```less
section {
  .center(980px);
}

figure {
  .column(1 of 2);
}
```

<h6 align="right">Stylus</h6>
```stylus
section
  center(980px)

figure
  column('1/2')
```

&nbsp;

##### Controlling Cycle

Every element gets a `float: left` and `margin-right: $gutter` applied to them except the last one in the row. Lost will automatically detect the last item in a row (based on the denominator you passed) and apply a `margin-right: 0` to it by default.

To override this behavior simply pass a `cycle` param to your `column()`.

<h6 align="right">SCSS</h6>
```scss
figure {
  @include column('2/4', $cycle: 2);
}
```

<h6 align="right">LESS</h6>
```less
figure {
  .column(2 of 4, @cycle: 2);
}
```

<h6 align="right">Stylus</h6>
```stylus
figure
  column('2/4', $cycle: 2)
```

&nbsp;

##### Nesting

Nesting is simple and **requires [no extra fractions](https://github.com/corysimmons/lost/wiki/Comparison-Explanation#no-additional-ratio-context)** unlike other preprocessor grid systems.

<h6 align="right">HTML</h6>
```html
<section>
  <figure>a</figure>
  <figure>
    <figure>b</figure>
    <figure>
      <figure>c</figure>
      <figure>c</figure>
    </figure>
  </figure>
</section>
```

<h6 align="right">SCSS</h6>
```scss
figure {
  @include column('1/2');
}
```

<h6 align="right">LESS</h6>
```less
figure {
  .column(1 of 2);
}
```

<h6 align="right">Stylus</h6>
```stylus
figure
  column('1/2')
```

&nbsp;

##### Offseting Elements

You can `offset` columns easily. To offset in the other direction, pass a negative fraction.

<h6 align="right">HTML</h6>
```html
<section>
  <figure>1</figure>
  <figure>2</figure>
</section>
```

<h6 align="right">SCSS</h6>
```scss
figure {
  @include column('1/3');
  &:first-child {
    @include offset('1/3');
  }
}
```

<h6 align="right">LESS</h6>
```less
figure {
  .column(1 of 3);
  &:first-child {
    .offset(1 of 3);
  }
}
```

<h6 align="right">Stylus</h6>
```stylus
figure
  column('1/3')
  &:first-child
    offset('1/3')
```

&nbsp;

##### Alignment

Easily align children elements with the `align()` mixin. It accepts options like `top-left`, `right`, `center`, [etc](#align).

<h6 align="right">HTML</h6>
```html
<section>
  <figure>Aligned</figure>
</section>
```

<h6 align="right">SCSS</h6>
```scss
section {
  @include align;
  width: 600px;
  height: 400px;
}

figure {
  width: 100px;
  height: 100px;
}
```

<h6 align="right">LESS</h6>
```less
section {
  .align();
  width: 600px;
  height: 400px;
}

figure {
  width: 100px;
  height: 100px;
}
```

<h6 align="right">Stylus</h6>
```stylus
section
  align()
  width: 600px
  height: 400px

figure
  width: 100px
  height: 100px
```

&nbsp;

##### Edit Mode

Use the `edit()` mixin at base level to visualize the entire structure of your site, or just specify the areas you're working on. You can pass it any color (pick a darkish one because `edit()` will lighten it).

<h6 align="right">HTML</h6>
```html
<section>
  <figure>1</figure>
  <figure>2</figure>
  <figure>3</figure>
</section>

<section>
  <figure>4</figure>
  <figure>5</figure>
  <figure>6</figure>
</section>
```

<h6 align="right">SCSS</h6>
```scss
section {
  &:nth-of-type(1) {
    @include edit;
  }
  &:nth-of-type(2) {
    @include edit(green);
  }
}
```

<h6 align="right">LESS</h6>
```less
section {
  &:nth-of-type(1) {
    .edit();
  }
  &:nth-of-type(2) {
    .edit(green);
  }
}
```

<h6 align="right">Stylus</h6>
```stylus
section
  &:nth-of-type(1)
    edit()
  &:nth-of-type(2)
    edit(green)
```

&nbsp;

##### Vertical Grids

Once you've mastered the basic horizontal grid system (it shouldn't take long), you can start to make vertical grids that have the same vertical gutters as your horizontal grids. Just use the `row()` mixin in place of `column()`. These rows will stretch to fill their container's height, so if you'd like to see them take up the full height of the page, set `height: 100%` on your container.

No other grid system in the world supports vertical grids.

<h6 align="right">HTML</h6>
```html
<section>
  <figure>1</figure>
  <figure>2</figure>
  <figure>3</figure>
</section>
```

<h6 align="right">SCSS</h6>
```scss
section {
  height: 100%;
}

figure {
  @include row('1/3');
}
```

<h6 align="right">LESS</h6>
```less
section {
  height: 100%;
}

figure {
  .row(1 of 3);
}
```

<h6 align="right">Stylus</h6>
```stylus
section
  height: 100%

figure
  row('1/3')
```

&nbsp;

##### Waffle Grids

You can even make a horizontal/vertical grid (a **waffle grid**) which resembles a tic-tac-toe board.

<h6 align="right">HTML</h6>
```html
<section>
  <figure>1</figure>
  <figure>2</figure>
  <figure>3</figure>
  <figure>4</figure>
  <figure>5</figure>
  <figure>6</figure>
  <figure>7</figure>
  <figure>8</figure>
  <figure>9</figure>
</section>
```

<h6 align="right">SCSS</h6>
```scss
section {
  height: 100%;
}

figure {
  @include waffle('1/3');
}
```

<h6 align="right">LESS</h6>
```less
section {
  height: 100%;
}

figure {
  .waffle(1 of 3);
}
```

<h6 align="right">Stylus</h6>
```stylus
section
  height: 100%

figure
  waffle('1/3')
```

&nbsp;

##### Flexbox Grids

You can easily change your grids to support Flexbox by altering the global variable: `$flexbox` to `true`. Once you do this, all grids throughout your site will use flexed elements. To make sure they are displayed as flexed elements, you need to wrap them in `flex-container()` or `center()` (which includes `flex-container()` by default).

<h6 align="right">HTML</h6>
```html
<section>
  <figure>1</figure>
  <figure>2</figure>
  <figure>3</figure>
</section>
```

<h6 align="right">SCSS</h6>
```scss
$flexbox: true;

section {
  @include center();
}

figure {
  @include column('1/3');
}
```

<h6 align="right">LESS</h6>
```less
@flexbox: true;

section {
  .center();
}

figure {
  .column(1 of 3);
}
```

<h6 align="right">Stylus</h6>
```stylus
$flexbox = true

section
  center()

figure
  column('1/3')
```

Flexbox offers cleaner output and avoids the use of `clearfix` and other issues with float-based layouts. It also allows you to have elements of even height rather easily, and [much more](https://github.com/philipwalton/flexbugs/issues/32#issuecomment-90789645). The downside is, Flexbox doesn't work in IE9 or below, so keep that in mind if you have a client that needs that kind of support.

Also note that waffle grids work well for the most part, but are somewhat finicky in fringe situations where Flexbox tries to act smarter than it is. All mixins provide a way to disable or enable Flexbox per element with the `flex` parameter.


&nbsp;

##### Masonry Support

Lost supports masonry plugins like [Isotope](http://isotope.metafizzy.co/). To accomplish this we need to change how the margins work. Instead of applying a `margin-right` to everything, we need to apply it to both sides. We've made a couple special mixins to help with this: `masonry-column()` which creates a margin on the left and right of each element it's applied to, and `masonry-wrap()` which wraps your columns and applies a negative margin to the left and right to them to help line them up with containing elements.

<h6 align="right">HTML</h6>
```html
<section>
  <figure>1</figure>
  <figure>2</figure>
  <figure>3</figure>
</section>
```

<h6 align="right">SCSS</h6>
```scss
section {
  @include masonry-wrap;
}

figure {
  @include masonry-column('1/3');
}
```

<h6 align="right">LESS</h6>
```less
section {
  .masonry-wrap();
}

figure {
  .masonry-column(1 of 3);
}
```

<h6 align="right">Stylus</h6>
```stylus
section
  masonry-wrap()

figure
  masonry-column('1/3')
```


## Grid Settings

Just set either of these in a settings file after you `@import` Lost and before you use a Lost mixin.

<h6 align="right">SCSS</h6>
- `$gutter: 30px !default;`
- `$rtl: false !default;`

<h6 align="right">LESS</h6>
- `@gutter: 30px;`
- `@rtl: false;`

<h6 align="right">Stylus</h6>
- `$gutter = 30px`
- `$rtl = false`


## Mixin Options

##### `edit()`
Sets a translucent background color to all elements it affects. Helpful while setting up, or debugging, the structure of your site to make sure all items are cleared correctly.

- `$bg: blue` - A color to be lightened, so make sure you pick a darkish color.

<h6 align="right">SCSS</h6>
```scss
section {
  @include edit(red);
}
```

<h6 align="right">LESS</h6>
```less
section {
  .edit(red);
}
```

<h6 align="right">Stylus</h6>
```stylus
section
  edit(red)
```

&nbsp;

##### `clearfix()`
Clearfix used to clear floated children elements. http://nicolasgallagher.com/micro-clearfix-hack

<h6 align="right">SCSS</h6>
```scss
.parent {
  @include clearfix;
  .child {
    @include column('1/2');
  }
}
```

<h6 align="right">LESS</h6>
```less
.parent {
  .clearfix();
  .child {
    .column(1 of 2);
  }
}
```

<h6 align="right">Stylus</h6>
```stylus
.parent
  clearfix()
  .child
    column('1/2')
```

&nbsp;

##### `flex-container()`
Creates a Flexbox container.

- `$direction: row` - The flex-direction the container should create. This is typically opposite to the element you're creating so a `row()` would need `flex-container(column)`.

<h6 align="right">SCSS</h6>
```scss
$flexbox: true;

section {
  @include flex-container();
  figure {
    @include column('1/2');
  }
}
```

<h6 align="right">LESS</h6>
```less
@flexbox: true;

section {
  .flex-container();
  figure {
    .column('1/2');
  }
}
```

<h6 align="right">Stylus</h6>
```stylus
$flexbox = true

section
  flex-container()
  figure
    column('1/2')
```

&nbsp;

##### `center()`
Horizontally center a container element and apply padding to it.

- `$max-size: 1140px` - A max-width to assign. Can be any unit.
- `$pad: 0` - Padding on the left and right of the element. Can be any unit.
- `$flex: $flexbox` - Determines whether this element should use Flexbox or not.

<h6 align="right">SCSS</h6>
```scss
section {
  @include center(900px);
}
```

<h6 align="right">LESS</h6>
```less
section {
  .center(900px);
}
```

<h6 align="right">Stylus</h6>
```stylus
section
  center(900px)
```

&nbsp;

##### `align()`
Align nested elements.

- `$location: middle-center` - The position the nested element takes relative to the containing element.
  - reset
  - top-left
  - top-center or top
  - top-right
  - middle-left or left
  - middle-right or right
  - bottom-left
  - bottom-center or bottom
  - bottom-right
- `$flex: $flexbox` - Determines whether this element should use Flexbox or not.

<h6 align="right">SCSS</h6>
```scss
.parent {
  @include align(right);
  width: 600px;
  height: 400px;
  .child {
    width: 300px;
    height: 150px;
  }
}
```

<h6 align="right">LESS</h6>
```less
.parent {
  .align(right);
  width: 600px;
  height: 400px;
  .child {
    width: 300px;
    height: 150px;
  }
}
```

<h6 align="right">Stylus</h6>
```stylus
.parent
  align(right)
  width: 600px
  height: 400px
  .child
    width: 300px
    height: 150px
```

&nbsp;

##### `column()`
Creates a column that is a fraction of the size of it's containing element with a gutter. You don't need to pass any additional ratios (fractions) as the grid system will make use of calc(). Note that fractions must always be wrapped in quotes.

- `$fraction: '1/1'` - This is a simple fraction of the containing element's width. This must be a string written as a fraction.
- `$cycle: DENOMINATOR` - Lost works by assigning a margin-right to all elements except the last in the row. It does this by default by using the denominator of the fraction you pick. To override this default use this param. e.g. column('2/4', $cycle: 2)
- `$gut: $gutter` - The margin on the right side of the element used to create a gutter. Typically this is left alone and the global $gutter will be used, but you can override it here if you want certain elements to have a particularly large or small gutter (pass 0 for no gutter at all).
- `$flex: $flexbox` - Determines whether this element should use Flexbox or not.

<h6 align="right">SCSS</h6>
```scss
figure {
  @include column('1/3');
}
```

<h6 align="right">LESS</h6>
```less
figure {
  .column(1 of 3);
}
```

<h6 align="right">Stylus</h6>
```stylus
figure
  column('1/3')
```

&nbsp;

##### `row()`
Creates a row that is a fraction of the size of it's containing element with a gutter. You don't need to pass any additional ratios (fractions) as the grid system will make use of calc(). Note that fractions must always be wrapped in quotes.

- `$fraction: '1/1'` - This is a simple fraction of the containing element's height. This must be a string written as a fraction.
- `$gut: $gutter` - The margin on the bottom of the element used to create a gutter. Typically this is left alone and the global $gutter will be used, but you can override it here if you want certain elements to have a particularly large or small gutter (pass 0 for no gutter at all).
- `$flex: $flexbox` - Determines whether this element should use Flexbox or not.

<h6 align="right">SCSS</h6>
```scss
figure {
  @include row('1/3');
}
```

<h6 align="right">LESS</h6>
```less
figure {
  .row(1 of 3);
}
```

<h6 align="right">Stylus</h6>
```stylus
figure
  row('1/3')
```

&nbsp;

##### `waffle()`
Creates a block that is a fraction of the size of it's containing element with a gutter on the right and bottom. You don't need to pass any additional ratios (fractions) as the grid system will make use of calc(). Note that fractions must always be wrapped in quotes.

- `$fraction: '1/1'` - This is a simple fraction of the containing element's width/height. This must be a string written as a fraction.
- `$cycle: DENOMINATOR` - Lost works by assigning a margin-right/bottom to all elements except the last row (no margin-bottom) and the last column (no margin-right). It does this by default by using the denominator of the fraction you pick. To override this default use this param. e.g. waffle('2/4', $cycle: 2)
- `$gut: $gutter` - The margin on the right and bottom side of the element used to create a gutter. Typically this is left alone and the global $gutter will be used, but you can override it here if you want certain elements to have a particularly large or small gutter (pass 0 for no gutter at all).
- `$flex: $flexbox` - Determines whether this element should use Flexbox or not.

<h6 align="right">SCSS</h6>
```scss
figure {
  @include waffle('1/3');
}
```

<h6 align="right">LESS</h6>
```less
figure {
  .waffle(1 of 3);
}
```

<h6 align="right">Stylus</h6>
```stylus
figure
  waffle('1/3')
```

&nbsp;

##### `offset()`
Margin to the left, right, bottom, or top, of an element depending on if the fraction passed is positive or negative. It works for both horizontal and vertical grids but not both.

- `$fraction: '1/1'` - Fraction of the container to be offset. Must be a string.
- `$dir: row` - Direction the grid is going. Should be the opposite of the column() or row() it's being used on.
- `$gut: $gutter` - How large the gutter involved is, typically this won't be adjusted, but if you have set the elements for that container to have different gutters than default, you will need to match that gutter here as well.

<h6 align="right">SCSS</h6>
```scss
.two-elements {
  @include column('1/3');
  &:first-child {
    @include offset('1/3');
  }
}
```

<h6 align="right">LESS</h6>
```less
.two-elements {
  .column(1 of 3);
  &:first-child {
    .offset(1 of 3);
  }
}
```

<h6 align="right">Stylus</h6>
```stylus
.two-elements
  column('1/3')
  &:first-child
    offset('1/3')
```

&nbsp;

##### `move()`
Source ordering. Shift elements left, right, up, or down, by their left or top position by passing a positive or negative fraction.

- `$fraction: '1/1'` - Fraction of the container to be shifted. Must be a string.
- `$dir: row` - Direction the grid is going. Should be the opposite of the column() or row() it's being used on.
- `$gut: $gutter` - Adjust the size of the gutter for this movement. Should match the element's $gut.

<h6 align="right">SCSS</h6>
```scss
figure {
  @include column('1/3');
  @include move('1/3');
}
```

<h6 align="right">LESS</h6>
```less
figure {
  .column(1 of 3);
  .move(1 of 3);
}
```

<h6 align="right">Stylus</h6>
```stylus
figure
  column('1/3')
  move('1/3')
```

&nbsp;

##### `masonry-wrap()`
Creates a wrapping element for working with JS masonry libraries like Isotope. Assigns a negative margin on each side of this wrapping element.

- `$gut: $gutter` - How large the gutter involved is, typically this won't be adjusted and will inherit the global $gutter setting, but it's made available if you want your masonry grid to have a special $gut, it should match your masonry-column's $gut.
- `$flex: $flexbox` - Determines whether this element should use Flexbox or not.


##### `masonry-column()`
Creates a column for working with JS masonry libraries like Isotope. Assigns a margin to each side of the element.

- `$gut: $gutter` - How large the gutter involved is, typically this won't be adjusted and will inherit the global $gutter setting, but it's made available if you want your masonry grid to have a special $gut, it should match your masonry-row's $gut.
- `$flex: $flexbox` - Determines whether this element should use Flexbox or not.

<h6 align="right">SCSS</h6>
```scss
section {
  @include masonry-wrap;
}
figure {
  @include masonry-column('1/3');
}
```

<h6 align="right">LESS</h6>
```less
section {
  .masonry-wrap();
}
figure {
  .masonry-column(1 of 3);
}
```

<h6 align="right">Stylus</h6>
```stylus
section
  masonry-wrap()
figure
  masonry-column('1/3')
```


## Usage with Node
- `npm i lost-grid --save-dev`

<h6 align="right">JavaScript</h6>
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

<h6 align="right">Stylus</h6>
```stylus
@import 'lost'

$gutter = 20px

figure
  column('1/3')
```


## Example Code

- https://github.com/corysimmons/lost/tree/gh-pages


## Browser Support

- [`calc()` grids](https://webdesign.tutsplus.com/tutorials/calc-grids-are-the-best-grids--cms-22902) work perfect on IE9+ with poor support on old Android browsers ([`calc()` browser support](http://caniuse.com/#feat=calc)).


### Other Projects

If you like this project then I encourage you to check out a few of my other hand-selected projects.

- [Boy](https://github.com/corysimmons/boy) - A super lightweight, old-browser-friendly, HTML5 boilerplate with tons of features that make it a great start to any project.
- [Typographic](https://github.com/corysimmons/typographic) - Insanely powerful yet easy-to-use responsive typography. Includes vertical rhythm, font stacks, modular scale, and more.
- [lost-grid.js](https://github.com/corysimmons/lost-grid.js) - A purely JavaScript version of Lost v1. You can create your grid system directly in your markup without ever touching a line of preprocessor code. A pretty cool **concept**.


### Thanks

- [Alex Bass](http://abass.co) for being my friend during this process and letting me bounce every idea off you.
- [Maria Keller](https://dribbble.com/mariakeller) for the amazing logo. Be sure to hire her for all your design and motion graphic needs.
- [Hugo Giraudel](https://twitter.com/HugoGiraudel) for contributions to code quality and for polyfilling Sass.
- [Roman Komarov](https://twitter.com/kizmarh) for helping with Stylus hiccups.
- [Huy Hong](https://twitter.com/huy) for helping with Sass hiccups.
- Everyone who files an [Issue](https://github.com/corysimmons/lost/issues) when something isn't working as expected.
- Everyone who is *actually* interested in my work on grids.
