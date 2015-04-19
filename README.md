<p align="center">
  <img src="http://corysimmons.github.io/lost/lost-grid.svg">
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/lost"><img src="https://img.shields.io/npm/v/lost-grid.svg?style=flat-square"></a>
  <a href="https://github.com/corysimmons/lost/stargazers"><img src="http://img.shields.io/npm/dm/lost-grid.svg?style=flat-square"></a>
  <a href="https://gitter.im/corysimmons/lost"><img src="https://badges.gitter.im/Join%20Chat.svg"></a>
</p>


# Installation

- Install [NodeJS](http://nodejs.org)
- `npm install gulp gulp-autoprefixer gulp-postcss gulp-sourcemaps lost`
- Create a `gulpfile.js` with the following code:

```javascript
var gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('gulp-autoprefixer'),
    lost = require('lost');

var paths = {
  cssSource: 'src/css',
  cssDestination: 'dist/css'
};

gulp.task('styles', function() {
  return gulp.src(paths.cssSource + '/**/*.css')
    .pipe(sourcemaps.init())
    .pipe(postcss([
      lost()
    ]))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.cssDestination));
});

gulp.watch(paths.cssSource + '/**/*.css', ['styles']);

gulp.task('default', ['styles']);
```

This will watch your `src/css` folder for any changes to CSS files and then run Autoprefixer on them, create sourcemaps for them, convert Lost grid rules to functional CSS code, and output the code to a `dist/css` folder.

Lost grid rules look like this:

```css
.foo {
  lost-column: 1/3;
}
```

And is converted to:

```css
.foo {
  float: left;
  margin-right: 30px;
  width: calc(99.99% * 1/3 - (30px - 30px * 1/3));
}
.foo:nth-child(n) {
  float: left;
  margin-right: 30px;
  clear: none;
}
.foo:last-child {
  margin-right: 0;
}
.foo:nth-child(3n) {
  float: right;
  margin-right: 0;
}
.foo:nth-child(3n + 1) {
  clear: left;
}

/*# sourceMappingURL=style.css.map */
```
