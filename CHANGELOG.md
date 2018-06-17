# Changelog
All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/).

---
## [v8.3.0] - 2018-06-11

### Fixed
-  [#406](https://github.com/peterramsing/lost/pull/406) [#370](https://github.com/peterramsing/lost/issues/370) Fixes issue where waffle widths were the wrong width on FF browsers


[Diff with previous version 8.2.1](https://github.com/peterramsing/lost/compare/v8.2.1...v8.3.0)


## [v8.2.1] - 2018-02-28

### Fixed
-  [#405](https://github.com/peterramsing/lost/pull/405) Fixed issue where the shorthand override for flexbox wasn't working for the override of the global flexbox setting for `lost-center`.

---

## [v8.2.0] - 2017-07-18

[v8.2 Milestone](https://github.com/peterramsing/lost/milestone/12?closed=1)

There are various bug fixes in here due to increasing the test coverage. Huge props to @BarryThePenguin for [setting up the coverage](https://github.com/peterramsing/lost/pull/368)! A small change but it helped bring to light a fair amount of bugs (the ones listed here are not the only ones see: [#384](https://github.com/peterramsing/lost/pull/384), [#385](https://github.com/peterramsing/lost/pull/385)). 


### Updates
- [#381](https://github.com/peterramsing/lost/pull/381) Code Coverage is now 100%  Thanks @peterramsing 😳

### Fixed
-  [#381](https://github.com/peterramsing/lost/pull/381) Fixed an issue where explicitly setting a custom `lost-column` or `lost-waffle` cycle to zero might not work correctly.
    - [`lost-column` Commit](https://github.com/peterramsing/lost/pull/381/commits/fb957f22d42c8e2715d57c5cad3343ccfa73bf5e) 
    - [`lost-waffle` Commit](https://github.com/peterramsing/lost/pull/381/commits/e1dbbb60f0f697a41fee095a252cc5a0a7483863)
- [#381](https://github.com/peterramsing/lost/pull/381) Fixed an issue where the flexbox long-form for `lost-waffle` woudn't actually set.
    - [Commit](https://github.com/peterramsing/lost/pull/381/commits/92fe8f785e29baff20a9fdac038601abe0687cc5)
- [#381](https://github.com/peterramsing/lost/pull/381) Fixed an issue where the long-form `lost-masonry-wrap-gutter` didn't actually do anything. 😳
- [#383/#384](https://github.com/peterramsing/lost/issues/383) Fixed an issue lost-masonry-column does not support no unit on a "0 gutter"
- [#385](https://github.com/peterramsing/lost/pull/385) Fixes issue where long-form flex isn't being set correctly

### Added
- [#389](https://github.com/peterramsing/lost/pull/389) New and improved Variables for using the gutters for other things like padding, etc. Thanks @codebysubtract 💪
- [#396](https://github.com/peterramsing/lost/pull/386) New grid overlay to help visualize your grid. Thanks @codebysubtract 📏


[Diff with previous *minor* version 8.1.0](https://github.com/peterramsing/lost/compare/v8.1.0...v8.2.0)

---

## [v8.1.0] - 2017-07-01

[v8.1 Milestone](https://github.com/peterramsing/lost/milestone/11?closed=1)

### Updates
- [#379](https://github.com/peterramsing/lost/pull/379) Updated to PostCSS version 6.0.2 - Thanks @codebysubtract ☕️

### Fixed
- [#374](https://github.com/peterramsing/lost/pull/374) Fixes issue with `flex-basis` where IE10/11 would not lay out correctly with `lost-column`. - Thanks @finneganh! 🏙

### Added
- [#337](https://github.com/peterramsing/lost/pull/377) `lost-column` not supports decimals without the leading zero. - Thanks @codebysubtract! 🔢
- [#365](https://github.com/peterramsing/lost/pull/365) `lost-center` now supports fractions! - Thanks @codebysubtract 📈
- [#363](https://github.com/peterramsing/lost/pull/363) Add param for `lost-offset` that disables it

### Changed
- [#375](https://github.com/peterramsing/lost/pull/375) Deprecation of Node move methods in postcss is triggering deprecation message "Node#moveTo was deprecated. Use Container#append." - Thanks @thebuilder 🏗

### LostGrid Infrastructure
- [#368](https://github.com/peterramsing/lost/pull/368) Adds NYC and Codecov coverage for reporting - Thanks @BarryThePenguin! 🛰
- [#364](https://github.com/peterramsing/lost/pull/364) Inline docs are removed from the code, see [lostgrid.org](http://lostgrid.org) for docs.


[Diff with previous *minor* version 8.0.0](https://github.com/peterramsing/lost/compare/v8.0.0...v8.1.0)

---

## [v8.0.0] - 2016-12-31
### Fixed
- [#339](https://github.com/peterramsing/lost/issues/233) Fixes issue where `lost-align` was targeting the incorrect element when using flexbox.
- [#329](https://github.com/peterramsing/lost/issues/329) Issue where flex-basis needed to be set for IE 10/11
- Issue where 99.9 pixels could cause issues. You can now use the custom rounder to fine-tune your width to remove pixel rounding issues.

### Changed
- [#343](https://github.com/peterramsing/lost/issues/328) Changes how the `lost-waffle` last element in a row is floated. Before, the last element in a row would be floated right where everything else would float left. This is typically with row based grids, however when using the waffle grid it was a bit strange. This now allows for a param to be used instead if you want the last element to float right and all elements floating left is default.
- ([#184](https://github.com/peterramsing/lost/issues/184))[API Change] Changes the lost-offset to be more intuitive.
This reverses the current api from moving left to right based on negative fractions which didn’t make much sense. This breaks that api’s current functionality and makes it more intuitive.

### Added
- [#345](https://github.com/peterramsing/lost/issues/345) Customizable units for calc (vw).
- In the `master` branch a warning was added for older versions of Node.JS so that there could be a notification for those using older version that it was being dropped in LostGrid version 8. This is included in this release but will probably be removed by the time this is merged into `master`.
- Global and local configuration for setting the "rounder". The default is 99.9% but this can be adapted with a global `@ rounder [insert percent here]` or you can do it on the local level with `lost-column-rounder: 100` rule.

### Removed
- Docs from the README.md file. I'd love to just have one place for these and that's at [lostgrid.org](http://lostgrid.org).

### LostGrid Infrastructure
- Added a way to validate whether or not a unit is valid based on the declaration.
- You're now able to pass a unit into the calcValue instead of the hard-coded %.
- Some [new global logic](https://github.com/peterramsing/lost/commit/9699bfc7e092ff6e2df00fc7861ac5a50c636c8b) for things. I'm a huge fan of breaking things out so they can be reused...LostGrid is in dire need of some breaking out within the codebase. This starts this (and it's been epic already and is starting to simplify things and improve readability.

[Diff with previous *major* version 7.1.1](https://github.com/peterramsing/lost/compare/v7.1.1...v8.0.0)
