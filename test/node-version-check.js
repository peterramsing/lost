'use strict';

var expect = require('chai').expect;
var checkNodeVersion = require('../lib/_check-node-version');
var nodeVersion = process.env.npm_config_node_version;

describe('Logs Node warning if node version is 4', function() {
  describe('Operates as it should with hard coded versions (for tests)', function() {
    it('logs on 4', function() {
      expect(checkNodeVersion('4').warn).to.not.equal(false);
    });
    it('doesn\'t log on new versions', function() {
      expect(checkNodeVersion('6.9.1').warn).to.equal(false);
      expect(checkNodeVersion('6.9.1').warn).to.not.equal(true);
      expect(checkNodeVersion('7.0.0').warn).to.equal(false);
      expect(checkNodeVersion('7.0.0').warn).to.not.equal(true);
      expect(checkNodeVersion('8.9.4').warn).to.not.equal(true);
    });
  });
  describe('Operates as it should real version', function() {
    it('logs on 4', function() {
      if (nodeVersion.split('.')[0] < 1) {
        expect(checkNodeVersion(nodeVersion).warn).to.equal(true);
        expect(checkNodeVersion(nodeVersion).warn).to.not.equal(false);
      } else {
        expect(checkNodeVersion(nodeVersion).warn).to.equal(false);
        expect(checkNodeVersion(nodeVersion).warn).to.not.equal(true);
      }
    });
  });
});
