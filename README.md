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
- Run the command: `npm install gulp gulp-sourcemaps gulp-postcss lost autoprefixer-core --save-dev`
- Create a `gulpfile.js` with the following code:

```javascript
var gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    postcss = require('gulp-postcss'),
    lost = require('lost'),
    autoprefixer = require('autoprefixer-core');

var paths = {
  cssSource: 'src/css/',
  cssDestination: 'dist/css/'
};

gulp.task('styles', function() {
  return gulp.src(paths.cssSource + '/**/*.css')
    .pipe(sourcemaps.init())
    .pipe(postcss([
      lost(),
      autoprefixer()
    ]))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.cssDestination));
});

gulp.watch(paths.cssSource + '/**/*.css', ['styles']);

gulp.task('default', ['styles']);
```

This will watch your `src/css/` directory for any changes to CSS files and then
process them with Autoprefixer and Lost Grid (which will convert Lost Grid rules
into vanilla CSS code), create sourcemaps, and output the processed CSS and
sourcemaps to `dist/css/`.

Lost Grid rules look like this:

```css
.foo {
  lost-column: 1/3;
}
```

And the processed CSS looks like this:

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
