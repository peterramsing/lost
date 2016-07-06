'use strict';

var expect  = require('chai').expect;
var lost    = require('../lost');
var postcss = require('postcss');

module.exports = function check( input, output, opts ) {
  var processor = postcss([lost(opts)]);

  expect(processor.process(input).css).to.equal(output);
};
