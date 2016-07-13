// Module dependencies
import postcss = require('postcss');
import assign = require('object-assign');

import atRule = require('./lib/lost-at-rule');
import utility = require('./lib/lost-utility');
import flexContainer = require('./lib/lost-flex-container');
import center = require('./lib/lost-center');
import align = require('./lib/lost-align');
import column = require('./lib/lost-column');
import row = require('./lib/lost-row');
import waffle = require('./lib/lost-waffle');
import offset = require('./lib/lost-offset');
import move = require('./lib/lost-move');
import masonryWrap = require('./lib/lost-masonry-wrap');
import masonryColumn = require('./lib/lost-masonry-column');

// Lost At Rules and Declarations
var libs = [
  atRule,
  utility,
  flexContainer,
  center,
  align,
  column,
  row,
  waffle,
  offset,
  move,
  masonryWrap,
  masonryColumn,
  column
];

var defaultSettings = {
  gutter: '30px',
  flexbox: 'no-flex',
  cycle: 'auto',
  clearing: 'both'
};

export = postcss.plugin('lost', function lost(settings) {
  settings = assign({}, defaultSettings, settings || {});

  return function (css) {
    libs.forEach(function(lib) {
      lib(css, settings);
    });
  };
});
