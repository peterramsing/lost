// Module dependencies

import { AtRule } from 'postcss';
import { lostAlign } from './lost-align';
import { lostAtRule } from './lost-at-rule';
import { lostColumn } from './lost-column';
import { lostCenter } from './lost-center';
import { lostFlexContainer } from './lost-flex-container';
import { lostGutter } from './lost-gutter';
import { lostMasonryColumn } from './lost-masonry-column';
import { lostMasonryWrap } from './lost-masonry-wrap';
import { lostMove } from './lost-move';
import { lostRow } from './lost-row';
import { lostOffset } from './lost-offset';
import { lostUtility } from './lost-utility';
import { lostVars } from './lost-vars';
import { lostWaffle } from './lost-waffle';

// NOTE: Order Matters
const libs = [
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

export const lost = (settings = {}) => {
  return {
    postcssPlugin: 'lost',
    prepare() {
      const runSettings = { ...defaultSettings, ...settings };
      return {
        AtRule(atRule: AtRule) {
          lostAtRule(atRule, runSettings);
        },
        OnceExit(css: any, { result }: any) {
          libs.forEach((lib) => lib(css, runSettings, result));
        },
      };
    },
  };
};

// module.exports.postcss = true;
