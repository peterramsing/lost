'use strict';

var check = require('./check');

describe('lost-move', function() {
  it('moves element to the left', function() {
    check(
      'a { lost-move: 1/3; }',
      'a { position: relative; left: calc(99.99% * 1/3 - (30px - 30px * 1/3)' +
      ' + 30px); }'
    );
  });

  it('moves element to the right', function() {
    check(
      'a { lost-move: -1/3; }',
      'a { position: relative; left: calc(99.99% * -1/3 -' +
      ' (30px - 30px * -1/3) + 30px); }'
    );
  });

  it('moves element up', function() {
    check(
      'a { lost-move: 1/3 column; }',
      'a { position: relative; top: calc(99.99% * 1/3 - (30px - 30px * 1/3)' +
      ' + 30px); }'
    );
  });

  it('moves element down', function() {
    check(
      'a { lost-move: -1/3 column; }',
      'a { position: relative; top: calc(99.99% * -1/3 - (30px - 30px * -1/3)' +
      ' + 30px); }'
    );
  });

  it('supports custom gutter', function() {
    check(
      'a { lost-move: 1/2 row 60px; }',
      'a { position: relative; left: calc(99.99% * 1/2 - (60px - 60px * 1/2)' +
      ' + 60px); }'
    );
  });
  it('supports retaining gutter set by lost-column', function() {
    check(
      'a { lost-column: 1/3 0 0} \m a { lost-move: 1/3}',
      'a { width: calc(99.999999% * 1/3)}\n' +
      'a:nth-child(n) { float: left; margin-right: 0; clear: none}\n' +
      'a:last-child { margin-right: 0}\n' +
      'a:nth-child(0n) { margin-right: 0}\n' +
      'a:nth-child(0n + 1) { clear: left}\n' +
      'a { position: relative; left: calc(99.99% * 1/3)' +
      ' + 30px); }'
    );
  });
});
