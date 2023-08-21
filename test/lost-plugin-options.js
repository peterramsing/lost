'use strict';

const postcss = require('postcss');
const {lost} = require('../dist/lost');
const expect = require('chai').expect;

describe('plugin-options', () => {
  it('set options with plugin options', async () => {
    const input = `
    div {
      lost-column: 1/2;
    }
    `;
    const output = `
    div {
      flex-grow: 0;
      flex-shrink: 0;
      flex-basis: calc(99.9% * 1/2 - (15px - 15px * 1/2));
      max-width: calc(99.9% * 1/2 - (15px - 15px * 1/2));
      width: calc(99.9% * 1/2 - (15px - 15px * 1/2));
    }
    div:nth-child(1n) {
      margin-right: 15px;
      margin-left: 0;
    }
    div:last-child {
      margin-right: 0;
    }
    div:nth-child(2n) {
      margin-right: 0;
      margin-left: auto;
    }
    `;
    const result = await postcss([
      lost({
        gutter: '15px',
        flexbox: 'flex',
        cycle: 'auto'
      })
    ])
      .process(input);
      expect(result.css).to.equal(output);
  });
});
