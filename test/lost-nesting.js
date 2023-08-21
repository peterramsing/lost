'use strict';

const check = require('./check');
const postcss = require('postcss');
const postcssPresetEnv = require('postcss-preset-env');
const {lost} = require('../dist/lost');
const expect = require('chai').expect;

describe('nesting-queries', () => {
  it('should retain media nesting with just LostGrid processing', () => {
    check(
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
        background: green;
        
        @media (min-width: 768px) {
            background: red;
        }
      }
      `
    );
  });
  it('should allow plugins to function', () => {
    const input = `
    body {
      background: green;
      
      @media (min-width: 768px) {
          & {
            background: red;
          }
      }
    }
    `;
    const output = `
    body {
      background: green
    }
@media (min-width: 768px) {
          body {
            background: red;
          }
      }
    `;
    postcss([
      lost(),
      postcssPresetEnv({
        features: {
          'nesting-rules': true,
        },
      }),
    ])
      .process(input)
      .then(async (result) => {
        expect(output).to.equal(result.css);
      });
  });
});
