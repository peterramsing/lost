'use strict';

var check = require('./check');

describe('lost-column', function() {
  it('provides 3 column layout', function() {
    check(
      'a { lost-column: 1/3; }',
      'a { width: calc(99.99% * 1/3 - (30px - 30px * 1/3)); }\n' +
      'a:nth-child(n) { float: left; margin-right: 30px; clear: none; }\n' +
      'a:last-child { margin-right: 0; }\n' +
      'a:nth-child(3n) { margin-right: 0; }\n' +
      'a:nth-child(3n + 1) { clear: left; }'
    );
  });

  it('provides 2/5 column layout', function() {
    check(
      'a { lost-column: 2/5; }',
      'a { width: calc(99.99% * 2/5 - (30px - 30px * 2/5)); }\n' +
      'a:nth-child(n) { float: left; margin-right: 30px; clear: none; }\n' +
      'a:last-child { margin-right: 0; }\n' +
      'a:nth-child(5n) { margin-right: 0; }\n' +
      'a:nth-child(5n + 1) { clear: left; }'
    );
  });

  it('can support custom cycle', function() {
    check(
      'a { lost-column: 2/4 2; }',
      'a { width: calc(99.99% * 2/4 - (30px - 30px * 2/4)); }\n' +
      'a:nth-child(n) { float: left; margin-right: 30px; clear: none; }\n' +
      'a:last-child { margin-right: 0; }\n' +
      'a:nth-child(2n) { margin-right: 0; }\n' +
      'a:nth-child(2n + 1) { clear: left; }'
    );
  });

  it('supports no gutter', function() {
    check(
      'a { lost-column: 2/5 3 0; }',
      'a { width: calc(99.999999% * 2/5); }\n' +
      'a:nth-child(n) { float: left; margin-right: 0; clear: none; }\n' +
      'a:last-child { margin-right: 0; }\n' +
      'a:nth-child(3n) { margin-right: 0; }\n' +
      'a:nth-child(3n + 1) { clear: left; }'
    );
  });

  it('supports flexbox', function() {
    check(
      'a { lost-column: 2/6 3 60px flex; }',
      'a { flex: 0 0 auto; width: calc(99.99% * 2/6 - (60px - 60px * 2/6));' +
      ' }\n' +
      'a:nth-child(n) { margin-right: 60px; }\n' +
      'a:last-child { margin-right: 0; }\n' +
      'a:nth-child(3n) { margin-right: 0; }'
    );
  });
});
