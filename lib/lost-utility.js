var newBlock = require('./new-block.js');

function getColorValue(string) {
  var color = string.split('rgb(')[1];
  color = color.split(')')[0];
  return color;
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
          ['rgba(' + color + ', 0.1)']
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
        ['\'\'', 'table', 'both']
      );

      newBlock(
        decl,
        ':before',
        ['content', 'display'],
        ['\'\'', 'table']
      );
    }

    if (utility === 'overlay') {
      var maxWidth = utilityArray[1] || '1024px',
        numCols = utilityArray[2] || 12,
        gutter = utilityArray[3] || '20px',
        color = utilityArray[4] || '#e6f6ff',
        totalGutter = parseFloat(gutter) * (numCols - 1),
        colWidth = (((parseFloat(maxWidth) - totalGutter) / numCols) / parseFloat(maxWidth)) * 100,
        gutter = parseFloat(gutter) / parseFloat(maxWidth) * 100,
        position = 0,
        gradient = 'left, ';

      for(var i = 1; i < numCols; i++) {
          // Start of color column
          gradient = gradient + color + ' ' + position + '%, ';

          // Move position to end of color column
          position = position + colWidth;

          // End of color + Start of gutter
          gradient = gradient + color + ' ' + position + '%, transparent ' + position + '%, ';

          // Move position to end of gutter
          position = position + gutter;

          // End of gutter
          gradient = gradient + 'transparent ' + position + '%, ';
      }

      gradient = gradient + color + ' ' + position + '%, ' + color + ' 100%';
      
      newBlock(
        decl,
        ':before',
        ['background-image', 'content', 'display', 'height', 'left', 'margin', 'max-width', 'opacity', 'pointer-events', 'position', 'right', 'width', 'z-index'],
        ['linear-gradient(' + gradient + ')', '\'\'', 'inline-block', '100%', '0', '0 auto', maxWidth, '0.4', 'none', 'fixed', '0', '100%', '1']
      );
    }

    if (decl.parent.nodes.length === 1) {
      decl.parent.remove();
    } else {
      decl.remove();
    }
  });
};
