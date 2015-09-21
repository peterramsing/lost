<p align="center">
  <img src="http://corysimmons.github.io/lost/lost-grid.svg">
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/lost"><img src="https://img.shields.io/npm/v/lost.svg?style=flat-square"></a>
  <a href="https://github.com/corysimmons/lost/stargazers"><img src="http://img.shields.io/npm/dm/lost.svg?style=flat-square"></a>
  <a href="https://gitter.im/corysimmons/lost"><img src="https://badges.gitter.im/Join%20Chat.svg"></a>
</p>

Lost Grid is a powerful grid system built in [PostCSS](https://github.com/postcss/postcss) that works with any preprocessor and even vanilla CSS. You can think of it like the [Autoprefixer](https://github.com/postcss/autoprefixer) of grid systems.

It is built upon years of studying and [building](http://jeet.gs) grid systems with **tons** of community feedback.

It makes use of [`calc()`](https://webdesign.tutsplus.com/tutorials/calc-grids-are-the-best-grids--cms-22902) to create stunning grids based on fractions you define without having to pass a ton of options.

I can tell you with no ego, this is [my finest grid](https://www.youtube.com/watch?v=EnjtQQQaDKo).


## Table of Contents
- [Installation](https://github.com/corysimmons/lost/wiki/Installation)
- [Comparison Table](#better-than-x)
- [Getting Started](#getting-started)
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
- [Global Grid Settings](#global-grid-settings)
- [Property Options](#property-options)
  - [`lost-utility`](#lost-utility)
  - [`lost-flex-container`](#lost-flex-container)
  - [`lost-center`](#lost-center)
  - [`lost-align`](#lost-align)
  - [`lost-column`](#lost-column)
  - [`lost-row`](#lost-row)
  - [`lost-waffle`](#lost-waffle)
  - [`lost-offset`](#lost-offset)
  - [`lost-move`](#lost-move)
  - [`lost-masonry-wrap`](#lost-masonry-wrap)
  - [`lost-masonry-column`](#lost-masonry-column)
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
[Sass support](https://github.com/corysimmons/lost/wiki/Comparison-Explanation#sass-support) | <img src="http://corysimmons.github.io/lost/checkmark.svg"> | <img src="http://corysimmons.github.io/lost/checkmark.svg"> | <img src="http://corysimmons.github.io/lost/checkmark.svg"> | <img src="http://corysimmons.github.io/lost/checkmark.svg"> | <img src="http://corysimmons.github.io/lost/checkmark.svg"> | <img src="http://corysimmons.github.io/lost/checkmark.svg">
[Stylus support](https://github.com/corysimmons/lost/wiki/Comparison-Explanation#stylus-support) | <img src="http://corysimmons.github.io/lost/checkmark.svg"> | | | <img src="http://corysimmons.github.io/lost/checkmark.svg">
[LESS support](https://github.com/corysimmons/lost/wiki/Comparison-Explanation#less-support) | <img src="http://corysimmons.github.io/lost/checkmark.svg"> | <img src="http://corysimmons.github.io/lost/checkmark.svg">
[CSS support](https://github.com/corysimmons/lost/wiki/Comparison-Explanation#css-support) | <img src="http://corysimmons.github.io/lost/checkmark.svg"> | <img src="http://corysimmons.github.io/lost/checkmark.svg"> | <img src="http://corysimmons.github.io/lost/checkmark.svg">
[No Additional Ratio Context](https://github.com/corysimmons/lost/wiki/Comparison-Explanation#no-additional-ratio-context) | <img src="http://corysimmons.github.io/lost/checkmark.svg"> | <img src="http://corysimmons.github.io/lost/checkmark.svg"> | <img src="http://corysimmons.github.io/lost/checkmark.svg">
[Consistent Gutters on All Sides](https://github.com/corysimmons/lost/wiki/Comparison-Explanation#consistent-gutters-on-all-sides) | <img src="http://corysimmons.github.io/lost/checkmark.svg">
[Lightweight](https://github.com/corysimmons/lost/wiki/Comparison-Explanation#lightweight) | <img src="http://corysimmons.github.io/lost/checkmark.svg">
[Vertical Grids](https://github.com/corysimmons/lost/wiki/Comparison-Explanation#vertical-grids) | <img src="http://corysimmons.github.io/lost/checkmark.svg">
[Waffle Grids](https://github.com/corysimmons/lost/wiki/Comparison-Explanation#waffle-grids) | <img src="http://corysimmons.github.io/lost/checkmark.svg">
[Fixed Gutters](https://github.com/corysimmons/lost/wiki/Comparison-Explanation#fixed-gutters) | <img src="http://corysimmons.github.io/lost/checkmark.svg">
[Flexbox Grids](https://github.com/corysimmons/lost/wiki/Comparison-Explanation#flexbox-grids) | <img src="http://corysimmons.github.io/lost/checkmark.svg">

<sup>If you notice anything in this table is incorrect or unfair, please don't hesitate to [open an issue](https://github.com/corysimmons/lost/issues/new).</sup>

**[⬆ back to top](#table-of-contents)**

&nbsp;

### Getting Started

Lost Grid rules look like this:

```css
div {
  lost-column: 1/3;
}
```

And the processed CSS looks like this:

```css
div {
  width: calc(99.99% * 1/3 - (30px - 30px * 1/3));
}
div:nth-child(n) {
  float: left;
  margin-right: 30px;
  clear: none;
}
div:last-child {
  margin-right: 0;
}
div:nth-child(3n) {
  float: right;
  margin-right: 0;
}
div:nth-child(3n + 1) {
  clear: left;
}

/*# sourceMappingURL=style.css.map */
```

**[⬆ back to top](#table-of-contents)**

&nbsp;

##### Basic Columns

To create a basic horizontal grid, just insert some elements into any containing element like so and pass a fraction to the `lost-column` property.

```html
<section>
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</section>
```

```css
section {
  lost-utility: clearfix;
}

div {
  lost-column: 1/2;
}
```

`lost-utility: clearfix;` is just a [clearfix](http://nicolasgallagher.com/micro-clearfix-hack/) function since Lost Grid elements are floated. It's a good idea to give this to the element wrapping your grid elements every time you have nested floated elements.

**[⬆ back to top](#table-of-contents)**

&nbsp;

##### Centering Elements

You can also make use of the `lost-center` property to assign a `max-width` and `margin: auto` to an element and center it on the page. `clearfix` will automatically be applied in this case.

```css
section {
  lost-center: 980px;
}

div {
  lost-column: 1/2;
}
```

**[⬆ back to top](#table-of-contents)**

&nbsp;

##### Controlling Cycle

Every element gets a `float: left` and `margin-right: gutter` applied to it except the last element in the row and the last item in a container. Lost will automatically detect the last item in a row (based on the denominator you passed) and apply a `margin-right: 0` to it by default.

To override this behavior and tell Lost to apply `margin-right: 0` to a specific iteration, simply pass a `cycle` param to your `lost-column` property. It's the second argument.

```css
div {
  lost-column: 2/4 2;
}
```

This will tell Lost to create `div:nth-child(2n) { margin-right: 0; }` *instead* of `div:nth-child(4n) { margin-right: 0; }` (like it would by default and break).

Using this knowledge we can create really flexible layouts with varying widths like so (this will work for a single row nicely).

```html
<section class="row">
  <div class="quarter">1</div>
  <div class="half">2</div>
  <div class="quarter">3</div>
</section>
```

```css
.row {
  lost-utility: clearfix;
}

.quarter {
  lost-column: 1/4 0;
}

.half {
  lost-column: 1/2 0;
}
```

There is a global setting to disable/enable `cycle` by default. Just put `@lost cycle auto;` or `@lost cycle none;` at the top of your stylesheet.

It's suggested that you learn the Lost shorthand syntax, but you can specify cycle (and other params) the verbose way with `lost-column-cycle`.

```css
div {
  lost-column: 2/6;
  lost-column-cycle: 3;
}
```

The concept of `cycle` is **extremely important** to Lost and what sets good Lost developers apart from great Lost developers. Really try to grok this!

**[⬆ back to top](#table-of-contents)**

&nbsp;

##### Nesting

Nesting is simple and **requires [no extra context](https://github.com/corysimmons/lost/wiki/Comparison-Explanation#no-additional-ratio-context)** unlike other preprocessor grid systems.

```html
<section>
  <div>a</div>
  <div>
    <div>b</div>
    <div>
      <div>c</div>
      <div>c</div>
    </div>
  </div>
</section>
```

```css
div {
  lost-column: 1/2;
}
```

**[⬆ back to top](#table-of-contents)**

&nbsp;

##### Offseting Elements

You can `offset` columns easily. To offset in the other direction, pass a negative fraction.

```html
<section>
  <div>1</div>
  <div>2</div>
</section>
```

```css
div {
  lost-column: 1/3;
}

div:first-child {
  lost-offset: 1/3;
}
```

**[⬆ back to top](#table-of-contents)**

&nbsp;

##### Alignment

Easily align children elements with the `lost-align` property. It accepts options like `top-left`, `right`, `center`, [etc.](#lost-align).

```html
<section>
  <div>Aligned</div>
</section>
```

```css
section {
  lost-align: center;
  width: 600px;
  height: 400px;
}

div {
  width: 100px;
  height: 100px;
}
```

**[⬆ back to top](#table-of-contents)**

&nbsp;

##### Edit Mode

Use `lost-utility: edit;` on `body` to visualize the entire structure of your site, or just specify the areas you're working on.

```html
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
```

```css
section:nth-of-type(1) {
  lost-utility: edit;
}

section:nth-of-type(2) {
  lost-utility: edit;
}
```

**[⬆ back to top](#table-of-contents)**

&nbsp;

##### Vertical Grids

Once you've mastered the basic horizontal grid system (it shouldn't take long), you can start to make vertical grids that have the same vertical gutters as your horizontal grids. Just use the `lost-row` property in place of `lost-column`. These rows will stretch to fill their container's height, so if you'd like to see them take up the full height of the page, set `height: 100%` on your container.

No other grid system supports vertical grids.

```html
<section>
  <div>1</div>
  <div>2</div>
  <div>3</div>
</section>
```

```css
section {
  height: 100%;
}

div {
  lost-row: 1/3;
}
```

**[⬆ back to top](#table-of-contents)**

&nbsp;

##### Waffle Grids

You can even make a horizontal/vertical grid (a ***waffle grid***) which resembles a tic-tac-toe board.

```html
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
```

```css
section {
  height: 100%;
}

div {
  lost-waffle: 1/3;
}
```

**[⬆ back to top](#table-of-contents)**

&nbsp;

##### Flexbox Grids

You can easily change your grids to support Flexbox by altering the global at-rule variable `@lost flexbox` to `flex`. Once you do this, all grids throughout your site will use flexed elements. To make sure they are displayed as flexed elements, you need to wrap them in `lost-flex-container` or `lost-center` (which includes `lost-flex-container` by default).

```html
<section>
  <div>1</div>
  <div>2</div>
  <div>3</div>
</section>
```

```css
@lost flexbox flex;

section {
  lost-center: 980px;
}

div {
  lost-column: 1/3;
}
```

Flexbox offers slightly cleaner output and avoids the use of `clearfix` and other issues with float-based layouts. It also allows you to have elements of even height rather easily, and [much more](https://github.com/philipwalton/flexbugs/issues/32#issuecomment-90789645). The downside is, Flexbox doesn't work in IE9 or below, so keep that in mind if you have a client that needs that kind of support.

Also note that waffle grids work well for the most part, but are somewhat finicky in fringe situations where Flexbox tries to act smarter than it is. All properties provide a way to disable or enable Flexbox per element with the `flex` parameter so if you'd like to disable it for a specific case you could do this:

```html
<section>
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
  <div>5</div>
</section>
```

```css
@lost flexbox flex;

section {
  lost-center: 980px no-flex;
}

div {
  lost-waffle: 1/3 no-flex;
}
```

**[⬆ back to top](#table-of-contents)**

&nbsp;

##### Masonry Support

Lost supports masonry plugins like [Isotope](http://isotope.metafizzy.co/). To accomplish this we need to change how the margins work. Instead of applying a `margin-right` to everything, we need to apply it to both sides. We've made a couple special properties to help with this: `lost-masonry-column` which creates a margin on the left and right of each element it's applied to, and `lost-masonry-wrap` which wraps your columns and applies a negative margin to the left and right to them to help line them up with containing elements.

```html
<section>
  <div>1</div>
  <div>2</div>
  <div>3</div>
</section>
```

```css
section {
  lost-masonry-wrap: no-flex;
}

div {
  lost-masonry-column: 1/3;
}
```

**[⬆ back to top](#table-of-contents)**

&nbsp;

## Global Grid Settings

Lost uses PostCSS which means to override global variables we need to use something called "at-rules". They're easy enough. Just define them at the top of your stylesheet and you're good to go.

```css
@lost gutter 60px;
@lost flexbox flex;
@lost cycle none;

.foo {
  ...
}
```

- `gutter` accepts any unit value. `30px` by default.
- `flexbox` accepts `flex` or `no-flex` (default).
- `cycle` accepts `none` or any digit (although this is really weird). `auto` by default.

**[⬆ back to top](#table-of-contents)**

&nbsp;

## Property Options

#### lost-utility
A general utility toolbelt for Lost. Included are mixins that require no additional input other than being called.

- `edit|clearfix` - The mixin to create.

```css
section {
  lost-utility: edit;
}
```

**[⬆ back to top](#table-of-contents)**

&nbsp;

#### lost-flex-container
Creates a Flexbox container.

- `row|column` - The flex-direction the container should create. This is typically opposite to the element you're creating so a row would need `lost-flex-container: column;`.

```css
section {
  lost-flex-container: row;
}

div {
  lost-column: 1/2 flex;
}
```

**[⬆ back to top](#table-of-contents)**

&nbsp;

#### lost-center
Horizontally center a container element and apply padding to it.

- `max-width` - A max-width to assign. Can be any unit.
- `padding` - Padding on the left and right of the element. Can be any unit.
- `flex|no-flex` - Determines whether this element should use Flexbox or not.

```css
section {
  lost-center: 980px;
}

section {
  lost-center: 1140px 30px flex;
}
```

**[⬆ back to top](#table-of-contents)**

&nbsp;

#### lost-align
Align nested elements. Apply this to a parent container.

- `reset|horizontal|vertical|top-left|top-center|top|top-right|middle-left|left|middle-center|center|middle-right|right|bottom-left|bottom-center|bottom|bottom-right` - The position the nested element takes relative to the containing element.
- `flex|no-flex` - Determines whether this element should use Flexbox or not.

```css
.parent {
  lost-align: right;
  width: 600px;
  height: 400px;
}

.child {
  width: 300px;
  height: 150px;
}
```

**[⬆ back to top](#table-of-contents)**

&nbsp;

#### lost-column
Creates a column that is a fraction of the size of its containing element's width with a gutter.

- `fraction` - This is a simple fraction of the containing element's width.
- `cycle` - Lost works by assigning a margin-right to all elements except the last in the row. It does this by default by using the denominator of the fraction you pick. To override the default use this param., e.g.: .foo { lost-column: 2/4 2; }
- `gutter` - The margin on the right side of the element used to create a gutter. Typically this is left alone and settings.gutter will be used, but you can override it here if you want
certain elements to have a particularly large or small gutter (pass 0 for no gutter at all).
- `flex|no-flex` - Determines whether this element should use Flexbox or not.

```css
div {
  lost-column: 1/3;
}

div {
  lost-column: 2/6 3 60px flex;
}
```

**[⬆ back to top](#table-of-contents)**

&nbsp;

#### lost-row
Creates a row that is a fraction of the size of its containing element's height with a gutter.

- `fraction` - This is a simple fraction of the containing element's height.
- `gutter` - The margin on the bottom of the element used to create a gutter. Typically this is left alone and settings.gutter will be used, but you can override it here if you want certain elements to have a particularly large or small gutter (pass 0 for no gutter at all).
- `flex|no-flex` - Determines whether this element should use Flexbox or not.

```css
section {
  height: 100%;
}

div {
  lost-row: 1/3;
}
```

**[⬆ back to top](#table-of-contents)**

&nbsp;

#### lost-waffle
Creates a block that is a fraction of the size of its containing element's width AND height with a gutter on the right and bottom.

- `fraction` - This is a simple fraction of the containing element's width and height.
- `cycle` - Lost works by assigning a margin-right/bottom to all elements except the last row (no margin-bottom) and the last column (no margin-right). It does this by default by using the denominator of the fraction you pick. To override this default use this param., e.g.: .foo { lost-waffle: 2/4 2; }
- `gutter` - The margin on the right and bottom side of the element used to create a gutter. Typically this is left alone and the global $gutter will be used, but you can override it here if you want certain elements to have a particularly large or small gutter (pass 0 for no gutter at all).
- `flex|no-flex` - Determines whether this element should use Flexbox or not.

```css
section {
  height: 100%;
}

div {
  lost-waffle: 1/3;
}
```

**[⬆ back to top](#table-of-contents)**

&nbsp;

#### lost-offset
Margin to the left, right, bottom, or top, of an element depending on if the fraction passed is positive or negative. It works for both horizontal and vertical grids but not both.

- `fraction` - Fraction of the container to be offset.
- `row|column` - Direction the grid is going. Should be the opposite of the column or row it's being used on. Defaults to row.
- `gutter` - How large the gutter involved is, typically this won't be adjusted, but if you have set the elements for that container to have different gutters than default, you will need to match that gutter here as well.

```css
.two-elements {
  lost-column: 1/3;
}

.two-elements:first-child {
  lost-offset: 1/3;
}
```

**[⬆ back to top](#table-of-contents)**

&nbsp;

#### lost-move
Source ordering. Shift elements left, right, up, or down, by their left or top position by passing a positive or negative fraction.

- `fraction` - Fraction of the container to be shifted.
- `row|column` - Direction the grid is going. Should be the opposite of the column or row it's being used on.
- `gutter` - Adjust the size of the gutter for this movement. Should match the element's gutter.

```css
div {
  lost-column: 1/2;
}

div:first-child {
  lost-move: 1/2;
}

div:last-child {
  lost-move: -1/2;
}
```

**[⬆ back to top](#table-of-contents)**

&nbsp;

#### lost-masonry-wrap
Creates a wrapping element for working with JS Masonry libraries like Isotope. Assigns a negative margin on each side of this wrapping element.

- `flex|no-flex` - Determines whether this element should use Flexbox or not.
- `gutter` - How large the gutter involved is, typically this won't be adjusted and will inherit settings.gutter, but it's made available if you want your masonry grid to have a special gutter, it should match your masonry-column's gutter.

```css
section {
  lost-masonry-wrap: no-flex;
}

div {
  lost-masonry-column: 1/3;
}
```

**[⬆ back to top](#table-of-contents)**

&nbsp;

#### lost-masonry-column
Creates a column for working with JS masonry libraries like Isotope. Assigns a margin to each side of the element.

- `gutter` - How large the gutter involved is, typically this won't be adjusted and will inherit settings.gutter, but it's made available if you want your masonry grid to have a special gutter, it should match your masonry-row's gutter.
- `flex|no-flex` - Determines whether this element should use Flexbox or not.

```css
section {
  lost-masonry-wrap: flex 60px;
}

div {
  lost-masonry-column: 1/3 60px flex;
}
```

**[⬆ back to top](#table-of-contents)**

&nbsp;

## Example Code

- https://github.com/corysimmons/lost/tree/gh-pages

**[⬆ back to top](#table-of-contents)**

&nbsp;

## Browser Support

- [`calc()` grids](https://webdesign.tutsplus.com/tutorials/calc-grids-are-the-best-grids--cms-22902) work perfect on IE9+ with poor support on old Android browsers ([`calc()` browser support](http://caniuse.com/#feat=calc)).
- With some polyfills (like the ones included in [Boy](https://github.com/corysimmons/boy)) Lost works perfect in IE8 as well.
- The Flexbox version of Lost only works with browsers that support Flexbox (IE10+). Unfortunately, there isn't currently a good Flexbox polyfill. [Flexbox browser support](http://caniuse.com/#feat=flexbox)

**[⬆ back to top](#table-of-contents)**

&nbsp;

### Other Projects

If you like this project then I encourage you to check out a few of my other projects.

- [Boy](https://github.com/corysimmons/boy) - A super lightweight, old-browser-friendly, HTML5 boilerplate with tons of features that make it a great start to any project.
- [Typographic](https://github.com/corysimmons/typographic) - Insanely powerful yet easy-to-use responsive typography. Includes vertical rhythm, font stacks, modular scale, and more.

**[⬆ back to top](#table-of-contents)**

&nbsp;

### Thanks

- [Alex Bass](http://abass.co) for letting me bounce ideas off of him.
- [Maria Keller](https://dribbble.com/mariakeller) for the amazing logo. Be sure to hire her for all your design and motion graphic needs.
- Everyone who files an [Issue](https://github.com/corysimmons/lost/issues) when something isn't working as expected.
- Everyone who is *actually* interested in my work on grids.

**[⬆ back to top](#table-of-contents)**

&nbsp;
