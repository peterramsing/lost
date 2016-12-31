'use strict';

var check = require('./check');

describe('lost-at-rule', function() {
  it('changes the default gutter', function() {
    check(
      '@lost gutter 60px;\n' +
      'div {\n' +
      '  lost-column: 1/3;\n' +
      '}',

      'div {\n' +
      '  width: calc(99.9% * 1/3 - (60px - 60px * 1/3));\n' +
      '}\n' +
      'div:nth-child(1n) {\n' +
      '  float: left;\n' +
      '  margin-right: 60px;\n' +
      '  clear: none;\n' +
      '}\n' +
      'div:last-child {\n' +
      '  margin-right: 0;\n' +
      '}\n' +
      'div:nth-child(3n) {\n' +
      '  margin-right: 0;\n' +
      '  float: right;\n' +
      '}\n' +
      'div:nth-child(3n + 1) {\n' +
      '  clear: both;\n' +
      '}'
    );
  });

  it('changes the flexbox default', function() {
    check(
      '@lost flexbox flex;\n' +
      'div {\n' +
      '  lost-column: 1/3;\n' +
      '}',

      'div {\n' +
      '  flex-grow: 0;\n' +
      '  flex-shrink: 0;\n' +
      '  flex-basis: calc(99.9% * 1/3 - (30px - 30px * 1/3));\n' +
      '  width: calc(99.9% * 1/3 - (30px - 30px * 1/3));\n' +
      '}\n' +
      'div:nth-child(1n) {\n' +
      '  margin-right: 30px;\n' +
      '  margin-left: 0;\n' +
      '}\n' +
      'div:last-child {\n' +
      '  margin-right: 0;\n' +
      '}\n' +
      'div:nth-child(3n) {\n' +
      '  margin-right: 0;\n' +
      '  margin-left: auto;\n' +
      '}'
    );
  });

  it('changes the cycle to none', function() {
    check(
      '@lost cycle none;\n' +
      'div {\n' +
      '  lost-column: 1/3;\n' +
      '}',

      'div {\n' +
      '  width: calc(99.9% * 1/3 - (30px - 30px * 1/3));\n' +
      '}\n' +
      'div:nth-child(1n) {\n' +
      '  float: left;\n' +
      '  margin-right: 30px;\n' +
      '  clear: none;\n' +
      '}\n' +
      'div:last-child {\n' +
      '  margin-right: 0;\n' +
      '}\n' +
      'div:nth-child(0n) {\n' +
      '  float: right;\n' +
      '}'
    );
  });

  it('changes the cycle to auto', function() {
    check(
      '@lost cycle auto;\n' +
      'div {\n' +
      '  lost-column: 1/3;\n' +
      '}',

      'div {\n' +
      '  width: calc(99.9% * 1/3 - (30px - 30px * 1/3));\n' +
      '}\n' +
      'div:nth-child(1n) {\n' +
      '  float: left;\n' +
      '  margin-right: 30px;\n' +
      '  clear: none;\n' +
      '}\n' +
      'div:last-child {\n' +
      '  margin-right: 0;\n' +
      '}\n' +
      'div:nth-child(3n) {\n' +
      '  margin-right: 0;\n' +
      '  float: right;\n' +
      '}\n' +
      'div:nth-child(3n + 1) {\n' +
      '  clear: both;\n' +
      '}'
    );
  });

  it('changes the cycle to number', function() {
    check(
      '@lost cycle 2;\n' +
      'div {\n' +
      '  lost-column: 1/3;\n' +
      '}',

      'div {\n' +
      '  width: calc(99.9% * 1/3 - (30px - 30px * 1/3));\n' +
      '}\n' +
      'div:nth-child(1n) {\n' +
      '  float: left;\n' +
      '  margin-right: 30px;\n' +
      '  clear: none;\n' +
      '}\n' +
      'div:last-child {\n' +
      '  margin-right: 0;\n' +
      '}\n' +
      'div:nth-child(2n) {\n' +
      '  margin-right: 0;\n' +
      '  float: right;\n' +
      '}\n' +
      'div:nth-child(2n + 1) {\n' +
      '  clear: both;\n' +
      '}'
    );
  });

  it('can adapt the global rounder', function() {
    check(
      '@lost rounder 100;\n' +
      'div {\n' +
      '  lost-column: 1/3;\n' +
      '}',

      'div {\n' +
      '  width: calc(100% * 1/3 - (30px - 30px * 1/3));\n' +
      '}\n' +
      'div:nth-child(1n) {\n' +
      '  float: left;\n' +
      '  margin-right: 30px;\n' +
      '  clear: none;\n' +
      '}\n' +
      'div:last-child {\n' +
      '  margin-right: 0;\n' +
      '}\n' +
      'div:nth-child(3n) {\n' +
      '  margin-right: 0;\n' +
      '  float: right;\n' +
      '}\n' +
      'div:nth-child(3n + 1) {\n' +
      '  clear: both;\n' +
      '}'
    );
  });
});
