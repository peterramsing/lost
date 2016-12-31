'use strict';

var check = require('./check');

describe('lost-row', function() {
  it('provides 3 row layout', function() {
    check(
      'a { lost-row: 1/3; }',
      'a { width: 100%; height: calc(99.9% * 1/3 - (30px - 30px * 1/3));' +
      ' margin-bottom: 30px; }\n' +
      'a:last-child { margin-bottom: 0; }'
    );
  });

  it('provides 2/5 row layout', function() {
    check(
      'a { lost-row: 2/5; }',
      'a { width: 100%; height: calc(99.9% * 2/5 - (30px - 30px * 2/5));' +
      ' margin-bottom: 30px; }\n' +
      'a:last-child { margin-bottom: 0; }'
    );
  });

  it('supports no gutter', function() {
    check(
      'a { lost-row: 2/5 0; }',
      'a { width: 100%; height: calc(99.9% * 2/5); margin-bottom: 0; }\n' +
      'a:last-child { margin-bottom: 0; }'
    );
  });

  it('supports flexbox', function() {
    check(
      'a { lost-row: 2/6 60px flex; }',
      'a { width: 100%; flex: 0 0 auto;' +
      ' height: calc(99.9% * 2/6 - (60px - 60px * 2/6));' +
      ' margin-bottom: 60px; }\n' +
      'a:last-child { margin-bottom: 0; }'
    );
  });

  it('ignores bad unit', function() {
    check(
      'a { lost-row: 2/6 60px flex; lost-unit: $; }',
      'a { width: 100%; flex: 0 0 auto;' +
      ' height: calc(99.9% * 2/6 - (60px - 60px * 2/6));' +
      ' margin-bottom: 60px; }\n' +
      'a:last-child { margin-bottom: 0; }'
    );
  });

  it('Uses unit if one is passed', function() {
    check(
      'a { lost-row: 2/6 60px flex; lost-unit: vh; }',
      'a { width: 100%; flex: 0 0 auto;' +
      ' height: calc(99.9vh * 2/6 - (60px - 60px * 2/6));' +
      ' margin-bottom: 60px; }\n' +
      'a:last-child { margin-bottom: 0; }'
    );
  });

  it('provides none rule', function() {
    check(
      'a { lost-row: none; }',
      'a { width: auto; height: auto;' +
      ' margin-bottom: 0; }'
    );
  });
  describe('allows for customizable rounders', function() {
    it('100%', function() {
      check(
        'a { lost-row: 1/3; lost-row-rounder: 100; }',
        'a { width: 100%; height: calc(100% * 1/3 - (30px - 30px * 1/3));' +
        ' margin-bottom: 30px; }\n' +
        'a:last-child { margin-bottom: 0; }'
      );
    });

    it('99.99999999999%', function() {
      check(
        'a { lost-row: 1/3; lost-row-rounder: 99.99999999999; }',
        'a { width: 100%; height: calc(99.99999999999% * 1/3 - (30px - 30px * 1/3));' +
        ' margin-bottom: 30px; }\n' +
        'a:last-child { margin-bottom: 0; }'
      );
    });
  });
});
