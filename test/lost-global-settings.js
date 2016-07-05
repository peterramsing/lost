'use strict';

var check = require('./check');

describe('lost-global-settings', function() {
  it('resets global settings between builds', function() {
    check(
      '@lost clearing left; \n' +
      'a { lost-column: 1/3; }',
      'a { width: calc(99.9% * 1/3 - (30px - 30px * 1/3)); }\n' +
      'a:nth-child(1n) { float: left; margin-right: 30px; clear: none; }\n' +
      'a:last-child { margin-right: 0; }\n' +
      'a:nth-child(3n) { margin-right: 0; float: right; }\n' +
      'a:nth-child(3n + 1) { clear: left; }'
    );

    check(
      'a { lost-column: 1/3; }',
      'a { width: calc(99.9% * 1/3 - (30px - 30px * 1/3)); }\n' +
      'a:nth-child(1n) { float: left; margin-right: 30px; clear: none; }\n' +
      'a:last-child { margin-right: 0; }\n' +
      'a:nth-child(3n) { margin-right: 0; float: right; }\n' +
      'a:nth-child(3n + 1) { clear: both; }'
    );
  });
});
