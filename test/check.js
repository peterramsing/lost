'use strict';

var expect = require('chai').expect;
var lost = require('../lost');
var cleanCss = require('clean-css');
var postcss = require('postcss');

module.exports = function check(input, output, opts) {
  var processor = postcss([lost(opts)]);
  var cleanInput = new cleanCss({}).minify(processor.process(input).css);
  var cleanOutput = new cleanCss({}).minify(output);

  expect(cleanInput.styles).to.equal(cleanOutput.styles);
};
