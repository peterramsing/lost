module.exports = function lgGutter(css, settings) {
  var gutter = settings.gutter;
  css.eachDecl( decl => {

    if (decl.value === '$lost-gutter') {
      decl.value = gutter;
    }

  });
};
