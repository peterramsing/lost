var newBlock = require('./new-block.js');

/**
 * Returns a sanitized three-number array representing RGB color values, with a safe default.
 * @param string
 * @returns {number[]}
 */
function getColorValue(string) {
  if (testRgb.test(string)) {
    return safeRgbToRgb(string);
  }
  if (testHex.test(string)) {
    return safeHexToRgb(string);
  }
  return [0, 0, 255];
}

var testRgb = new RegExp(/rgb/);
var matchRgb = new RegExp(/rgba?\(([^\)]+)\)/);
var testHex = new RegExp(/#\w+/);

/**
 * Extracts the comma-separated numbers from a rgb(a?) string.
 * @param string
 * @returns {string}
 */
function extractRgbSubstring(string) {
  var candidate = string.match(matchRgb);
  if (
    candidate &&
    candidate.length > 1 &&
    candidate[1].length > 0 &&
    typeof candidate[1] === 'string'
  ) {
    return candidate[1];
  }
  return '0,0,255';
}

/**
 * Returns a base10 number from one or two hex digits
 * @param h
 * @returns {number}
 */
function hToD(...h) {
  var hh = '00';
  if (h.length === 1) {
    hh = '' + h[0] + h[0];
  } else if (h.length === 2) {
    hh = '' + h[0] + h[1];
  }
  var d = parseInt(hh, 16);
  return !isNaN(d) ? d : 0;
}

/**
 * Returns a three-member number array from a rgb string
 * @param rgb
 * @returns {number[]}
 */
function safeRgbToRgb(rgb) {
  var value = extractRgbSubstring(rgb)
    .split(',')
    .map(function(a) {
      var b = parseInt(a, 10);
      return !isNaN(b) ? b : 0;
    });
  if (value.length >= 3) {
    return [value[0], value[1], value[2]];
  }
  return [0, 0, 255];
}

/**
 * Returns a three-member number array from a rgb string
 * @param hex
 * @returns {number[]}
 */
function safeHexToRgb(hex) {
  var value = hex.trim().split('#');
  var c = ['00', '00', '00'];
  if (value.length === 1) {
    c = value[0].split('');
  }
  if (value.length === 2) {
    c = value[1].split('');
  }
  switch (c.length) {
    case 3:
      return [hToD(c[0]), hToD(c[1]), hToD(c[2])];
    case 4:
      return [hToD(c[0]), hToD(c[1]), hToD(c[2])];
    case 6:
      return [hToD(c[0], c[1]), hToD(c[2], c[3]), hToD(c[4], c[5])];
    case 8:
      return [hToD(c[0], c[1]), hToD(c[2], c[3]), hToD(c[4], c[5])];
    default:
      return [0, 0, 255];
  }
}

function unitsMatch() {
  var args = Array.prototype.slice.call(arguments, 0);
  var re = /(px|%|em|rem|vh|vw)$/gi;
  var extension = args[0].match(re).toString();
  var matched = true;

  args.forEach(function compareExtension(arg) {
    if (arg.match(re).toString() !== extension) {
      matched = false;
    }
  });
  return matched;
}

module.exports = function lostUtilityDecl(css) {
  css.walkDecls('lost-utility', function lostUtilityDeclFunction(decl) {
    var utilityArray = decl.value.split(' ');
    var utility = utilityArray[0];
    var color;

    if (utility === 'edit') {
      if (utilityArray[1]) {
        color = getColorValue(decl.value);

        newBlock(
          decl,
          ' *:not(input):not(textarea):not(select)',
          ['background-color'],
          ['rgba(' + color[0] + ',' + color[1] + ',' + color[2] + ', 0.1)']
        );
      } else {
        newBlock(
          decl,
          ' *:not(input):not(textarea):not(select)',
          ['background-color'],
          ['rgba(0, 0, 255, 0.1)']
        );
      }
    }

    if (utility === 'clearfix') {
      newBlock(
        decl,
        ':after',
        ['content', 'display', 'clear'],
        ["''", 'table', 'both']
      );

      newBlock(decl, ':before', ['content', 'display'], ["''", 'table']);
    }

    if (utility === 'overlay') {
      var maxWidth = utilityArray[1] || '1024px',
        numCols = utilityArray[2] || 12,
        gutter = utilityArray[3] || '20px',
        totalGutter = parseFloat(gutter) * (numCols - 1),
        colWidth =
          ((parseFloat(maxWidth) - totalGutter) /
            numCols /
            parseFloat(maxWidth)) *
          100,
        gutterPercentage = (parseFloat(gutter) / parseFloat(maxWidth)) * 100,
        position = 0,
        gradient = 'to right, ';

      color = utilityArray[4] || '#e6f6ff';

      if (!unitsMatch(maxWidth, gutter)) {
        throw decl.error(
          'lost-utility: Please use the same units for width and gutter.',
          { plugin: 'lost', word: 'lost-utility' }
        );
      }

      for (var i = 1; i < numCols; i++) {
        // Start of color column
        gradient = gradient + color + ' ' + position + '%, ';

        // Move position to end of color column
        position = position + colWidth;

        // End of color column + Start of gutter column
        gradient =
          gradient +
          color +
          ' ' +
          position +
          '%, transparent ' +
          position +
          '%, ';

        // Move position to end of gutter column
        position = position + gutterPercentage;

        // End of gutter column
        gradient = gradient + 'transparent ' + position + '%, ';
      }

      gradient = gradient + color + ' ' + position + '%, ' + color + ' 100%';

      newBlock(
        decl,
        ':before',
        [
          'background-image',
          'content',
          'display',
          'height',
          'left',
          'margin',
          'max-width',
          'opacity',
          'pointer-events',
          'position',
          'right',
          'width',
          'z-index'
        ],
        [
          'linear-gradient(' + gradient + ')',
          "''",
          'inline-block',
          '100%',
          '0',
          '0 auto',
          maxWidth,
          '0.4',
          'none',
          'fixed',
          '0',
          '100%',
          '1'
        ]
      );
    }

    if (decl.parent.nodes.length === 1) {
      decl.parent.remove();
    } else {
      decl.remove();
    }
  });
};
