'use strict';

var check = require('./check');

describe('lost-center', function() {
  it('horizontally centers container', function() {
    check(
      'a { lost-center: 980px }',
      'a { *zoom: 1; max-width: 980px; margin-left: auto; margin-right: auto }\n' +
      'a:before { content: \'\'; display: table }\n' +
      'a:after { content: \'\'; display: table; clear: both }'
    );
  });

  it('adds 30px padding', function() {
    check(
      'a { lost-center: 980px 30px }',
      'a { *zoom: 1; max-width: 980px; margin-left: auto; margin-right: auto; padding-left: 30px; padding-right: 30px }\n' +
      'a:before { content: \'\'; display: table }\n' +
      'a:after { content: \'\'; display: table; clear: both }'
    );
  });

  it('uses flexbox', function() {
    check(
      'a { lost-center: 1140px 30px flex }',
      'a { display: flex; flex-flow: row wrap; max-width: 1140px; margin-left: auto; margin-right: auto; padding-left: 30px; padding-right: 30px }'
    );
  });
});
