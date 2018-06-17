'use strict';

var check = require('./check');
var throws = require('./throws');

describe('lost-utility', function() {
  it("Doesn't remove the parent node if there are other rules in declaration", function() {
    check(
      'a { lost-utility: edit; color: blue; }',
      'a { color:blue; } a *:not(input):not(textarea):not(select) ' +
        '{ background-color:rgba(0,0,255,.1); }'
    );
  });

  it('applies edit indicator', function() {
    check(
      'a { lost-utility: edit }',
      'a *:not(input):not(textarea):not(select) {\n' +
        '    background-color: rgba(0, 0, 255, 0.1)\n' +
        '}'
    );
  });

  it('applies edit indicator with color', function() {
    check(
      'a { lost-utility: edit rgb(44, 55, 33) }',
      'a *:not(input):not(textarea):not(select) {\n' +
        '    background-color: rgba(44, 55, 33, 0.1)\n' +
        '}'
    );
    check(
      'a { lost-utility: edit rgb(44,55,111) }',
      'a *:not(input):not(textarea):not(select) {\n' +
        '    background-color: rgba(44,55,111, 0.1)\n' +
        '}'
    );
  });

  it('applies clearfix', function() {
    check(
      'a { lost-utility: clearfix }',
      'a:before {\n' +
        "    content: '';\n" +
        '    display: table\n' +
        '}\n' +
        'a:after {\n' +
        "    content: '';\n" +
        '    display: table;\n' +
        '    clear: both\n' +
        '}'
    );
  });

  it('applies overlay uses defaults', function() {
    check(
      'body { lost-utility: overlay }',
      'body:before{background-image:linear-gradient(to right, ' +
        '#e6f6ff 0,#e6f6ff 6.54296875%,transparent 6.54296875%,' +
        'transparent 8.49609375%,#e6f6ff 8.49609375%,#e6f6ff 15.0390625%,' +
        'transparent 15.0390625%,transparent 16.9921875%,#e6f6ff 16.9921875%,' +
        '#e6f6ff 23.53515625%,transparent 23.53515625%,transparent 25.48828125%,' +
        '#e6f6ff 25.48828125%,#e6f6ff 32.03125%,transparent 32.03125%,transparent 33.984375%,' +
        '#e6f6ff 33.984375%,#e6f6ff 40.52734375%,transparent 40.52734375%,' +
        'transparent 42.48046875%,#e6f6ff 42.48046875%,#e6f6ff 49.0234375%,' +
        'transparent 49.0234375%,transparent 50.9765625%,#e6f6ff 50.9765625%,' +
        '#e6f6ff 57.51953125%,transparent 57.51953125%,transparent 59.47265625%,' +
        '#e6f6ff 59.47265625%,#e6f6ff 66.015625%,transparent 66.015625%,' +
        'transparent 67.96875%,#e6f6ff 67.96875%,#e6f6ff 74.51171875%,' +
        'transparent 74.51171875%,transparent 76.46484375%,#e6f6ff 76.46484375%,' +
        '#e6f6ff 83.0078125%,transparent 83.0078125%,transparent 84.9609375%,' +
        '#e6f6ff 84.9609375%,#e6f6ff 91.50390625%,transparent 91.50390625%,' +
        'transparent 93.45703125%,#e6f6ff 93.45703125%,#e6f6ff 100%);' +
        "content:'';" +
        'display:inline-block;' +
        'height:100%;' +
        'left:0;' +
        'margin:0 auto;' +
        'max-width:1024px;' +
        'opacity:.4;' +
        'pointer-events:none;' +
        'position:fixed;' +
        'right:0;' +
        'width:100%;' +
        'z-index:1}'
    );
  });

  it('applies overlay', function() {
    check(
      'body { lost-utility: overlay 200px 2 50px #ccc }',
      'body:before{background-image:linear-gradient(to right,' +
        '#ccc 0,#ccc 37.5%,transparent 37.5%,transparent 62.5%,#ccc 62.5%,#ccc 100%);' +
        "content:'';" +
        'display:inline-block;' +
        'height:100%;' +
        'left:0;' +
        'margin:0 auto;' +
        'max-width:200px;' +
        'opacity:.4;' +
        'pointer-events:none;' +
        'position:fixed;' +
        'right:0;' +
        'width:100%;' +
        'z-index:1}'
    );
  });

  it('applies overlay unit mismatch', function() {
    throws(
      'lost-utility: overlay 1600px 2 10em #999',
      'lost-utility: Please use the same units for width and gutter.'
    );
  });
});
