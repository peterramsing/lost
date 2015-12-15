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

  it('supports flexbox 1st', function() {
    check(
      'a { lost-column: flex 2/6 3 60px; }',
      'a { flex: 0 0 auto; width: calc(99.99% * 2/6 - (60px - 60px * 2/6));' +
      ' }\n' +
      'a:nth-child(n) { margin-right: 60px; }\n' +
      'a:last-child { margin-right: 0; }\n' +
      'a:nth-child(3n) { margin-right: 0; }'
    );
  });

  it('supports flexbox 2nd', function() {
    check(
      'a { lost-column: 2/6 flex 3 60px; }',
      'a { flex: 0 0 auto; width: calc(99.99% * 2/6 - (60px - 60px * 2/6));' +
      ' }\n' +
      'a:nth-child(n) { margin-right: 60px; }\n' +
      'a:last-child { margin-right: 0; }\n' +
      'a:nth-child(3n) { margin-right: 0; }'
    );
  });

  it('supports flexbox 3rd', function() {
    check(
      'a { lost-column: 2/6 3 flex 60px; }',
      'a { flex: 0 0 auto; width: calc(99.99% * 2/6 - (60px - 60px * 2/6));' +
      ' }\n' +
      'a:nth-child(n) { margin-right: 60px; }\n' +
      'a:last-child { margin-right: 0; }\n' +
      'a:nth-child(3n) { margin-right: 0; }'
    );
  });

  it('supports flexbox 4th', function() {
    check(
      'a { lost-column: 2/6 3 60px flex; }',
      'a { flex: 0 0 auto; width: calc(99.99% * 2/6 - (60px - 60px * 2/6));' +
      ' }\n' +
      'a:nth-child(n) { margin-right: 60px; }\n' +
      'a:last-child { margin-right: 0; }\n' +
      'a:nth-child(3n) { margin-right: 0; }'
    );
  });

  it('supports flexbox 5th', function() {
    check(
      'a { lost-column: 2/6 3 60px nth-of-type flex; }',
      'a { flex: 0 0 auto; width: calc(99.99% * 2/6 - (60px - 60px * 2/6));' +
      ' }\n' +
      'a:nth-of-type(n) { margin-right: 60px; }\n' +
      'a:last-of-type { margin-right: 0; }\n' +
      'a:nth-of-type(3n) { margin-right: 0; }'
    );
  });

  it('supports cycle 1st', function() {
    check(
      'a { lost-column: 2 2/3 40px flex; }',
      'a { flex: 0 0 auto; width: calc(99.99% * 2/3 - (40px - 40px * 2/3));' +
      ' }\n' +
      'a:nth-child(n) { margin-right: 40px; }\n' +
      'a:last-child { margin-right: 0; }\n' +
      'a:nth-child(2n) { margin-right: 0; }'
    );
  });

  it('supports cycle 2nd', function() {
    check(
      'a { lost-column: 2/3 2 40px flex; }',
      'a { flex: 0 0 auto; width: calc(99.99% * 2/3 - (40px - 40px * 2/3));' +
      ' }\n' +
      'a:nth-child(n) { margin-right: 40px; }\n' +
      'a:last-child { margin-right: 0; }\n' +
      'a:nth-child(2n) { margin-right: 0; }'
    );
  });

  it('supports cycle 3rd', function() {
    check(
      'a { lost-column: 2/3 40px 2 flex; }',
      'a { flex: 0 0 auto; width: calc(99.99% * 2/3 - (40px - 40px * 2/3));' +
      ' }\n' +
      'a:nth-child(n) { margin-right: 40px; }\n' +
      'a:last-child { margin-right: 0; }\n' +
      'a:nth-child(2n) { margin-right: 0; }'
    );
  });

  it('supports cycle 4th', function() {
    check(
      'a { lost-column: 2/3 40px flex 2; }',
      'a { flex: 0 0 auto; width: calc(99.99% * 2/3 - (40px - 40px * 2/3));' +
      ' }\n' +
      'a:nth-child(n) { margin-right: 40px; }\n' +
      'a:last-child { margin-right: 0; }\n' +
      'a:nth-child(2n) { margin-right: 0; }'
    );
  });

  it('supports cycle 5th', function() {
    check(
      'a { lost-column: 2/3 40px flex nth-of-type 2; }',
      'a { flex: 0 0 auto; width: calc(99.99% * 2/3 - (40px - 40px * 2/3));' +
      ' }\n' +
      'a:nth-of-type(n) { margin-right: 40px; }\n' +
      'a:last-of-type { margin-right: 0; }\n' +
      'a:nth-of-type(2n) { margin-right: 0; }'
    );
  });

  it('supports nth-of-type', function() {
    check(
      'a { lost-column: 1/3 nth-of-type; }',
      'a { width: calc(99.99% * 1/3 - (30px - 30px * 1/3)); }\n' +
      'a:nth-of-type(n) { float: left; margin-right: 30px; clear: none; }\n' +
      'a:last-of-type { margin-right: 0; }\n' +
      'a:nth-of-type(3n) { margin-right: 0; }\n' +
      'a:nth-of-type(3n + 1) { clear: left; }'
    );
  });

  it('supports nth-of-type 1st', function() {
    check(
      'a { lost-column: nth-of-type 2/3 40px flex 2; }',
      'a { flex: 0 0 auto; width: calc(99.99% * 2/3 - (40px - 40px * 2/3));' +
      ' }\n' +
      'a:nth-of-type(n) { margin-right: 40px; }\n' +
      'a:last-of-type { margin-right: 0; }\n' +
      'a:nth-of-type(2n) { margin-right: 0; }'
    );
  });

  it('supports nth-of-type 2nd', function() {
    check(
      'a { lost-column: 2/3 nth-of-type 40px flex 2; }',
      'a { flex: 0 0 auto; width: calc(99.99% * 2/3 - (40px - 40px * 2/3));' +
      ' }\n' +
      'a:nth-of-type(n) { margin-right: 40px; }\n' +
      'a:last-of-type { margin-right: 0; }\n' +
      'a:nth-of-type(2n) { margin-right: 0; }'
    );
  });

  it('supports nth-of-type 3rd', function() {
    check(
      'a { lost-column: 2/3 40px nth-of-type flex 2; }',
      'a { flex: 0 0 auto; width: calc(99.99% * 2/3 - (40px - 40px * 2/3));' +
      ' }\n' +
      'a:nth-of-type(n) { margin-right: 40px; }\n' +
      'a:last-of-type { margin-right: 0; }\n' +
      'a:nth-of-type(2n) { margin-right: 0; }'
    );
  });

  it('supports nth-of-type 4th', function() {
    check(
      'a { lost-column: 2/3 40px flex nth-of-type 2; }',
      'a { flex: 0 0 auto; width: calc(99.99% * 2/3 - (40px - 40px * 2/3));' +
      ' }\n' +
      'a:nth-of-type(n) { margin-right: 40px; }\n' +
      'a:last-of-type { margin-right: 0; }\n' +
      'a:nth-of-type(2n) { margin-right: 0; }'
    );
  });

  it('supports nth-of-type 5th', function() {
    check(
      'a { lost-column: 2/3 40px flex 2 nth-of-type; }',
      'a { flex: 0 0 auto; width: calc(99.99% * 2/3 - (40px - 40px * 2/3));' +
      ' }\n' +
      'a:nth-of-type(n) { margin-right: 40px; }\n' +
      'a:last-of-type { margin-right: 0; }\n' +
      'a:nth-of-type(2n) { margin-right: 0; }'
    );
  });

});
