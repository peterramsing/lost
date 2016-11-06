# Change Log
All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/).

## [v8.0.0-beta.1] - 2016-11-05
### Added
- Global and local configuration for setting the "rounder". The default is 99.9% but this can be adapted with a global `@ rounder [insert percent here]` or you can do it on the local level with `lost-column-rounder: 100` rule.

### Fixed
- Issue where 99.9 pixels could cause issues. You can now use the custom rounder to fine-tune your width to remove pixel rounding issues.


## [v8.0.0-beta.0] - 2016-10-18
### Changed
- ([#184](https://github.com/peterramsing/lost/issues/184))[API Change] Changes the lost-offset to be more intuitive.
This reverses the current api from moving left to right based on negative fractions which didn’t make much sense. This breaks that api’s current functionality and makes it more intuitive.
