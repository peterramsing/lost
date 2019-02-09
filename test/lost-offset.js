'use strict';

var check = require('./check');

describe('lost-offset', function() {
  it('Supports direction in new property', function() {
    check(
      'a { lost-offset: 0/3; lost-offset-direction: row; }',
      'a { margin-left: 0 !important; margin-right: 30px !important; }'
    );
  });

  it('Supports gutter in new property', function() {
    check(
      'a { lost-offset: 0/3; lost-offset-gutter: 10px; }',
      'a { margin-left: 0 !important; margin-right: 10px !important; }'
    );
  });

  it('generates valid output even with spaces at various places in the declaration', function() {
    check(
      'a { lost-offset: 1 / 3; }',
      'a { margin-left: calc(99.9% * (-1/3 * -1) - (30px - 30px * (-1/3 * -1)) + 30px' +
        ') !important; }'
    );
  });

  it("Does not move with a zero numerator (of you're so inclined)", function() {
    check(
      'a { lost-offset: 0/3; }',
      'a { margin-left: 0 !important; margin-right: 30px !important; }'
    );

    check(
      'a { lost-offset: 0/3 column; }',
      'a { margin-top: 0 !important; margin-bottom: 30px !important; }'
    );
  });

  it('moves element to the left', function() {
    check(
      'a { lost-offset: 1/3; }',
      'a { margin-left: calc(99.9% * (-1/3 * -1) - (30px - 30px * (-1/3 * -1)) + 30px' +
        ') !important; }'
    );
  });

  it('moves element to the right', function() {
    check(
      'a { lost-offset: -1/3; }',
      'a { margin-left: calc(99.9% * -1/3 - (30px - 30px * ' +
        '-1/3) + 30px) !important; }'
    );
    check(
      'a { lost-offset: -1/3 row 0; }',
      'a { margin-left: calc(99.9% * -1/3) !important; }'
    );
  });

  it('moves element up', function() {
    check(
      'a { lost-offset: 1/3 column; }',
      'a { margin-bottom: calc(99.9% * 1/3 - (30px - 30px * 1/3) + ' +
        '(30px * 2)) !important; }'
    );
  });

  it('moves element down', function() {
    check(
      'a { lost-offset: -1/3 column; }',
      'a { margin-top: calc(99.9% * (-1/3 * -1) - (30px - 30px * ' +
        '(-1/3 * -1)) + 30px) !important; }'
    );
  });

  it('supports custom gutter', function() {
    check(
      'a { lost-offset: 1/2 row 60px; }',
      'a { margin-left: calc(99.9% * (-1/2 * -1) - (60px - 60px * (-1/2 * -1)) + ' +
        '60px) !important; }'
    );

    check(
      'a { lost-offset: 1/2 row 0; }',
      'a { margin-left: calc(99.9% * 1/2)!important; }'
    );

    check(
      'a { lost-offset: 1/2 column 0; }',
      'a { margin-bottom: calc(99.9% * 1/2)!important; }'
    );

    check(
      'a { lost-offset: -1/2 column 0; }',
      'a { margin-top: calc(99.9% * -1/2)!important; }'
    );
  });
  describe('allows for customizable rounders', function() {
    it('100%', function() {
      check(
        'a { lost-offset: 1/2 row 60px; lost-offset-rounder: 100; }',
        'a { margin-left: calc(100% * (-1/2 * -1) - (60px - 60px * (-1/2 * -1)) + ' +
          '60px) !important; }'
      );
    });

    it('99.99999999999%', function() {
      check(
        'a { lost-offset: 1/2 row 60px; lost-offset-rounder: 99.99999999999; }',
        'a { margin-left: calc(99.99999999999% * (-1/2 * -1) - (60px - 60px * (-1/2 * -1)) + ' +
          '60px) !important; }'
      );
    });
  });

  describe('disables the offset', function() {
    it('disables for row', function() {
      check(
        'a { lost-offset: clear; }',
        'a { margin-left: auto!important; margin-right: auto!important; }'
      );
      check(
        'a { lost-offset: clear-left; }',
        'a { margin-left: auto!important; }'
      );
      check(
        'a { lost-offset: clear-right; }',
        'a { margin-right: auto!important; }'
      );
    });
    it('disables for column', function() {
      check(
        'a { lost-offset: clear column; }',
        'a { margin-top: auto!important; margin-bottom: auto!important; }'
      );
      check(
        'a { lost-offset: clear-top column; }',
        'a { margin-top: auto!important; }'
      );
      check(
        'a { lost-offset: clear-bottom column; }',
        'a { margin-bottom: auto!important; }'
      );
    });
  });
});
