module.exports = function lgGutter(css, settings) {
  var gutter = settings.gutter;
  css.eachDecl( decl => {
    if (/(\$lost-gutter)/g.test(decl.value)) {
      var newValue = decl.value.replace(/(\$lost-gutter)/g, gutter);
      decl.value = newValue;
    }
  });
};
