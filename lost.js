// Module dependencies
var postcss = require('postcss');
var assign = require('object-assign');

// Lost At Rules and Declarations
var libs = [
  require('./lib/lost-at-rule'),
  require('./lib/lost-utility'),
  require('./lib/lost-flex-container'),
  require('./lib/lost-center'),
  require('./lib/lost-align'),
  require('./lib/lost-column'),
  require('./lib/lost-row'),
  require('./lib/lost-waffle'),
  require('./lib/lost-offset'),
  require('./lib/lost-move'),
  require('./lib/lost-masonry-wrap'),
  require('./lib/lost-masonry-column')
];

var defaultSettings = {
  gutter: '30px',
  flexbox: 'no-flex',
  cycle: 'auto'
};

module.exports = postcss.plugin('lost', function lost(settings) {
  settings = assign(defaultSettings, settings || {});

  return function (css) {
    libs.forEach(function(lib) {
      lib(css, settings);
    });
  };
});
