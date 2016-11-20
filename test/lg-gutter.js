'use strict'

var expect = require('chai').expect;
var lgLogic = require('../lib/_lg-gutter.js');



var check = require('./check');

describe('lost-gutter', function() {
  it('replaces $lost-gutter with global', function() {
    check(
      `div { padding: $lost-gutter; }`,
      `div { padding: 30px; }`
    );
    check(
      `div { margin: 25px $lost-gutter; }`,
      `div { margin: 25px 30px; }`
    );
    check(
      `div { margin: 25px $lost-gutter $lost-gutter; }`,
      `div { margin: 25px 30px 30px; }`
    );
  });
  it('replaces $lost-gutter with global when global is not default', function() {
    check(
      `@lost gutter 40px; div { padding: $lost-gutter; }`,
      `div { padding: 40px; }`
    );
  });
});
