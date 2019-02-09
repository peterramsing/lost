var newBlock = require('./new-block.js');
var getColorValue = require('./_lg-utilities').getColorValue;

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
