'use strict'

var expect = require('chai').expect;
var lgLogic = require('../lib/_lg-gutter.js');



var check = require('./check');

describe('lost-gutter', function() {
  it('replaces var with global', function() {
    check(
      'a { padding: $lost-gutter; }',
      'a { padding: 30px; }'
    );
  });
});
