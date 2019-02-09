'use strict';

var expect = require('chai').expect;
var utils = require('../lib/_lg-utilities.js');

describe('glueFractionMembers', () => {
  it('glues fraction members together, avoiding a class of parsing errors', () => {
    expect(utils.glueFractionMembers('-1      / 8')).to.equal('-1/8');
    expect(utils.glueFractionMembers('27      /   32')).to.equal('27/32');
    expect(utils.glueFractionMembers('1   /1')).to.equal('1/1');
  });
});

describe('hToD', () => {
  it('converts one or two hex digits to an int value', () => {
    expect(utils.hToD(0, 0)).to.equal(0);
    expect(utils.hToD(0)).to.equal(0);
    expect(utils.hToD('A', 0)).to.equal(160);
    expect(utils.hToD('A')).to.equal(170);
    expect(utils.hToD()).to.equal(0);
    expect(utils.hToD('Bats', 'and', 'boats')).to.equal(0);
    expect(utils.hToD(NaN)).to.equal(0);
  });
});

describe('safeRgbToRgb', () => {
  it('converts a rgb(a?) string to an int triple', () => {
    const defaultBlue = [0, 0, 255];
    expect(utils.safeRgbToRgb('rgb(0,0,0)')).to.deep.equal([0, 0, 0]);
    expect(utils.safeRgbToRgb('rgba(0,255,0,grenoble)')).to.deep.equal([
      0,
      255,
      0
    ]);
    expect(utils.safeRgbToRgb('rgba(0,255,0, 0)')).to.deep.equal([0, 255, 0]);
    expect(utils.safeRgbToRgb('rgba(0,0)')).to.deep.equal(defaultBlue);
    expect(utils.safeRgbToRgb('rgb(0,  0,   0)')).to.deep.equal([0, 0, 0]);
    expect(utils.safeRgbToRgb('0,0')).to.deep.equal(defaultBlue);
  });
});

describe('safeHexToRgb', () => {
  it('converts a #hex string to an int triple', () => {
    const defaultBlue = [0, 0, 255];
    expect(utils.safeHexToRgb('#000')).to.deep.equal([0, 0, 0]);
    expect(utils.safeHexToRgb('#0000')).to.deep.equal([0, 0, 0]);
    expect(utils.safeHexToRgb('#000000')).to.deep.equal([0, 0, 0]);
    expect(utils.safeHexToRgb('#00000000')).to.deep.equal([0, 0, 0]);
    expect(utils.safeHexToRgb('000')).to.deep.equal([0, 0, 0]);
    expect(utils.safeHexToRgb('0000')).to.deep.equal([0, 0, 0]);
    expect(utils.safeHexToRgb('000000')).to.deep.equal([0, 0, 0]);
    expect(utils.safeHexToRgb('00000000')).to.deep.equal([0, 0, 0]);
    expect(utils.safeHexToRgb('F00')).to.deep.equal([255, 0, 0]);
    expect(utils.safeHexToRgb('F000')).to.deep.equal([255, 0, 0]);
    expect(utils.safeHexToRgb('FF0000')).to.deep.equal([255, 0, 0]);
    expect(utils.safeHexToRgb('FF000000')).to.deep.equal([255, 0, 0]);
    expect(utils.safeHexToRgb('ff0000')).to.deep.equal([255, 0, 0]);
    expect(utils.safeHexToRgb('Languedoc-roussillon')).to.deep.equal(
      defaultBlue
    );
  });
});

describe('getColorValue', () => {
  it('converts a string to an int triple, defaulting to blue', () => {
    const defaultBlue = [0, 0, 255];
    expect(utils.getColorValue('rgb(0,0,0)')).to.deep.equal([0, 0, 0]);
    expect(utils.getColorValue('rgba(0,255,0,grenoble)')).to.deep.equal([
      0,
      255,
      0
    ]);
    expect(utils.getColorValue('rgb(0,  0,   0)')).to.deep.equal([0, 0, 0]);
    expect(utils.getColorValue('0,0')).to.deep.equal(defaultBlue);
    expect(utils.getColorValue('#F00')).to.deep.equal([255, 0, 0]);
    expect(utils.getColorValue('#F000')).to.deep.equal([255, 0, 0]);
    expect(utils.getColorValue('#FF0000')).to.deep.equal([255, 0, 0]);
    expect(utils.getColorValue('#FF000000')).to.deep.equal([255, 0, 0]);
    expect(utils.getColorValue('Languedoc-roussillon')).to.deep.equal(
      defaultBlue
    );
  });
});
