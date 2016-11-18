'use strict'

var expect = require('chai').expect;
var lgLogic = require('../lib/_lg-logic.js');


describe('calcValue works as it should', () => {
  it('gutter, rounder, and unit ✅', () => {
    var testCase = lgLogic.calcValue('1/3', '30px', 100, 'vw');

    var expectedResult = `calc(100vw * 1/3 - (30px - 30px * 1/3))`;

    expect(testCase).to.equal(expectedResult);
  });
  it('no gutter ✅', () => {
    var testCase = lgLogic.calcValue('1/3', '0', 99.9);

    var expectedResult = `calc(99.9% * 1/3)`;

    expect(testCase).to.equal(expectedResult);
  });
  it('no gutter ✅  when gutter is undefined', () => {
    var testCase = lgLogic.calcValue('1/3', undefined, 99.9);

    var expectedResult = `calc(99.9% * 1/3)`;

    expect(testCase).to.equal(expectedResult);
  });
});

describe('Units are validated based on if they make sense', () => {
  it('only allows what is in the array of accepted units', () => {
    expect(lgLogic.validateUnit('vw', ['%','vw'])).to.be.true;
    expect(lgLogic.validateUnit('%', ['%','vw'])).to.be.true;
    expect(lgLogic.validateUnit('px', ['%','vw', 'px', 'em'])).to.be.true;
    expect(lgLogic.validateUnit('foobar', ['%','vw'])).to.not.be.true;
    expect(lgLogic.validateUnit(3, ['%','vw'])).to.not.be.true;
  });
});
