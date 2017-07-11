var lostGutter = require('./lost-vars-gutter');
var lostGutterLocal = require('./lost-vars-gutter-local');

module.exports = function lgGutter(css, settings) {
  var gutter, newValue;

  css.walkDecls( declaration => {
    if (
      /(\$lost-gutter)/g.test(declaration.value) &&
      !/(\$lost-gutter-local)/g.test(declaration.value)
    ) {
      gutter = lostGutter(declaration, settings);

      newValue = declaration.value.replace(/(\$lost-gutter)/g, gutter);
      declaration.value = newValue;
    }
    if (/(\$lost-gutter-local)/g.test(declaration.value)) {
      gutter = lostGutterLocal(declaration, settings);

      newValue = declaration.value.replace(/(\$lost-gutter-local)/g, gutter);
      declaration.value = newValue;
    }
  });
};
