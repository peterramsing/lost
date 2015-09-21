var newBlock = require('./new-block.js');

/**
 * lost-utility: A general utility toolbelt for Lost. Included are mixins
 * that require no additional input other than being called.
 *
 * @param {string} [edit|clearfix] - The mixin to create.
 *
 * @example
 *   body {
 *     lost-utility: edit;
 *   }
 *
 * @example
 *   .parent {
 *     lost-utility: clearfix;
 *   }
 *   .child {
 *     lost-column: 1/2;
 *   }
 */
module.exports = function lostUtilityDecl(css, settings) {
  css.walkDecls('lost-utility', function(decl) {
    if (decl.value == 'edit') {
      newBlock(
        decl,
        ' *:not(input):not(textarea):not(select)',
        ['background-color'],
        ['rgba(0, 0, 255, 0.1)']
      );
    }

    if (decl.value == 'clearfix') {
      decl.cloneBefore({
        prop: '*zoom',
        value: '1'
      });

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
