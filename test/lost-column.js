'use strict';

var check = require('./check');

describe('lost-column', function() {
  it('provides 3 column layout', function() {
    check(
      'a { lost-column: 1/3; }',
      'a { width: calc(99.9% * 1/3 - (30px - 30px * 1/3)); }\n' +
      'a:nth-child(1n) { float: left; margin-right: 30px; clear: none; }\n' +
      'a:last-child { margin-right: 0; }\n' +
      'a:nth-child(3n) { margin-right: 0; float: right; }\n' +
      'a:nth-child(3n + 1) { clear: both; }'
    );
  });

  it('provides 2/5 column layout', function() {
    check(
      'a { lost-column: 2/5; }',
      'a { width: calc(99.9% * 2/5 - (30px - 30px * 2/5)); }\n' +
      'a:nth-child(1n) { float: left; margin-right: 30px; clear: none; }\n' +
      'a:last-child { margin-right: 0; }\n' +
      'a:nth-child(5n) { margin-right: 0; float: right; }\n' +
      'a:nth-child(5n + 1) { clear: both; }'
    );
  });

  it('can support custom cycle', function() {
    check(
      'a { lost-column: 2/4 2; }',
      'a { width: calc(99.9% * 2/4 - (30px - 30px * 2/4)); }\n' +
      'a:nth-child(1n) { float: left; margin-right: 30px; clear: none; }\n' +
      'a:last-child { margin-right: 0; }\n' +
      'a:nth-child(2n) { margin-right: 0; float: right; }\n' +
      'a:nth-child(2n + 1) { clear: both; }'
    );
  });

  it('supports no gutter', function() {
    check(
      'a { lost-column: 2/5 3 0; }',
      'a { width: calc(99.9% * 2/5); }\n' +
      'a:nth-child(1n) { float: left; margin-right: 0; clear: none; }\n' +
      'a:last-child { margin-right: 0; }\n' +
      'a:nth-child(3n) { margin-right: 0; float: right; }\n' +
      'a:nth-child(3n + 1) { clear: both; }'
    );
  });

  it('supports flexbox', function() {
    check(
      'a { lost-column: 2/6 3 60px flex; }',
      'a { flex-grow: 0; flex-shrink: 0; ' +
      'flex-basis: calc(99.9% * 2/6 - (60px - 60px * 2/6)); ' +
      'width: calc(99.9% * 2/6 - (60px - 60px * 2/6)); }\n' +
      'a:nth-child(1n) { margin-right: 60px; margin-left: 0; }\n' +
      'a:last-child { margin-right: 0; }\n' +
      'a:nth-child(3n) { margin-right: 0; margin-left: auto; }'
    );
  });

  it('supports clearing fallback', function() {
    check(
      '@lost clearing left; \n' +
      'a { lost-column: 1/3; }',
      'a { width: calc(99.9% * 1/3 - (30px - 30px * 1/3)); }\n' +
      'a:nth-child(1n) { float: left; margin-right: 30px; clear: none; }\n' +
      'a:last-child { margin-right: 0; }\n' +
      'a:nth-child(3n) { margin-right: 0; float: right; }\n' +
      'a:nth-child(3n + 1) { clear: left; }'
    );
  });

  it('provides none rule', function() {
    check(
      'a { lost-column: none; }',
      'a { width: auto; }\n' +
      'a:last-child { float: none; clear: none; margin-right: 0; width: auto; }\n' +
      'a:nth-child(1n) { float: none; clear: none; margin-right: 0; width: auto; }\n' +
      'a:nth-child(1n + 1) { float: none; clear: none; margin-right: 0; width: auto; }'
    );
  });

  it('supports no-flexbox', function() {
    check(
      'a { lost-column: 2/6 3 60px no-flex; }',
      'a { width: calc(99.9% * 2/6 - (60px - 60px * 2/6)); }\n' +
      'a:nth-child(1n) { float: left; margin-right: 60px; clear: none; }\n' +
      'a:last-child { margin-right: 0; }\n' +
      'a:nth-child(3n) { margin-right: 0; float: right; }\n' +
      'a:nth-child(3n + 1) { clear: both; }'
    );
  });

  it('lost-column-cycle', function() {
    check(
      'a { lost-column: 2/6; lost-column-cycle: 6; }',

      'a { width: calc(99.9% * 2/6 - (30px - 30px * 2/6)); }\n' +
      'a:nth-child(1n) { float: left; margin-right: 30px; clear: none; }\n' +
      'a:last-child { margin-right: 0; }\n' +
      'a:nth-child(6n) { margin-right: 0; float: right; }\n' +
      'a:nth-child(6n + 1) { clear: both; }'
    );
  });

  it('lost-column-gutter', function() {
    check(
      'a { lost-column: 2/6; lost-column-gutter: 10px; }',

      'a { width: calc(99.9% * 2/6 - (10px - 10px * 2/6)); }\n' +
      'a:nth-child(1n) { float: left; margin-right: 10px; clear: none; }\n' +
      'a:last-child { margin-right: 0; }\n' +
      'a:nth-child(6n) { margin-right: 0; float: right; }\n' +
      'a:nth-child(6n + 1) { clear: both; }'
    );
  });

  it('Ignores bad unit', function() {
    check(
      `a { lost-column: 2/6; lost-column-gutter: 10px; lost-unit: $; }`,

      'a { width: calc(99.9% * 2/6 - (10px - 10px * 2/6)); }\n' +
      'a:nth-child(1n) { float: left; margin-right: 10px; clear: none; }\n' +
      'a:last-child { margin-right: 0; }\n' +
      'a:nth-child(6n) { margin-right: 0; float: right; }\n' +
      'a:nth-child(6n + 1) { clear: both; }'
    );
  });

  it('Uses unit if one is passed', function() {
    check(
      `a { lost-column: 2/6; lost-column-gutter: 10px; lost-unit: vw; }`,

      'a { width: calc(99.9vw * 2/6 - (10px - 10px * 2/6)); }\n' +
      'a:nth-child(1n) { float: left; margin-right: 10px; clear: none; }\n' +
      'a:last-child { margin-right: 0; }\n' +
      'a:nth-child(6n) { margin-right: 0; float: right; }\n' +
      'a:nth-child(6n + 1) { clear: both; }'
    );
  });

  describe('allows for customizable rounders', function() {
    it('100%', function() {
      check(
        'a { lost-column: 2/6; lost-column-rounder: 100; }',

        'a { width: calc(100% * 2/6 - (30px - 30px * 2/6)); }\n' +
        'a:nth-child(1n) { float: left; margin-right: 30px; clear: none; }\n' +
        'a:last-child { margin-right: 0; }\n' +
        'a:nth-child(6n) { margin-right: 0; float: right; }\n' +
        'a:nth-child(6n + 1) { clear: both; }'
      );
    });

    it('99.99999999999%', function() {
      check(
        'a { lost-column: 2/6; lost-column-rounder: 99.99999999999; }',

        'a { width: calc(99.99999999999% * 2/6 - (30px - 30px * 2/6)); }\n' +
        'a:nth-child(1n) { float: left; margin-right: 30px; clear: none; }\n' +
        'a:last-child { margin-right: 0; }\n' +
        'a:nth-child(6n) { margin-right: 0; float: right; }\n' +
        'a:nth-child(6n + 1) { clear: both; }'
      );
    });
  });

  describe('supports RTL', () => {
    it('works with typical column', () => {
      check(
        `@lost --beta-direction rtl;\n`+
        `a { lost-column: 1/2; }`,
        `a { width: calc(99.9% * 1/2 - (30px - 30px * 1/2)); }\n` +
        `a:nth-child(1n) { float: right; margin-left: 30px; clear: none; }\n` +
        `a:last-child { margin-left: 0; }\n` +
        `a:nth-child(2n) { margin-left: 0; float: left; }\n` +
        `a:nth-child(2n + 1) { clear: both; }`
      );
      check(
        `@lost --beta-direction rtl;\n`+
        `a { lost-column: 5/10; }`,
        `a { width: calc(99.9% * 5/10 - (30px - 30px * 5/10)); }\n` +
        `a:nth-child(1n) { float: right; margin-left: 30px; clear: none; }\n` +
        `a:last-child { margin-left: 0; }\n` +
        `a:nth-child(10n) { margin-left: 0; float: left; }\n` +
        `a:nth-child(10n + 1) { clear: both; }`
      );
    });
  });
});
