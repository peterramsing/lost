'use strict';

const expect = require('chai').expect;
const { lost } = require('../dist/lost');
const cleanCss = require('clean-css');
const postcss = require('postcss');

module.exports = function check(input, output, options) {
  let processor = postcss([lost(options)]);
   let cleanInput = new cleanCss({}).minify(processor.process(input).css);
   let cleanOutput = new cleanCss({}).minify(output);

   expect(cleanInput.styles).to.equal(cleanOutput.styles);
};
