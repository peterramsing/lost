'use strict';

var check = require('./check');

describe('lost-center', function() {
  it('Ignores bad unit', function() {
    check(
      'a { lost-center: 4/12; lost-unit: $ }',

      'a { max-width: calc(99.9% * 4/12); margin-left: auto; margin-right: auto }\n' +
        "a:before { content: ''; display: table }\n" +
        "a:after { content: ''; display: table; clear: both }"
    );
  });

  it('Uses unit if one is passed', function() {
    check(
      'a { lost-center: 3/9; lost-unit: vw }',

      'a { max-width: calc(99.9vw * 3/9); margin-left: auto; margin-right: auto }\n' +
        "a:before { content: ''; display: table }\n" +
        "a:after { content: ''; display: table; clear: both }"
    );
  });

  it('generates valid output given spaces are present in the input', function() {
    check(
      'a { lost-center: 3 / 9; lost-unit: vw }',

      'a { max-width: calc(99.9vw * 3/9); margin-left: auto; margin-right: auto }\n' +
        "a:before { content: ''; display: table }\n" +
        "a:after { content: ''; display: table; clear: both }"
    );
  });

  it('horizontally centers container', function() {
    check(
      'a { lost-center: 980px }',
      'a { max-width: 980px; margin-left: auto; margin-right: auto }\n' +
        "a:before { content: ''; display: table }\n" +
        "a:after { content: ''; display: table; clear: both }"
    );
  });

  it('horizontally centers container (fraction)', function() {
    check(
      'a { lost-center: 2/6 }',

      'a { max-width: calc(99.9% * 2/6); margin-left: auto; margin-right: auto }\n' +
        "a:before { content: ''; display: table }\n" +
        "a:after { content: ''; display: table; clear: both }"
    );
  });

  it('adds 30px padding', function() {
    check(
      'a { lost-center: 980px 30px }',
      'a { max-width: 980px; margin-left: auto; margin-right: auto; padding-left: 30px; padding-right: 30px }\n' +
        "a:before { content: ''; display: table }\n" +
        "a:after { content: ''; display: table; clear: both }"
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
        "a:before { content: ''; display: table }\n" +
        "a:after { content: ''; display: table; clear: both }"
    );
  });

  it('lost-center-padding', function() {
    check(
      'a { lost-center: 1140px 30px; lost-center-padding: 10px }',

      'a { max-width: 1140px; margin-left: auto; margin-right: auto; padding-left: 10px; padding-right: 10px }\n' +
        "a:before { content: ''; display: table }\n" +
        "a:after { content: ''; display: table; clear: both }"
    );
  });

  it('lost-center-flexbox', function() {
    check(
      'a { lost-center: 1140px 30px; lost-center-flexbox: flex }',

      'a { display: flex; flex-flow: row wrap; max-width: 1140px; margin-left: auto; margin-right: auto; padding-left: 30px; padding-right: 30px }'
    );
  });

  it('overrides global flex when told to', function() {
    check(
      '@lost flexbox flex; .root { lost-center: 600px no-flex; }',
      '.root { max-width: 600px; margin-left: auto; margin-right: auto; }\n' +
        ".root:before { content: ''; display: table; }\n" +
        ".root:after { content: ''; display: table; clear: both; }"
    );
    check(
      '@lost flexbox flex; .root { lost-center: 600px; lost-center-flexbox: no-flex;}',
      '.root { max-width: 600px; margin-left: auto; margin-right: auto; }\n' +
        ".root:before { content: ''; display: table; }\n" +
        ".root:after { content: ''; display: table; clear: both; }"
    );
  });
});
