'use strict'

const expect = require('chai').expect;
const lgLogic = require('../lib/_lg-logic.js');


describe('widthValue works as it should', () => {
  it('gutter and rounder ✅', () => {
    const testCase = lgLogic.widthValue('1/3', '30px', 100);

    const expectedResult = `calc(100% * 1/3 - (30px - 30px * 1/3))`;

    expect(testCase).to.equal(expectedResult);
  });
  it('no gutter ✅', () => {
    const testCase = lgLogic.widthValue('1/3', '0', 99.9);

    const expectedResult = `calc(99.9% * 1/3)`;

    expect(testCase).to.equal(expectedResult);
  });
  it('no gutter ✅ when gutter is undefined', () => {
    const testCase = lgLogic.widthValue('1/3', undefined, 99.9);

    const expectedResult = `calc(99.9% * 1/3)`;

    expect(testCase).to.equal(expectedResult);
  });
});
