'use strict'

const expect = require('chai').expect;
const lgLogic = require('../lib/_lg-logic.js');


describe('columnLogic works as it should', () => {
  it('gutter and rounder ✅', () => {
    const foo = lgLogic.columnLogic('1/3', 30, 100);

    const expectedResult = `calc(100% * 1/3 - (30 - 30 * 1/3))`;

    expect(foo).to.equal(expectedResult);
  });
  it('no gutter ✅', () => {
    const foo = lgLogic.columnLogic('1/3', 0, 99.9);

    const expectedResult = `calc(99.9% * 1/3)`;

    expect(foo).to.equal(expectedResult);
  });
});
