'use strict';

var check = require('./check');

describe('lost-masonry-column', function() {
  describe('Custom Gutter', function() {
    it('supports a custom gutter', function() {
      check(
        'a { lost-masonry-column: 60px; lost-masonry-column-gutter: 20px; }',
        'a { float: left; width: calc(99.9% * 60px - 20px); margin-left: 10px;' +
        ' margin-right: 10px; }'
      );
    });

    it('supports no gutter', function() {
      check(
        'a { lost-masonry-column: 60px; lost-masonry-column-gutter: 0px; }',
        'a { float: left; width: calc(99.9% * 60px - 0px); margin-left: 0;' +
        ' margin-right: 0; }'
      );
      check(
        'a { lost-masonry-column: 60px; lost-masonry-column-gutter: 0; }',
        'a { float: left; width: calc(99.9% * 60px); margin-left: 0;' +
        ' margin-right: 0; }'
      );
    });
  });

  describe('flexbox', function() {
    it('supports flexbox with long-form property', function() {
      check(
        'a { lost-masonry-column: 60px; lost-masonry-column-flexbox: flex; }',
        'a { flex: 0 0 auto; width: calc(99.9% * 60px - 30px);' +
        ' margin-left: 15px; margin-right: 15px; }'
      );
    });

    it('supports a custom gutter', function() {
      check(
        'a { lost-masonry-column: 60px 10px flex; }',
        'a { flex: 0 0 auto; width: calc(99.9% * 60px - 10px);' +
        ' margin-left: 5px; margin-right: 5px; }'
      );
    });

    it('supports flexbox without specifying custom gutter', function() {
      check(
        'a { lost-masonry-column: 60px flex; }',
        'a { flex: 0 0 auto; width: calc(99.9% * 60px - 30px);' +
        ' margin-left: 15px; margin-right: 15px; }'
      );
    });
  });

  describe('non-flexbox', function() {
    it('supports non-flexbox', function() {
      check(
        'a { lost-masonry-column: 60px no-flex; }',
        'a { float: left; width: calc(99.9% * 60px - 30px); margin-left: 15px;' +
        ' margin-right: 15px; }'
      );

      check(
        'a { lost-masonry-column: 60px; lost-masonry-column-flexbox: no-flex; }',
        'a { float: left; width: calc(99.9% * 60px - 30px); margin-left: 15px;' +
        ' margin-right: 15px; }'
      );
    });
  });

  describe('allows for customizable rounders', function() {
    it('100%', function() {
      check(
        'a { lost-masonry-column: 60px; lost-masonry-column-rounder: 99.99999999999; }',
        'a { float: left; width: calc(99.99999999999% * 60px - 30px); margin-left: 15px;' +
        ' margin-right: 15px; }'
      );
    });

    it('99.99999999999%', function() {
      check(
        'a { lost-masonry-column: 60px; lost-masonry-column-rounder: 100; }',
        'a { float: left; width: calc(100% * 60px - 30px); margin-left: 15px;' +
        ' margin-right: 15px; }'
      );
    });
  });
});
