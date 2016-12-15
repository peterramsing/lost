'use strict';

var check = require('./check');

describe('lost-waffle', function() {
  it('provides 3 column layout', function() {
    check(
      'a { lost-waffle: 1/3; }',
      'a { width: calc(99.9% * 1/3 - (30px - 30px * 1/3));' +
      ' height: calc(99.9% * 1/3 - (30px - 30px * 1/3)); }\n' +
      'a:nth-child(1n) { float: left; margin-right: 30px;' +
      ' margin-bottom: 30px; clear: none; }\n' +
      'a:last-child { margin-right: 0; margin-bottom: 0; }\n' +
      'a:nth-child(3n) { margin-right: 0; }\n' +
      'a:nth-child(3n + 1) { clear: both; }\n' +
      'a:nth-last-child(-n + 3) { margin-bottom: 0; }'
    );
  });

  it('supports a custom cycle', function() {
    check(
      'a { lost-waffle: 2/4 2; }',
      'a { width: calc(99.9% * 2/4 - (30px - 30px * 2/4));' +
      ' height: calc(99.9% * 2/4 - (30px - 30px * 2/4)); }\n' +
      'a:nth-child(1n) { float: left; margin-right: 30px;' +
      ' margin-bottom: 30px; clear: none; }\n' +
      'a:last-child { margin-right: 0; margin-bottom: 0; }\n' +
      'a:nth-child(2n) { margin-right: 0; }\n' +
      'a:nth-child(2n + 1) { clear: both; }\n' +
      'a:nth-last-child(-n + 2) { margin-bottom: 0; }'
    );
  });

  it('supports a custom gutter', function() {
    check(
      'a { lost-waffle: 3/6 2 60px; }',
      'a { width: calc(99.9% * 3/6 - (60px - 60px * 3/6));' +
      ' height: calc(99.9% * 3/6 - (60px - 60px * 3/6)); }\n' +
      'a:nth-child(1n) { float: left; margin-right: 60px;' +
      ' margin-bottom: 60px; clear: none; }\n' +
      'a:last-child { margin-right: 0; margin-bottom: 0; }\n' +
      'a:nth-child(2n) { margin-right: 0; }\n' +
      'a:nth-child(2n + 1) { clear: both; }\n' +
      'a:nth-last-child(-n + 2) { margin-bottom: 0; }'
    );
  });

  it('supports clearing fallback', function() {
    check(
      '@lost clearing left; \n' +
      'a { lost-waffle: 1/3; }',
      'a { width: calc(99.9% * 1/3 - (30px - 30px * 1/3));' +
      ' height: calc(99.9% * 1/3 - (30px - 30px * 1/3)); }\n' +
      'a:nth-child(1n) { float: left; margin-right: 30px;' +
      ' margin-bottom: 30px; clear: none; }\n' +
      'a:last-child { margin-right: 0; margin-bottom: 0; }\n' +
      'a:nth-child(3n) { margin-right: 0; }\n' +
      'a:nth-child(3n + 1) { clear: left; }\n' +
      'a:nth-last-child(-n + 3) { margin-bottom: 0; }'
    );
  });

  it('supports flexbox', function() {
    check(
      'a { lost-waffle: 2/5 3 0 flex; }',
      'a { flex-grow: 0; flex-shrink: 0; ' +
      'flex-basis: calc(99.9% * 2/5); ' +
      'width: calc(99.9% * 2/5); height: calc(99.9% * 2/5); }\n' +
      'a:nth-child(1n) { ' +
      'margin-right: 0; margin-bottom: 0; margin-left: 0; }\n' +
      'a:last-child { margin-right: 0; margin-bottom: 0; }\n' +
      'a:nth-child(3n) { margin-right: 0; margin-left: auto; }\n' +
      'a:nth-last-child(-n + 3) { margin-bottom: 0; }'
    );
  });

  it('supports no-flexbox', function() {
    check(
      'a { lost-waffle: 2/5 3 0 no-flex; }',

      'a { width: calc(99.9% * 2/5); height: calc(99.9% * 2/5); }\n' +
      'a:nth-child(1n) { float: left; margin-right: 0; margin-bottom: 0; clear: none; }\n' +
      'a:last-child { margin-right: 0; margin-bottom: 0; }\n' +
      'a:nth-child(3n) { margin-right: 0; }\n' +
      'a:nth-child(3n + 1) { clear: both; }\n' +
      'a:nth-last-child(-n + 3) { margin-bottom: 0; }'
    );
  });

  it('supports float-right', function() {
    check(
      'a { lost-waffle: 2/5 3 0 no-flex float-right; }',

      'a { width: calc(99.9% * 2/5); height: calc(99.9% * 2/5); }\n' +
      'a:nth-child(1n) { float: left; margin-right: 0; margin-bottom: 0; clear: none; }\n' +
      'a:last-child { margin-right: 0; margin-bottom: 0; }\n' +
      'a:nth-child(3n) { margin-right: 0; float: right; }\n' +
      'a:nth-child(3n + 1) { clear: both; }\n' +
      'a:nth-last-child(-n + 3) { margin-bottom: 0; }'
    );
  });

  it('Supports custom unit', function() {
    check(
      'a { lost-waffle: 2/5 3 0 no-flex float-right; lost-unit: vw; }',
      'a { width: calc(99.9vw * 2/5); height: calc(99.9vw * 2/5); }\n' +
      'a:nth-child(1n) { float: left; margin-right: 0; margin-bottom: 0; clear: none; }\n' +
      'a:last-child { margin-right: 0; margin-bottom: 0; }\n' +
      'a:nth-child(3n) { margin-right: 0; float: right; }\n' +
      'a:nth-child(3n + 1) { clear: both; }\n' +
      'a:nth-last-child(-n + 3) { margin-bottom: 0; }'
    );
  });

  describe('allows for customizable rounders', function() {
    it('100%', function() {
      check(
        'a { lost-waffle: 2/5 3 0 no-flex; lost-waffle-rounder: 100; }',

        'a { width: calc(100% * 2/5); height: calc(100% * 2/5); }\n' +
        'a:nth-child(1n) { float: left; margin-right: 0; margin-bottom: 0; clear: none; }\n' +
        'a:last-child { margin-right: 0; margin-bottom: 0; }\n' +
        'a:nth-child(3n) { margin-right: 0; }\n' +
        'a:nth-child(3n + 1) { clear: both; }\n' +
        'a:nth-last-child(-n + 3) { margin-bottom: 0; }'
      );
    });

    it('99.99999999999%', function() {
      check(
        'a { lost-waffle: 2/5 3 0 no-flex; lost-waffle-rounder: 99.99999999999; }',

        'a { width: calc(99.99999999999% * 2/5); height: calc(99.99999999999% * 2/5); }\n' +
        'a:nth-child(1n) { float: left; margin-right: 0; margin-bottom: 0; clear: none; }\n' +
        'a:last-child { margin-right: 0; margin-bottom: 0; }\n' +
        'a:nth-child(3n) { margin-right: 0; }\n' +
        'a:nth-child(3n + 1) { clear: both; }\n' +
        'a:nth-last-child(-n + 3) { margin-bottom: 0; }'
      );
    });
  });

  describe('supports RTL', () => {
    it('works with typical waffle', () => {
      check(
        `@lost --beta-direction rtl;\n`+
        `div { lost-waffle: 1/3; }`,
        `div { width: calc(99.9% * 1/3 - (30px - 30px * 1/3)); height: calc(99.9% * 1/3 - (30px - 30px * 1/3)); }\n` +
        `div:nth-child(1n) { float: right; margin-left: 30px; margin-bottom: 30px; clear: none; }\n` +
        `div:last-child { margin-left: 0; margin-bottom: 0; }\n` +
        `div:nth-child(3n) { margin-left: 0; }\n` +
        `div:nth-child(3n + 1) { clear: both; }\n` +
        `div:nth-last-child(-n + 3) { margin-bottom: 0; }`
      );
    });
  });
});
