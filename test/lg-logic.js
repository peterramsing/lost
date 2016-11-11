'use strict'

var expect = require('chai').expect;
var lgLogic = require('../lib/_lg-logic.js');


describe('calcValue works as it should', () => {
  it('gutter and rounder ✅', () => {
    var testCase = lgLogic.calcValue('1/3', '30px', 100);

    var expectedResult = `calc(100% * 1/3 - (30px - 30px * 1/3))`;

    expect(testCase).to.equal(expectedResult);
  });
  it('no gutter ✅', () => {
    var testCase = lgLogic.calcValue('1/3', '0', 99.9);

    var expectedResult = `calc(99.9% * 1/3)`;

    expect(testCase).to.equal(expectedResult);
  });
  it('no gutter ✅ when gutter is undefined', () => {
    var testCase = lgLogic.calcValue('1/3', undefined, 99.9);

    var expectedResult = `calc(99.9% * 1/3)`;

    expect(testCase).to.equal(expectedResult);
  });
});
