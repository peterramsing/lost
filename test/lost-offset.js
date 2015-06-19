'use strict';

var check = require('./check');

describe('lost-offset', function() {
  it('moves element to the left', function() {
    check(
      'a { lost-offset: 1/3; }',
      'a { margin-right: calc(99.99% * 1/3 - (30px - 30px * 1/3) + (30px * 2)' +
      ') !important; }'
    );
  });

  it('moves element to the right', function() {
    check(
      'a { lost-offset: -1/3; }',
      'a { margin-left: calc(99.99% * (-1/3 * -1) - (30px - 30px * ' +
      '(-1/3 * -1)) + 30px) !important; }'
    );
  });

  it('moves element up', function() {
    check(
      'a { lost-offset: 1/3 column; }',
      'a { margin-bottom: calc(99.99% * 1/3 - (30px - 30px * 1/3) + ' +
      '(30px * 2)) !important; }'
    );
  });

  it('moves element down', function() {
    check(
      'a { lost-offset: -1/3 column; }',
      'a { margin-top: calc(99.99% * (-1/3 * -1) - (30px - 30px * ' +
      '(-1/3 * -1)) + 30px) !important; }'
    );
  });

  it('supports custom gutter', function() {
    check(
      'a { lost-offset: 1/2 row 60px; }',
      'a { margin-right: calc(99.99% * 1/2 - (60px - 60px * 1/2) + ' +
      '(60px * 2)) !important; }'
    );
  });
});
