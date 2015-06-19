'use strict';

var check = require('./check');

describe('lost-masonry-column', function() {
  it('supports a custom gutter', function() {
    check(
      'a { lost-masonry-column: 60px; }',
      'a { float: left; width: calc(99.99% * 60px - 30px); margin-left: 15px;' +
      ' margin-right: 15px; }'
    );
  });

  it('supports no gutter', function() {
    check(
      'a { lost-masonry-column: 0; }',
      'a { float: left; width: calc(99.99% * 0 - 30px); margin-left: 15px;' +
      ' margin-right: 15px; }'
    );
  });

  describe('flexbox', function() {
    it('supports a custom gutter', function() {
      check(
        'a { lost-masonry-column: 60px flex; }',
        'a { flex: 0 0 auto; width: calc(99.99% * 60px - 30px);' +
        ' margin-left: 15px; margin-right: 15px; }'
      );
    });

    it('supports no gutter', function() {
      check(
        'a { lost-masonry-column: 0 flex; }',
        'a { flex: 0 0 auto; width: calc(99.99% * 0 - 30px);' +
        ' margin-left: 15px; margin-right: 15px; }'
      );
    });
  });
});
