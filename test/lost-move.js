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
});
