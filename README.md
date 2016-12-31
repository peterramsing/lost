<p align="center">
  <img src="http://lostgrid.org/lost-grid.svg">
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/lost"><img src="https://img.shields.io/npm/v/lost.svg?style=flat-square"></a>
  <a href="https://github.com/peterramsing/lost/stargazers"><img src="http://img.shields.io/npm/dm/lost.svg?style=flat-square"></a>
  <a href="https://travis-ci.org/peterramsing/lost"><img src="https://img.shields.io/travis/peterramsing/lost/master.svg?style=flat-square"></a>
  <a href="https://gitter.im/peterramsing/lost"><img src="https://badges.gitter.im/Join%20Chat.svg"></a>
  <br><br>
  <a href="http://waffle.io/peterramsing/lost"><img src="https://badge.waffle.io/peterramsing/lost.svg?label=status:%20Slated%20For%20Dev&title=Slated%20for%20Dev"></a>
  <a href="http://waffle.io/peterramsing/lost"><img src="https://badge.waffle.io/peterramsing/lost.svg?label=status:%20In%20Progress&title=In%20Progress"></a>
</p>

LostGrid is a powerful grid system built in [PostCSS](https://github.com/postcss/postcss) that works with any preprocessor and even vanilla CSS.


If you have any questions, comments, or concerns please feel free to [open an issue](https://github.com/peterramsing/lost/issues/new). You're also welcome to tweet [@LostGrid](https://twitter.com/lostgrid) if an issue seems too formal.

*********

## Getting Started
* [Installation Guide](https://github.com/peterramsing/lost/wiki/Installation)
* [Getting Started Video](https://youtu.be/6FN7QU1ZxqA)

Lost makes use of [`calc()`](https://developer.mozilla.org/en-US/docs/Web/CSS/calc) to create stunning grids based on fractions you define without having to pass a lot of options.

Read the docs on [LostGrid.org](http://lostgrid.org/docs.html)!

## Browser Support
- LostGrid relies on [`calc()`](https://developer.mozilla.org/en-US/docs/Web/CSS/calc) to create the grid. Thus, LostGrid is limited to browsers that support `calc()`. The great thing is that `calc()` is widely supported in all current browsers and the LostGrid usage of `calc()` is supported as far back as IE9+.
- **If using LostGrid in flexbox mode** browser support is limited to IE 10+.
- [Calc browser support](http://caniuse.com/#feat=calc)
- [Flexbox browser support](http://caniuse.com/#feat=flexbox)

### Official Support
- LostGrid is tested in the following browsers for compatibility
  - IE10+ (IE9 has the same `calc()` support as IE10 except for background position which LostGrid doesn't affect)
  - Evergreen Browsers (as they update automatically, tests are performed on the latest version of the following browsers)
    - Chrome
      - Chrome Canary + Chromium as well
    - Opera
    - Firefox
      - FirefoxDeveloperEdition as well
    - Edge
  - Safari 9+
- Automated browser testing with Selenium is coming soon. 👍

Note: LostGrid no longer supports Node 0.10 and 0.12. I'll be following the [Node LTS plan for Node](https://github.com/nodejs/LTS#lts-schedule). Let me know if you any questions. Thanks!

**[:arrow_up: back to top](#table-of-contents)**

&nbsp;

### Thanks
- [Cory Simmons](https://github.com/corysimmons) for creating this grid!
- [Alex Bass](http://abass.co) for being available to bounce ideas off of.
- [Maria Keller](https://dribbble.com/mariakeller) for the amazing logo. Be sure to hire her for all your design and motion graphic needs.
- Everyone who files an [Issue](https://github.com/peterramsing/lost/issues) when something isn't working as expected.
- Everyone who has [contributed](https://github.com/peterramsing/lost/graphs/contributors).

**[:arrow_up: back to top](#table-of-contents)**

&nbsp;
