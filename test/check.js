'use strict';

const expect = require('chai').expect;
const lost = require('../lost');
const cleanCss = require('clean-css');
const postcss = require('postcss');

module.exports = function check(input, output, options) {
  const cleanOutput = new cleanCss({}).minify(output);

  postcss([lost(options)])
    .process(input)
    .then(async (result) => {
      const cleanInput = new cleanCss({}).minify(result.css);

      expect(cleanOutput.styles).to.equal(cleanInput.styles);
    });
};
