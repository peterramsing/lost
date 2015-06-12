var postcss = require('postcss');
var lost    = require('../lost');
var expect  = require('chai').expect;

var check = function( input, output, opts ) {
  var processor = postcss([lost(opts)]);

  expect(processor.process(input).css).to.equal(output);
};

describe('lost', function() {

  describe('lost-utility', function() {

    it('applies edit indicator', function() {
      check(
        'a { lost-utility: edit }',
        'a *:not(input):not(textarea):not(select) {\n' +
        '    background-color: rgba(0, 0, 255, 0.1)\n' +
        '}'
      );
    });

    it('applies clearfix', function() {
      check(
        'a { lost-utility: clearfix }',
        'a { *zoom: 1 }\n' +
        'a:before { content: \'\'; display: table }\n' +
        'a:after { content: \'\'; display: table; clear: both }'
      );
    });

  });

  describe('lost-flex-container', function() {

    it('flex for row', function() {
      check(
        'a { lost-flex-container: row }',
        'a { display: flex; flex-flow: row wrap }'
      );
    });

    it('flex for column', function() {
      check(
        'a { lost-flex-container: column }',
        'a { display: flex; flex-flow: column nowrap }'
      );
    });

  });

  describe('lost-center', function() {

    it('horizontally centers container', function() {
      check(
        'a { lost-center: 980px }',
        'a { *zoom: 1; max-width: 980px; margin-left: auto; margin-right: auto }\n' +
        'a:before { content: \'\'; display: table }\n' +
        'a:after { content: \'\'; display: table; clear: both }'
      );
    });

    it('adds 30px padding', function() {
      check(
        'a { lost-center: 980px 30px }',
        'a { *zoom: 1; max-width: 980px; margin-left: auto; margin-right: auto; padding-left: 30px; padding-right: 30px }\n' +
        'a:before { content: \'\'; display: table }\n' +
        'a:after { content: \'\'; display: table; clear: both }'
      );
    });

    it('uses flexbox', function() {
      check(
        'a { lost-center: 1140px 30px flex }',
        'a { display: flex; flex-flow: row wrap; max-width: 1140px; margin-left: auto; margin-right: auto; padding-left: 30px; padding-right: 30px }'
      );
    });

  });

});
