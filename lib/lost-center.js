var newBlock = require('./new-block.js');

/**
 * lost-center: Horizontally center a container element and apply padding
 * to it.
 *
 * @param {length} [max-width] - A max-width to assign. Can be any unit.
 *
 * @param {length} [padding] - Padding on the left and right of the element.
 *   Can be any unit.
 *
 * @param {string} [flex|no-flex] - Determines whether this element should
 *   use Flexbox or not.
 *
 * @example
 *   section {
 *     lost-center: 980px;
 *   }
 *
 * @example
 *   section {
 *     lost-center: 1140px 30px flex;
 *   }
 */
module.exports = function lostCenterDecl(css, settings) {
  css.walkDecls('lost-center', function lostCenterFunction(decl) {
    var declArr = [];
    var lostCenterPadding;
    var lostCenterFlexbox = settings.flexbox;

    declArr = decl.value.split(' ');

    if (declArr[1] !== undefined && declArr[1].search(/^\d/) !== -1) {
      lostCenterPadding = declArr[1];
    }

    if (declArr.indexOf('flex') !== -1) {
      lostCenterFlexbox = 'flex';
    }

    if (declArr.indexOf('no-flex') !== -1) {
      lostCenterFlexbox = 'no-flex';
    }

    decl.parent.nodes.forEach(function lostCenterPaddingFunction(declaration) {
      if (declaration.prop === 'lost-center-padding') {
        lostCenterPadding = declaration.value;

        declaration.remove();
      }
    });

    decl.parent.nodes.forEach(function lostCenterFlexboxFunction(declaration) {
      if (declaration.prop === 'lost-center-flexbox') {
        if (declaration.value === 'flex') {
          lostCenterFlexbox = declaration.value;
        }

        declaration.remove();
      }
    });

    if (lostCenterFlexbox === 'no-flex') {
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
    } else {
      decl.cloneBefore({
        prop: 'display',
        value: 'flex'
      });

      decl.cloneBefore({
        prop: 'flex-flow',
        value: 'row wrap'
      });
    }

    decl.cloneBefore({
      prop: 'max-width',
      value: declArr[0]
    });

    decl.cloneBefore({
      prop: 'margin-left',
      value: 'auto'
    });

    decl.cloneBefore({
      prop: 'margin-right',
      value: 'auto'
    });

    if (lostCenterPadding !== undefined) {
      decl.cloneBefore({
        prop: 'padding-left',
        value: lostCenterPadding
      });

      decl.cloneBefore({
        prop: 'padding-right',
        value: lostCenterPadding
      });
    }

    decl.remove();
  });
};
