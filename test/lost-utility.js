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

  it('applies clearfix', function() {
    check(
      'a { lost-utility: clearfix }',
      'a { *zoom: 1 }\n' +
      'a:before { content: \'\'; display: table }\n' +
      'a:after { content: \'\'; display: table; clear: both }'
    );
  });
});
