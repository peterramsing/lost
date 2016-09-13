'use strict';

var check = require('./check');

describe('lost-masonry-wrap', function() {
  it('creates a flexbox wrapper', function() {
    check(
      'a { lost-masonry-wrap: flex; }',
      'a { display: flex; flex-flow: row wrap; margin-left: -15px;' +
      ' margin-right: -15px; }'
    );
  });

  it('creates a non-flexbox wrapper', function() {
    check(
      'a { lost-masonry-wrap: no-flex; }',
      'a { margin-left: -15px; margin-right: -15px; }\n' +
      'a:before { content: \'\'; display: table; }\n' +
      'a:after { content: \'\'; display: table; clear: both; }'
    );
  });

  it('support a custom gutter', function() {
    check(
      'a { lost-masonry-wrap: flex 60px; }',
      'a { display: flex; flex-flow: row wrap; margin-left: -30px;' +
      ' margin-right: -30px; }'
    );
  });
});
