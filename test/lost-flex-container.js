'use strict';

var check = require('./check');

describe('lost-flex-container', function() {
  it('flex for row', function() {
    check(
      'a { lost-flex-container: row }',
      'a { display: flex; flex-flow: row wrap }'
    );
  });

  it('flex for column', function() {
    check(
      'a { lost-flex-container: column }',
      'a { display: flex; flex-flow: column nowrap }'
    );
  });
});
