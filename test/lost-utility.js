'use strict';

var check = require('./check');

describe('lost-utility', function() {
  it('applies edit indicator', function() {
    check(
      'a { lost-utility: edit }',
      'a *:not(input):not(textarea):not(select) {\n' +
      '    background-color: rgba(0, 0, 255, 0.1)\n' +
      '}'
    );
  });

  it('applies edit indicator with color', function() {
    check(
      'a { lost-utility: edit rgb(44, 55, 33) }',
      'a *:not(input):not(textarea):not(select) {\n' +
      '    background-color: rgba(44, 55, 33, 0.1)\n' +
      '}'
    ),
    check(
      'a { lost-utility: edit rgb(44,55,111) }',
      'a *:not(input):not(textarea):not(select) {\n' +
      '    background-color: rgba(44,55,111, 0.1)\n' +
      '}'
    );
  });

  it('applies clearfix', function() {
    check(
      'a { lost-utility: clearfix }',
      'a:before {\n' +
      '    content: \'\';\n' +
      '    display: table\n' +
      '}\n' +
      'a:after {\n' +
      '    content: \'\';\n' +
      '    display: table;\n' +
      '    clear: both\n' +
      '}'
    );
  });
});
