# Change Log
All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/).

## [v8.0.0-beta.2] - 2016-11-12
### Fixed
- [#329](https://github.com/peterramsing/lost/issues/329) Issue where flex-basis needed to be set for IE 10/11

### Added
- Some [new global logic](https://github.com/peterramsing/lost/commit/9699bfc7e092ff6e2df00fc7861ac5a50c636c8b) for things. I'm a huge fan of breaking things out so they can be reused...LostGrid is in dire need of some breaking out within the codebase. This starts this (and it's been epic already and is starting to simplify things and improve readability.
- In the `master` branch a warning was added for older versions of Node.JS so that there could be a notification for those using older version that it was being dropped in LostGrid version 8. This is included in this release but will probably be removed by the time this is merged into `master`.

### Removed
- Docs from the README.md file. I'd love to just have one place for these and that's at [lostgrid.org](http://lostgrid.org).

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
