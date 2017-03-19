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

    if (decl.parent.nodes.length === 1) {
      decl.parent.remove();
    } else {
      decl.remove();
    }
  });
};
