'use strict';

var check = require('./check');

describe('lost-move', function() {
  it('moves element to the left', function() {
    check(
      'a { lost-move: 1/3; }',
      'a { position: relative; left: calc(99.9% * 1/3 - (30px - 30px * 1/3)' +
      ' + 30px); }'
    );
  });

  it('moves element to the right', function() {
    check(
      'a { lost-move: -1/3; }',
      'a { position: relative; left: calc(99.9% * -1/3 -' +
      ' (30px - 30px * -1/3) + 30px); }'
    );
  });

  it('moves element up', function() {
    check(
      'a { lost-move: 1/3 column; }',
      'a { position: relative; top: calc(99.9% * 1/3 - (30px - 30px * 1/3)' +
      ' + 30px); }'
    );
  });

  it('moves element down', function() {
    check(
      'a { lost-move: -1/3 column; }',
      'a { position: relative; top: calc(99.9% * -1/3 - (30px - 30px * -1/3)' +
      ' + 30px); }'
    );
  });

  it('supports custom gutter', function() {
    check(
      'a { lost-move: 1/2 row 60px; }',
      'a { position: relative; left: calc(99.9% * 1/2 - (60px - 60px * 1/2)' +
      ' + 60px); }'
    );
  });

  describe('allows for customizable rounders', function() {
    it('100%', function() {
      check(
        'a { lost-move: 1/2 row 60px; lost-move-rounder: 100; }',
        'a { position: relative; left: calc(100% * 1/2 - (60px - 60px * 1/2)' +
        ' + 60px); }'
      );
    });

    it('99.99999999999%', function() {
      check(
        'a { lost-move: 1/2 row 60px; lost-move-rounder: 99.99999999999; }',
        'a { position: relative; left: calc(99.99999999999% * 1/2 - (60px - 60px * 1/2)' +
        ' + 60px); }'
      );
    });
  });
});
