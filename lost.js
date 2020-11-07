// Module dependencies
const assign = require('object-assign');

const lostAlign = require('./lib/lost-align');
const lostAtRule = require('./lib/lost-at-rule');
const lostCenter = require('./lib/lost-center');
const lostColumn = require('./lib/lost-column');
const lostFlexContainer = require('./lib/lost-flex-container');
const lostGutter = require('./lib/lost-gutter');
const lostMasonryColumn = require('./lib/lost-masonry-column');
const lostMasonryWrap = require('./lib/lost-masonry-wrap');
const lostMove = require('./lib/lost-move');
const lostOffset = require('./lib/lost-offset');
const lostRow = require('./lib/lost-row');
const lostUtility = require('./lib/lost-utility');
const lostVars = require('./lib/lost-vars');
const lostWaffle = require('./lib/lost-waffle');

// Lost At Rules and Declarations
// NOTE: Order Matters
const libs = [
  lostAtRule,
  lostVars,
  lostGutter,
  lostMove,
  lostUtility,
  lostFlexContainer,
  lostCenter,
  lostAlign,
  lostColumn,
  lostRow,
  lostWaffle,
  lostOffset,
  lostMasonryWrap,
  lostMasonryColumn,
];

const defaultSettings = {
  gutter: '30px',
  flexbox: 'no-flex',
  cycle: 'auto',
  clearing: 'both',
  rounder: 99.9,
  gridUnit: '%',
  direction: 'ltr',
};

module.exports = (settings = {}) => {
  return {
    postcssPlugin: 'lost',
    Once(css, { result }) {
      let runSettings = assign({}, defaultSettings, settings | {});
      libs.forEach((lib) => {
        lib(css, runSettings, result);
      });
    },
  };
};

module.exports.postcss = true;
