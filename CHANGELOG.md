# Changelog
All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/).

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

---
# LostGrid version 8 Beta Releases

## [v8.0.0-beta.3] - 2016-12-01
### Fixed
- [#339](https://github.com/peterramsing/lost/issues/233) Fixes issue where `lost-align` was targeting the incorrect element when using flexbox.

### Changed
- [#343](https://github.com/peterramsing/lost/issues/328) Changes how the `lost-waffle` last element in a row is floated. Before, the last element in a row would be floated right where everything else would float left. This is typically with row based grids, however when using the waffle grid it was a bit strange. This now allows for a param to be used instead if you want the last element to float right and all elements floating left is default.

### Added
- [#345](https://github.com/peterramsing/lost/issues/345) Customizable units for calc (vw).

### LostGrid Infrastructure
- Added a way to validate whether or not a unit is valid based on the declaration.
- You're now able to pass a unit into the calcValue instead of the hard-coded %.

[Diff with previous version 8.0.0-beta.2](https://github.com/peterramsing/lost/compare/v8.0.0-beta.2...v8.0.0-beta.3)

## [v8.0.0-beta.2] - 2016-11-12
### Fixed
- [#329](https://github.com/peterramsing/lost/issues/329) Issue where flex-basis needed to be set for IE 10/11

### Added
- In the `master` branch a warning was added for older versions of Node.JS so that there could be a notification for those using older version that it was being dropped in LostGrid version 8. This is included in this release but will probably be removed by the time this is merged into `master`.

### Removed
- Docs from the README.md file. I'd love to just have one place for these and that's at [lostgrid.org](http://lostgrid.org).

### LostGrid Infrastructure
- Some [new global logic](https://github.com/peterramsing/lost/commit/9699bfc7e092ff6e2df00fc7861ac5a50c636c8b) for things. I'm a huge fan of breaking things out so they can be reused...LostGrid is in dire need of some breaking out within the codebase. This starts this (and it's been epic already and is starting to simplify things and improve readability.

[Diff with previous version 8.0.0-beta.1](https://github.com/peterramsing/lost/compare/v8.0.0-beta.1...v8.0.0-beta.2)

## [v8.0.0-beta.1] - 2016-11-05
### Added
- Global and local configuration for setting the "rounder". The default is 99.9% but this can be adapted with a global `@ rounder [insert percent here]` or you can do it on the local level with `lost-column-rounder: 100` rule.

### Fixed
- Issue where 99.9 pixels could cause issues. You can now use the custom rounder to fine-tune your width to remove pixel rounding issues.

[Diff with previous version 8.0.0-beta.0](https://github.com/peterramsing/lost/compare/v8.0.0-beta.0...v8.0.0-beta.1)

## [v8.0.0-beta.0] - 2016-10-18
### Changed
- ([#184](https://github.com/peterramsing/lost/issues/184))[API Change] Changes the lost-offset to be more intuitive.
This reverses the current api from moving left to right based on negative fractions which didn’t make much sense. This breaks that api’s current functionality and makes it more intuitive.
