'use strict';

var check = require('./check');

describe('lost-flex-container', () => {
  it('flex for row', () => {
    check(
      'a { lost-flex-container: row }',
      'a { display: flex; flex-flow: row wrap }'
    );
  });

  it('flex for column', () => {
    check(
      'a { lost-flex-container: column }',
      'a { display: flex; flex-flow: column nowrap }'
    );
  });
});
