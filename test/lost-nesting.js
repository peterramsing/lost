'use strict';

var pluginCheck = require('./check');

describe('nesting-queries', () => {
  it('should retain media nesting', () => {
    pluginCheck(
      `
      body {
        background: green;
        @media (min-width: 768px) {
            background: red;
        }
      }
      `,
      `
      body {
        background: green
      }
      @media (min-width: 768px) {
        body {
          background: red
        }
      }
      `
    );
  });
});
