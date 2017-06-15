'use strict';

var expect = require('chai').expect;
var lgLogic = require('../lib/_lg-logic.js');
var postcss = require('postcss');


describe('calcValue works as it should', () => {
  it('gutter, rounder, and unit ✅', () => {
    var testCase = lgLogic.calcValue('1/3', '30px', 100, 'vw');

    var expectedResult = 'calc(100vw * 1/3 - (30px - 30px * 1/3))';

    expect(testCase).to.equal(expectedResult);
  });
  it('no gutter ✅', () => {
    var testCase = lgLogic.calcValue('1/3', '0', 99.9);

    var expectedResult = 'calc(99.9% * 1/3)';

    expect(testCase).to.equal(expectedResult);
  });
  it('no gutter ✅  when gutter is undefined', () => {
    var testCase = lgLogic.calcValue('1/3', undefined, 99.9);

    var expectedResult = 'calc(99.9% * 1/3)';

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

describe('parseLostProperty works as it should', () => {
  it('returns default value if property not found', () => {
    var css = 'a { lost-unit: vw; lost-center-padding: 25px }';
    var nodes = postcss.parse(css).nodes[0].nodes;

    var testCase = lgLogic.parseLostProperty(nodes, 'lost-column-rounder', 0);
    var expectedResult = 0;

    expect(testCase).to.equal(expectedResult);
  });

  it('returns value if property is found', () => {
    var css = 'a { lost-unit: vw; lost-center-padding: 25px }';
    var nodes = postcss.parse(css).nodes[0].nodes;

    var testCase = lgLogic.parseLostProperty(nodes, 'lost-unit', '%');
    var expectedResult = 'vw';

    expect(testCase).to.equal(expectedResult);
  });

  it('property node removed if found', () => {
    var css = 'a { height: 100px; lost-unit: vw; lost-center-padding: 25px }';
    var cssProperties = postcss.parse(css);

    lgLogic.parseLostProperty(cssProperties.nodes[0].nodes, 'lost-unit', '%');

    var testCase = 'a { height: 100px; lost-center-padding: 25px }';
    var expectedResult = cssProperties.toString();

    expect(testCase).to.equal(expectedResult);
  });

});
