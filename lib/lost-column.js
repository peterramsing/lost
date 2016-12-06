var newBlock = require('./new-block.js');

var lgLogic = require('./_lg-logic');

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
module.exports = function lostColumnDecl(css, settings, result) {
  css.walkDecls('lost-column', function lostColumnFunction(decl) {
    var declArr = [];
    var gridDirection = settings.direction;
    var lostColumn;
    var lostColumnCycle;
    var unit = settings.gridUnit;
    var lostColumnRounder = settings.rounder;
    var lostColumnGutter = settings.gutter;
    var lostColumnFlexbox = settings.flexbox;
    var validUnits = ['%', 'vw'];

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

      decl.parent.nodes.forEach(declaration => {
        if (declaration.prop === 'lost-unit') {
          if (lgLogic.validateUnit(declaration.value, validUnits)) {
            unit = declaration.value;
          } else {
            decl.warn(result, `${declaration.value} is not a valid unit for lost-column`);
          }
          declaration.remove();
        }
      });

      decl.parent.nodes.forEach(function lostColumnRounderFunction(declaration) {
        if (declaration.prop === 'lost-column-rounder') {
          lostColumnRounder = declaration.value;

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
          prop: 'flex-grow',
          value: '0'
        });
        decl.cloneBefore({
          prop: 'flex-shrink',
          value: '0'
        });

        if (lostColumnCycle !== 0) {
          if (gridDirection === 'rtl') {
            newBlock(
              decl,
              ':nth-child(' + lostColumnCycle + 'n)',
              ['margin-left', 'margin-right'],
              [0, 'auto']
            );
          } else {
            newBlock(
              decl,
              ':nth-child(' + lostColumnCycle + 'n)',
              ['margin-right', 'margin-left'],
              [0, 'auto']
            );
          }
        }

        decl.cloneBefore({
          prop: 'flex-basis',
          value: lgLogic.calcValue(lostColumn, lostColumnGutter, lostColumnRounder, unit)
        });

        if (gridDirection === 'rtl') {
          newBlock(
            decl,
            ':last-child',
            ['margin-left'],
            [0]
          );
          newBlock(
            decl,
            ':nth-child(1n)',
            ['margin-left', 'margin-right'],
            [lostColumnGutter, 0]
          );
        } else {
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
        }

      } else {
        if (lostColumnCycle !== 0) {
          if (settings.clearing === 'left') {
            if (gridDirection === 'rtl') {
              newBlock(
                decl,
                ':nth-child(' + lostColumnCycle + 'n + 1)',
                ['clear'],
                ['right']
              );
            } else {
              newBlock(
                decl,
                ':nth-child(' + lostColumnCycle + 'n + 1)',
                ['clear'],
                ['left']
              );
            }
          } else {
            newBlock(
              decl,
              ':nth-child(' + lostColumnCycle + 'n + 1)',
              ['clear'],
              ['both']
            );
          }

          if (gridDirection === 'rtl') {
            newBlock(
              decl,
              ':nth-child(' + lostColumnCycle + 'n)',
              ['margin-left', 'float'],
              [0, 'left']
            );
          } else {
            newBlock(
              decl,
              ':nth-child(' + lostColumnCycle + 'n)',
              ['margin-right', 'float'],
              [0, 'right']
            );
          }
        } else {
          if (gridDirection === 'rtl') {
            newBlock(
              decl,
              ':nth-child(' + lostColumnCycle + 'n)',
              ['float'],
              ['left']
            );
          } else {
            newBlock(
              decl,
              ':nth-child(' + lostColumnCycle + 'n)',
              ['float'],
              ['right']
            );
          }
        }

        if (gridDirection === 'rtl') {
          newBlock(
            decl,
            ':last-child',
            ['margin-left'],
            [0]
          );
        } else {
          newBlock(
            decl,
            ':last-child',
            ['margin-right'],
            [0]
          );
        }

        if (gridDirection === 'rtl') {
          newBlock(
            decl,
            ':nth-child(1n)',
            ['float', 'margin-left', 'clear'],
            ['right', lostColumnGutter, 'none']
          );
        } else {
          newBlock(
            decl,
            ':nth-child(1n)',
            ['float', 'margin-right', 'clear'],
            ['left', lostColumnGutter, 'none']
          );
        }

      }
      decl.cloneBefore({
        prop: 'width',
        value: lgLogic.calcValue(lostColumn, lostColumnGutter, lostColumnRounder, unit)
      });
    } else {
      decl.cloneBefore({
        prop: 'width',
        value: 'auto'
      });

      if (gridDirection === 'rtl') {
        newBlock(
          decl,
          ':nth-child(1n + 1)',
          ['float', 'clear', 'margin-left', 'width'],
          ['none', 'none', 0, 'auto']
        );

        newBlock(
          decl,
          ':nth-child(1n)',
          ['float', 'clear', 'margin-left', 'width'],
          ['none', 'none', 0, 'auto']
        );

        newBlock(
          decl,
          ':last-child',
          ['float', 'clear', 'margin-left', 'width'],
          ['none', 'none', 0, 'auto']
        );
      } else {
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
    }

    decl.remove();
  });
};
