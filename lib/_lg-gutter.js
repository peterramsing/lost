module.exports = function lgGutter(css, settings) {
  var gutter = settings.gutter;
  css.replaceValues(/\d+$lost-gutter/, { fast: '$lost-gutter' }, string => {
    return gutter;
  });
};
