'use strict';

var expect = require('chai').expect;
var checkNodeVersion = require('../lib/check-node-version');
var nodeVersion = process.env.npm_config_node_version;

describe('Logs Node warning if node version is 0.x', function() {
  describe('Operates as it should with hard coded versions', function() {
    it('logs on 0.12 and 0.10', function() {
      expect(checkNodeVersion('0.10').warn).to.equal(true);
      expect(checkNodeVersion('0.10').warn).to.not.equal(false);
      expect(checkNodeVersion('0.12').warn).to.equal(true);
      expect(checkNodeVersion('0.12').warn).to.not.equal(false);
    });
    it('doesn\'t log on new versions', function() {
      expect(checkNodeVersion('6.9.1').warn).to.equal(false);
      expect(checkNodeVersion('6.9.1').warn).to.not.equal(true);
      expect(checkNodeVersion('7.0.0').warn).to.equal(false);
      expect(checkNodeVersion('7.0.0').warn).to.not.equal(true);
    });
  });
  describe('Operates as it should with \"real\" Node version', function() {
    it('logs on 0.12 and 0.10', function() {
      if (nodeVersion.split('.')[0] < 1) {
        console.log('Does log');
        expect(checkNodeVersion(nodeVersion).warn).to.equal(true);
        expect(checkNodeVersion(nodeVersion).warn).to.not.equal(false);
      } else {
        console.log('Doesn\'t log');
        expect(checkNodeVersion(nodeVersion).warn).to.equal(false);
        expect(checkNodeVersion(nodeVersion).warn).to.not.equal(true);
      }
    });
  });
});
