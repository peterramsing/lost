'use strict';

var expect  = require('chai').expect;
var lost    = require('../lost');
var postcss = require('postcss');
var CssSyntaxError = require('postcss').CssSyntaxError;

module.exports = function throws( input, message, opts ) {
  var processor = postcss([lost(opts)]);
  expect(function(){
    return processor.process(input).css;
  }).to.throw(CssSyntaxError, message);
};
