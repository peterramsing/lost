var newBlock = require('./new-block.js');

/**
 * lost-column: Creates a column that is a fraction of the size of its
 * containing element's width with a gutter.
 *
 * @param {string} [fraction] - This is a simple fraction of the containing
 *   element's width.
 *
 * @param {integer} [cycle] - Lost works by assigning a margin-right to all
 *   elements except the last in the row. If settings.cycle is set to auto
 *   it will do this by default by using the denominator of the fraction you
 *   pick. To override the default use this param.,
 *   e.g.: .foo { lost-column: 2/4 2; }
 *
 * @param {length} [gutter] - The margin on the right side of the element
 *   used to create a gutter. Typically this is left alone and
 *   settings.gutter will be used, but you can override it here if you want
 *   certain elements to have a particularly large or small gutter (pass 0
 *   for no gutter at all).
 *
 * @param {string} [flex|no-flex] - Determines whether this element should
 *   use Flexbox or not.
 *
 * @example
 *   div {
 *     lost-column: 1/3;
 *   }
 *
 * @example
 *   div {
 *     lost-column: 2/6 3 60px flex;
 *   }
 */
module.exports = function lostColumnDecl(css, settings) {
  css.walkDecls('lost-column', function lostColumnFunction(decl) {
    var declArr = [];
    var lostColumn;
    var lostColumnCycle;
    var lostColumnGutter = settings.gutter;
    var lostColumnFlexbox = settings.flexbox;

    if (decl.value !== 'none') {
      if (settings.cycle === 'auto') {
        lostColumnCycle = decl.value.split('/')[1];
      } else {
        lostColumnCycle = settings.cycle;
      }

      declArr = decl.value.split(' ');
      lostColumn = declArr[0];

      if (declArr[1] !== undefined && declArr[1].search(/^\d/) !== -1) {
        lostColumnCycle = declArr[1];
      }

      if (declArr[1] === 'flex' || declArr[1] === 'no-flex' || declArr[1] === 'auto') {
        lostColumnCycle = declArr[0].split('/')[1];
      }

      if (declArr[2] !== undefined && declArr[2].search(/^\d/) !== -1) {
        lostColumnGutter = declArr[2];
      }

      if (declArr.indexOf('flex') !== -1) {
        lostColumnFlexbox = 'flex';
      }

      if (declArr.indexOf('no-flex') !== -1) {
        lostColumnFlexbox = 'no-flex';
      }

      decl.parent.nodes.forEach(function lostColumnCycleFunction(declaration) {
        if (declaration.prop === 'lost-column-cycle') {
          lostColumnCycle = declaration.value;

          declaration.remove();
        }
      });

      decl.parent.nodes.forEach(function lostColumnGutterFunction(declaration) {
        if (declaration.prop === 'lost-column-gutter') {
          lostColumnGutter = declaration.value;

          declaration.remove();
        }
      });

      decl.parent.nodes.forEach(function lostColumnFlexboxFunction(declaration) {
        if (declaration.prop === 'lost-column-flexbox') {
          if (declaration.prop === 'flex') {
            lostColumnFlexbox = 'flex';
          }

          declaration.remove();
        }
      });

      if (lostColumnFlexbox === 'flex') {
        decl.cloneBefore({
          prop: 'flex',
          value: '0 0 auto'
        });

        if (lostColumnCycle !== 0) {
          newBlock(
            decl,
            ':nth-child(' + lostColumnCycle + 'n)',
            ['margin-right', 'margin-left'],
            [0, 'auto']
          );
        }

        newBlock(
          decl,
          ':last-child',
          ['margin-right'],
          [0]
        );

        newBlock(
          decl,
          ':nth-child(1n)',
          ['margin-right', 'margin-left'],
          [lostColumnGutter, 0]
        );
      } else {
        if (lostColumnCycle !== 0) {
          if (settings.clearing === 'left') {
            newBlock(
              decl,
              ':nth-child(' + lostColumnCycle + 'n + 1)',
              ['clear'],
              ['left']
            );
          } else {
            newBlock(
              decl,
              ':nth-child(' + lostColumnCycle + 'n + 1)',
              ['clear'],
              ['both']
            );
          }

          newBlock(
            decl,
            ':nth-child(' + lostColumnCycle + 'n)',
            ['margin-right', 'float'],
            [0, 'right']
          );
        } else {
          newBlock(
            decl,
            ':nth-child(' + lostColumnCycle + 'n)',
            ['float'],
            ['right']
          );
        }

        newBlock(
          decl,
          ':last-child',
          ['margin-right'],
          [0]
        );

        newBlock(
          decl,
          ':nth-child(1n)',
          ['float', 'margin-right', 'clear'],
          ['left', lostColumnGutter, 'none']
        );
      }

      if (lostColumnGutter !== '0') {
        decl.cloneBefore({
          prop: 'width',
          value: 'calc(99.9% * '
          + lostColumn + ' - (' + lostColumnGutter + ' - '
          + lostColumnGutter + ' * ' + lostColumn + '))'
        });
      } else {
        decl.cloneBefore({
          prop: 'width',
          value: 'calc(99.9% * ' + lostColumn + ')'
        });
      }
    } else {
      decl.cloneBefore({
        prop: 'width',
        value: 'auto'
      });

      newBlock(
        decl,
        ':nth-child(1n + 1)',
        ['float', 'clear', 'margin-right', 'width'],
        ['none', 'none', 0, 'auto']
      );

      newBlock(
        decl,
        ':nth-child(1n)',
        ['float', 'clear', 'margin-right', 'width'],
        ['none', 'none', 0, 'auto']
      );

      newBlock(
        decl,
        ':last-child',
        ['float', 'clear', 'margin-right', 'width'],
        ['none', 'none', 0, 'auto']
      );
    }

    decl.remove();
  });
};
