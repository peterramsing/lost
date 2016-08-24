// Module dependencies
var postcss = require('postcss');
var assign = require('object-assign');

var lostAtRule = require('./lib/lost-at-rule');
var lostUtility = require('./lib/lost-utility');
var lostFlexContainer = require('./lib/lost-flex-container');
var lostCenter = require('./lib/lost-center');
var lostAlign = require('./lib/lost-align');
var lostColumn = require('./lib/lost-column');
var lostRow = require('./lib/lost-row');
var lostWaffle = require('./lib/lost-waffle');
var lostOffset = require('./lib/lost-offset');
var lostMove = require('./lib/lost-move');
var lostMasonryWrap = require('./lib/lost-masonry-wrap');
var lostMasonryColumn = require('./lib/lost-masonry-column');

// Lost At Rules and Declarations
var libs = [
  lostAtRule,
  lostUtility,
  lostFlexContainer,
  lostCenter,
  lostAlign,
  lostColumn,
  lostRow,
  lostWaffle,
  lostOffset,
  lostMove,
  lostMasonryWrap,
  lostMasonryColumn
];

var defaultSettings = {
  gutter: '30px',
  flexbox: 'no-flex',
  cycle: 'auto',
  clearing: 'both'
};

module.exports = postcss.plugin('lost', function lost(settings) {
  var theseSettings = assign({}, defaultSettings, settings || {});

  return function executeLostGrid(css) {
    libs.forEach(function executeEachLostRule(lib) {
      lib(css, theseSettings);
    });
  };
});
