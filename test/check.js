'use strict';

var expect = require('chai').expect;
var lost = require('../lost');
var cleanCss = require('clean-css');
var postcss = require('postcss');
const postcssPresetEnv = require('postcss-preset-env');

module.exports = function check(input, output, options) {
  var processor = postcss([lost(options)]);
  var cleanInput = new cleanCss({}).minify(processor.process(input).css);
  var cleanOutput = new cleanCss({}).minify(output);

  expect(cleanInput.styles).to.equal(cleanOutput.styles);
};

module.exports = function pluginCheck(input, output, options) {
  let cleanInput, cleanOutput;

  postcss([postcssPresetEnv({ stage: 0 }), lost(options)])
    .process(input)
    .then(async (result) => {
      cleanInput = new cleanCss({}).minify(processor.process(input).css);
      cleanOutput = new cleanCss({}).minify(output);

      expect(cleanInput.styles).to.equal(cleanOutput.styles);
    });
};
