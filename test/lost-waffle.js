'use strict';

var check = require('./check');

describe('lost-waffle', function() {
  it('provides 3 column layout', function() {
    check(
      'a { lost-waffle: 1/3; }',
      'a { width: calc(99.99% * 1/3 - (30px - 30px * 1/3));' +
      ' height: calc(99.99% * 1/3 - (30px - 30px * 1/3)); }\n' +
      'a:nth-child(1n) { float: left; margin-right: 30px;' +
      ' margin-bottom: 30px; clear: none; }\n' +
      'a:last-child { margin-right: 0; margin-bottom: 0; }\n' +
      'a:nth-child(3n) { margin-right: 0; float: right; }\n' +
      'a:nth-child(3n + 1) { clear: left; }\n' +
      'a:nth-last-child(-n + 3) { margin-bottom: 0; }'
    );
  });

  it('supports a custom cycle', function() {
    check(
      'a { lost-waffle: 2/4 2; }',
      'a { width: calc(99.99% * 2/4 - (30px - 30px * 2/4));' +
      ' height: calc(99.99% * 2/4 - (30px - 30px * 2/4)); }\n' +
      'a:nth-child(1n) { float: left; margin-right: 30px;' +
      ' margin-bottom: 30px; clear: none; }\n' +
      'a:last-child { margin-right: 0; margin-bottom: 0; }\n' +
      'a:nth-child(2n) { margin-right: 0; float: right; }\n' +
      'a:nth-child(2n + 1) { clear: left; }\n' +
      'a:nth-last-child(-n + 2) { margin-bottom: 0; }'
    );
  });

  it('supports a custom gutter', function() {
    check(
      'a { lost-waffle: 3/6 2 60px; }',
      'a { width: calc(99.99% * 3/6 - (60px - 60px * 3/6));' +
      ' height: calc(99.99% * 3/6 - (60px - 60px * 3/6)); }\n' +
      'a:nth-child(1n) { float: left; margin-right: 60px;' +
      ' margin-bottom: 60px; clear: none; }\n' +
      'a:last-child { margin-right: 0; margin-bottom: 0; }\n' +
      'a:nth-child(2n) { margin-right: 0; float: right; }\n' +
      'a:nth-child(2n + 1) { clear: left; }\n' +
      'a:nth-last-child(-n + 2) { margin-bottom: 0; }'
    );
  });

  it('supports flexbox', function() {
    check(
      'a { lost-waffle: 2/5 3 0 flex; }',
      'a { flex: 0 0 auto; width: calc(99.999999% * 2/5);' +
      ' height: calc(99.999999% * 2/5); }\n' +
      'a:nth-child(1n) { margin-right: 0; margin-bottom: 0; }\n' +
      'a:last-child { margin-right: 0; margin-bottom: 0; }\n' +
      'a:nth-child(3n) { margin-right: 0; float: right; }\n' +
      'a:nth-last-child(-n + 3) { margin-bottom: 0; }'
    );
  });
});
