'use strict';

var check = require('./check');

describe('lost-center', function() {
  it('horizontally centers container', function() {
    check(
      'a { lost-center: 980px }',
      'a { max-width: 980px; margin-left: auto; margin-right: auto }\n' +
      'a:before { content: \'\'; display: table }\n' +
      'a:after { content: \'\'; display: table; clear: both }'
    );
  });

  it('adds 30px padding', function() {
    check(
      'a { lost-center: 980px 30px }',
      'a { max-width: 980px; margin-left: auto; margin-right: auto; padding-left: 30px; padding-right: 30px }\n' +
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

  it('uses no-flexbox', function() {
    check(
      'a { lost-center: 1140px 30px no-flex }',
      'a { max-width: 1140px; margin-left: auto; margin-right: auto; padding-left: 30px; padding-right: 30px }\n' +
      'a:before { content: \'\'; display: table }\n' +
      'a:after { content: \'\'; display: table; clear: both }'
    );
  });

  it('lost-center-padding', function() {
    check(
      'a { lost-center: 1140px 30px; lost-center-padding: 10px }',

      'a { max-width: 1140px; margin-left: auto; margin-right: auto; padding-left: 10px; padding-right: 10px }\n' +
      'a:before { content: \'\'; display: table }\n' +
      'a:after { content: \'\'; display: table; clear: both }'
    );
  });

  it('lost-center-flexbox', function() {
    check(
      'a { lost-center: 1140px 30px; lost-center-flexbox: flex }',

      'a { display: flex; flex-flow: row wrap; max-width: 1140px; margin-left: auto; margin-right: auto; padding-left: 30px; padding-right: 30px }'
    );
  });
});
