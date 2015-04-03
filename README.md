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


## Better than X
Lost is better than any grid system out there and can prove it.

Feature | Lost | [Bootstrap](http://getbootstrap.com/css/#grid) | [Foundation](http://foundation.zurb.com/grid.html) | [Jeet](http://jeet.gs/) | [Neat](http://neat.bourbon.io/) | [Susy](http://susy.oddbird.net/)
:-:|:-:|:-:|:-:|:-:|:-:|:-:
[Responsive](https://github.com/corysimmons/lost/wiki/Comparison-Explanation#responsive) | :+1: | :+1: | :+1: | :+1: | :+1: | :+1:
[Small learning curve](https://github.com/corysimmons/lost/wiki/Comparison-Explanation#small-learning-curve) | :+1: | :+1: | :+1: | :+1: | :+1:
[Easy-to-implement](https://github.com/corysimmons/lost/wiki/Comparison-Explanation#easy-to-implement) | :+1: | :+1: | :+1:
[Works with Masonry](https://github.com/corysimmons/lost/wiki/Comparison-Explanation#works-with-masonry) | :+1: | :+1: | :+1: |
[Terse markup](https://github.com/corysimmons/lost/wiki/Comparison-Explanation#terse-markup) | :+1: | | | :+1: | :+1: | :+1:
[On-the-fly grids](https://github.com/corysimmons/lost/wiki/Comparison-Explanation#on-the-fly-grids) | :+1: | | | :+1: | :+1: | :+1:
[Clean markup](https://github.com/corysimmons/lost/wiki/Comparison-Explanation#clean-markup) | :+1: | | | :+1: | :+1: | :+1:
[Real gutters](https://github.com/corysimmons/lost/wiki/Comparison-Explanation#real-gutters) | :+1: | | | :+1: | :+1: | :+1:
[Stylus support](https://github.com/corysimmons/lost/wiki/Comparison-Explanation#stylus-support) | :+1: | | | :+1:
[No Additional Ratio Context](https://github.com/corysimmons/lost/wiki/Comparison-Explanation#no-additional-ratio-context) | :+1:
[Consistent Horizontal Gutters](https://github.com/corysimmons/lost/wiki/Comparison-Explanation#consistent-horizontal-gutters) | :+1:
[Lightweight](https://github.com/corysimmons/lost/wiki/Comparison-Explanation#lightweight) | :+1:
[Vertical Grids](https://github.com/corysimmons/lost/wiki/Comparison-Explanation#vertical-grids) | :+1:
[Waffle Grids](https://github.com/corysimmons/lost/wiki/Comparison-Explanation#waffle-grids) | :+1:
[Fixed Gutters](https://github.com/corysimmons/lost/wiki/Comparison-Explanation#fixed-gutters) | :+1:

<sup>If you notice anything in this table is incorrect or unfair, please don't hesitate to [open an issue](https://github.com/corysimmons/lost/issues/new).</sup>


## Getting Started

Lost works by creating **blocks**. Think of these blocks as columns in a traditional grid system, except they can go vertical as well. To create a basic horizontal grid, just insert some blocks into any element like so and pass a fraction (**as a string**) to `block()`.

```html
<section>
  <figure>1</figure>
  <figure>2</figure>
  <figure>3</figure>
  <figure>4</figure>
</section>
```

```stylus
section
  cf()

figure
  block('1/2')
```

`cf()` is just a [clearfix](http://nicolasgallagher.com/micro-clearfix-hack/) mixin since blocks are floated. It's a good idea to give this to the element wrapping your blocks every time.

You can also make use of the `center()` mixin to assign a `max-width` and `margin: auto` to an element and center it on the page. `cf()` will automatically be applied in this case.

```stylus
section
  center(980px)

figure
  block('1/2')
```

Every element gets a `float: left` and `margin-right: $gutter` applied to them except the last one in the row. Lost will automatically detect the last item in a row (based on the denominator you passed) and apply a `margin-right: 0` to it by default.

To override this behavior simply pass a `$cycle` param to your `block()`.

```stylus
figure
  block('2/4', $cycle: 2)
```

Nesting is simple and **requires [no extra fractions](https://github.com/corysimmons/lost/wiki/Comparison-Explanation#no-additional-ratio-context)** unlike other preprocessor grid systems.

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

```stylus
figure
  block('1/2')
```

You can `offset` columns easily. To offset in the other direction, pass a negative fraction.

```html
<section>
  <figure>1</figure>
  <figure>2</figure>
</section>
```

```stylus
figure
  block('1/3')
  &:first-child
    offset('1/3')
```

Easily vertically or horizontally center children elements with the `align()` mixin.

```html
<section>
  <figure>Aligned</figure>
</section>
```

```stylus
section
  align()
  width: 600px
  height: 400px

figure
  width: 100px
  height: 100px
```

Use the `edit()` mixin at base level to visualize the entire structure of your site, or just specify the areas you're working on. You can pass it any color (pick a darkish one because `edit()` will lighten it).

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

```stylus
section
  &:nth-of-type(1)
    edit()
  &:nth-of-type(2)
    edit(green)
```

Lost even lets you create your own custom CSS grids in just a few lines of code with the `$output` parameter which accepts `normal` (compiles all `column` styles), `init` (only initial styles), and `bare` (just the `width` or `height`).

```stylus
[class*="col-"]
  block($output: init)

for $i in 1..12
  .col-{$i}
    block(s('%s/12', $i), $output: bare)
```

Once you've mastered the basic horizontal grid system (it shouldn't take long), you can start to make vertical grids that have the same vertical gutters as your horizontal grids. Just pass `$dir: column` to your `block()` mixin. The blocks will stretch to fill their container's height, so if you'd like to see them take up the full height of the page, set `height: 100%` on your container.

No other grid system in the world supports vertical grids.

```html
<section>
  <figure>1</figure>
  <figure>2</figure>
  <figure>3</figure>
</section>
```

```stylus
section
  height: 100%

figure
  block('1/3', $dir: column)
```

You can even make a horizontal/vertical grid (a *waffle grid*) which resembles a tic-tac-toe board.

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

```stylus
section
  height: 100%

figure
  block('1/3', $dir: both)
```

Lost supports masonry plugins like [Isotope](http://isotope.metafizzy.co/). To accomplish this we need to change how the margins work. Instead of applying a `margin-right` to everything, if we pass `$masonry-friendly: true` to our `block()` mixin they will have a margin on each side of them half the size of the original margin. To contain them, wrap them in an element that has the `masonry-row()` mixin applied to it. The `masonry-row()` mixin will apply negative offsets to each side of the containing element and make your grids look good.

```html
<section>
  <figure>1</figure>
  <figure>2</figure>
  <figure>3</figure>
</section>
```

```stylus
section
  masonry-row()

figure
  block('1/3', $masonry-friendly: true)
```


## Grid Settings

Just set either of these in a settings file after you `@import` Lost and before you use a Lost mixin.

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
Clearfix used to clear floated children blocks. http://nicolasgallagher.com/micro-clearfix-hack

```stylus
.parent
  cf()
  .child
    block('1/2')
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


##### `block()`
Creates a block that is a fraction of the size of it's containing element with a gutter. Think of this like a column except it can go vertical as well by setting $dir to 'column' or 'both'. You don't need to pass any additional ratios (fractions) as the grid system will make use of calc(). Note that fractions must always be wrapped in quotes.

- `$fraction = '1/1'` - This is a simple fraction of the containing element's width or height depending on $dir. This must be a string written as a fraction.
- `$dir = row` - The direction of the grid. Can be row (horizontal grid), column (vertical grid), or both (waffle grid).
- `$cycle = convert(unquote(split('/', $fraction)[1]))` (gets the denominator) - Lost works by assigning a margin-right to all elements except the last in the row. It does this by default by using the denominator of the fraction you pick. To override this default use this param. e.g. block('2/4', $cycle: 2)
- `$gut = $gutter` - The margin on the side of the element used to create a gutter. Typically this is left alone and the global $gutter will be used, but you can override it here if you want certain elements to have a particularly large or small gutter (pass 0 for no gutter at all).
- `$masonry-friendly = false` - Dictates whether this particular group of elements will work well with JS masonry plugins. This will assign a margin on each side of the element and you will need to wrap this group of elements in a masonry-row().
- `$output = normal` - Determines what type of code to output. Accepts normal (all styles for a block), init (the initial styles of any block), or bare (just the width of the block). Useful for creating CSS grid classes like .col-x with Lost.

```stylus
figure
  block('1/3')
```


##### `offset()`
Margin to the left, right, bottom, or top, of an element depending on if the fraction passed is positive or negative. It works for both horizontal and vertical grids but not both.

- `$fraction = '1/1'` - Fraction of the container to be offset. Must be a string.
- `$dir = row` - Direction the grid is going. Should match the block() it's being used on.
- `$gut = $gutter` - How large the gutter involved is, typically this won't be adjusted, but if you have set the blocks for that row to have different gutters than default, you will need to match that gutter here as well.

```stylus
.two-elements
  block('1/3')
  &:first-child
    offset('1/3')
```


##### `move()`
Source ordering. Shift elements left, right, up, or down, by their left or top position by passing a positive or negative fraction.

- `$fraction = '1/1'` - Fraction of the container to be shifted. Must be a string.
- `$dir = row` - Direction the grid is going. Should match the block() it's being used on.
- `$gut = $gutter` - Adjust the size of the gutter for this movement. Should match the block's $gut.
- `$output = normal` - Determines the type of output to produce. Accepts 3 options, normal (all the code), init (just the initialization code), and bare (just the left offset).

```stylus
figure
  block('1/3')
  move('1/3')
```


##### `masonry-row()`
Creates a row element for working with JS masonry libraries like Isotope. Assigns a negative margin on each side of this wrapping element.

- `$gut = $gutter` - How large the gutter involved is, typically this won't be adjusted and will inherit the global $gutter setting, but it's made available if you want your masonry grid to have a special $gut, it should match your blocks' $guts.

```stylus
section
  masonry-row()
figure
  block('1/3', $masonry-friendly: true)
```


## Usage with Node
- `npm i lost-grid --save-dev`

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

figure
  block('1/3')
```


## Example Code

- https://github.com/corysimmons/lost/tree/gh-pages


## Browser Support

- [`calc()` grids](https://webdesign.tutsplus.com/tutorials/calc-grids-are-the-best-grids--cms-22902) work perfect on IE9+ with poor support on old Android browsers ([`calc()` browser support](http://caniuse.com/#feat=calc)).
- Currently awaiting this [Issue](https://github.com/closingtag/calc-polyfill/issues/10) to be fixed in order to support IE8 (with a polyfill obviously). If it's not fixed rather quickly, I will add support for IE8 manually.


### Other Projects

If you like this project then I encourage you to check out a few of my other hand-selected projects.

- [Boy](https://github.com/corysimmons/boy) - A super lightweight, old-browser-friendly, HTML5 boilerplate with tons of features that make it a great start to any project.
- [Typographic](https://github.com/corysimmons/typographic) - Insanely powerful yet easy-to-use responsive typography. Includes vertical rhythm, font stacks, modular scale, and more.
- [lost-grid.js](https://github.com/corysimmons/lost-grid.js) - A purely JavaScript version of Lost v1. You can create your grid system directly in your markup without ever touching a line of preprocessor code. A pretty cool **concept**.


### Thanks

- [Alex Bass](https://twitter.com/flip4bytes) for being my friend during this process and letting me bounce every idea off you.
- [Hugo Giraudel](https://twitter.com/HugoGiraudel) for contributions to code quality and for polyfilling Sass.
- [Roman Komarov](https://twitter.com/kizmarh) for helping with Stylus hiccups.
- [Huy Hong](https://twitter.com/huy) for helping with Sass hiccups.
- Everyone who files an [Issue](https://github.com/corysimmons/lost/issues) when something isn't working as expected.
- Everyone who is *actually* interested in my work on grids.
