'use strict';

var expect = require('chai').expect;
var { lgUtils } = require('../dist/core/lg-utilities.js');

describe('lg-utilities', () => {
  describe('glueFractionMembers', () => {
    it('glues fraction members together, avoiding a class of parsing errors', () => {
      expect(lgUtils.glueFractionMembers('-1      / 8')).to.equal('-1/8');
      expect(lgUtils.glueFractionMembers('27      /   32')).to.equal('27/32');
      expect(lgUtils.glueFractionMembers('1   /1')).to.equal('1/1');
    });
  });
  
  describe('hToD', () => {
    it('converts one or two hex digits to an int value', () => {
      expect(lgUtils.hToD(0, 0)).to.equal(0);
      expect(lgUtils.hToD(0)).to.equal(0);
      expect(lgUtils.hToD('A', 0)).to.equal(160);
      expect(lgUtils.hToD('A')).to.equal(170);
      expect(lgUtils.hToD()).to.equal(0);
      expect(lgUtils.hToD('Bats', 'and', 'boats')).to.equal(0);
      expect(lgUtils.hToD(NaN)).to.equal(0);
    });
  });
  
  describe('safeRgbToRgb', () => {
    it('converts a rgb(a?) string to an int triple', () => {
      const defaultBlue = [0, 0, 255];
      expect(lgUtils.safeRgbToRgb('rgb(0,0,0)')).to.deep.equal([0, 0, 0]);
      expect(lgUtils.safeRgbToRgb('rgba(0,255,0,grenoble)')).to.deep.equal([
        0,
        255,
        0,
      ]);
      expect(lgUtils.safeRgbToRgb('rgba(0,255,0, 0)')).to.deep.equal([0, 255, 0]);
      expect(lgUtils.safeRgbToRgb('rgba(0,0)')).to.deep.equal(defaultBlue);
      expect(lgUtils.safeRgbToRgb('rgb(0,  0,   0)')).to.deep.equal([0, 0, 0]);
      expect(lgUtils.safeRgbToRgb('0,0')).to.deep.equal(defaultBlue);
    });
  });
  
  describe('safeHexToRgb', () => {
    it('converts a #hex string to an int triple', () => {
      const defaultBlue = [0, 0, 255];
      expect(lgUtils.safeHexToRgb('#000')).to.deep.equal([0, 0, 0]);
      expect(lgUtils.safeHexToRgb('#0000')).to.deep.equal([0, 0, 0]);
      expect(lgUtils.safeHexToRgb('#000000')).to.deep.equal([0, 0, 0]);
      expect(lgUtils.safeHexToRgb('#00000000')).to.deep.equal([0, 0, 0]);
      expect(lgUtils.safeHexToRgb('000')).to.deep.equal([0, 0, 0]);
      expect(lgUtils.safeHexToRgb('0000')).to.deep.equal([0, 0, 0]);
      expect(lgUtils.safeHexToRgb('000000')).to.deep.equal([0, 0, 0]);
      expect(lgUtils.safeHexToRgb('00000000')).to.deep.equal([0, 0, 0]);
      expect(lgUtils.safeHexToRgb('F00')).to.deep.equal([255, 0, 0]);
      expect(lgUtils.safeHexToRgb('F000')).to.deep.equal([255, 0, 0]);
      expect(lgUtils.safeHexToRgb('FF0000')).to.deep.equal([255, 0, 0]);
      expect(lgUtils.safeHexToRgb('FF000000')).to.deep.equal([255, 0, 0]);
      expect(lgUtils.safeHexToRgb('ff0000')).to.deep.equal([255, 0, 0]);
      expect(lgUtils.safeHexToRgb('Languedoc-roussillon')).to.deep.equal(
        defaultBlue
      );
    });
  });
  
  describe('getColorValue', () => {
    it('converts a string to an int triple, defaulting to blue', () => {
      const defaultBlue = [0, 0, 255];
      expect(lgUtils.getColorValue('rgb(0,0,0)')).to.deep.equal([0, 0, 0]);
      expect(lgUtils.getColorValue('rgba(0,255,0,grenoble)')).to.deep.equal([
        0,
        255,
        0,
      ]);
      expect(lgUtils.getColorValue('rgb(0,  0,   0)')).to.deep.equal([0, 0, 0]);
      expect(lgUtils.getColorValue('0,0')).to.deep.equal(defaultBlue);
      expect(lgUtils.getColorValue('#F00')).to.deep.equal([255, 0, 0]);
      expect(lgUtils.getColorValue('#F000')).to.deep.equal([255, 0, 0]);
      expect(lgUtils.getColorValue('#FF0000')).to.deep.equal([255, 0, 0]);
      expect(lgUtils.getColorValue('#FF000000')).to.deep.equal([255, 0, 0]);
      expect(lgUtils.getColorValue('Languedoc-roussillon')).to.deep.equal(
        defaultBlue
      );
    });
  });
});