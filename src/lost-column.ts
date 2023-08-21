import { newBlock } from './core/lg-new-block';
import { lgLogic } from './core/lg-logic';
import { lgUtils } from './core/lg-utilities';

export const lostColumn = (css: any, settings: any, result: any) => {
  css.walkDecls('lost-column', (decl: any) => {
    const gridDirection = settings.direction;
    const validUnits = ['%', 'vw'];

    let lostColumnCycle =
      settings.cycle === 'auto' ? decl.value.split('/')[1] : settings.cycle;
    let unit = settings.gridUnit;
    let lostColumnRounder = settings.rounder;
    let lostColumnGutter = settings.gutter;
    let lostColumnFlexbox = settings.flexbox;
    let lostColumn;

    if (decl.value !== 'none') {
      const sanitizedDecl = lgUtils.glueFractionMembers(decl.value);
      const declArr = sanitizedDecl.split(' ');
      lostColumn = declArr[0];

      decl.parent.nodes.forEach((declaration: any) => {
        switch (declaration.prop) {
          case 'lost-column-cycle':
            lostColumnCycle = declaration.value;
            declaration.remove();
            break;
          case 'lost-unit':
            if (lgLogic.validateUnit(declaration.value, validUnits)) {
              unit = declaration.value;
            } else {
              decl.warn(
                result,
                `${declaration.value} is not a valid unit for lost-column`
              );
            }
            declaration.remove();
            break;
          case 'lost-column-rounder':
            lostColumnRounder = declaration.value;
            declaration.remove();
            break;
          case 'lost-column-gutter':
            lostColumnGutter = declaration.value;
            declaration.remove();
            break;
          case 'lost-column-flexbox':
            if (declaration.value === 'flex') {
              lostColumnFlexbox = 'flex';
            } else {
              throw declaration.error(
                `lost-column-flexbox: property '${declaration.value}' is unknown.`
              );
            }
            declaration.remove();
            break;
        }
      });

      // Converts the cycle to an integer so that checks on whether it's 0 make sense
      lostColumnCycle = parseInt(lostColumnCycle);

      decl.parent.nodes.forEach((declaration: any) => {
        if (declaration.prop === 'lost-unit') {
          if (lgLogic.validateUnit(declaration.value, validUnits)) {
            unit = declaration.value;
          } else {
            decl.warn(
              result,
              `${declaration.value} is not a valid unit for lost-column`
            );
          }
          declaration.remove();
        }
      });

      decl.parent.nodes.forEach(function lostColumnRounderFunction(
        declaration: any
      ) {
        if (declaration.prop === 'lost-column-rounder') {
          lostColumnRounder = declaration.value;

          declaration.remove();
        }
      });

      decl.parent.nodes.forEach(function lostColumnGutterFunction(
        declaration: any
      ) {
        if (declaration.prop === 'lost-column-gutter') {
          lostColumnGutter = declaration.value;

          declaration.remove();
        }
      });

      decl.parent.nodes.forEach(function lostColumnFlexboxFunction(
        declaration: any
      ) {
        if (declaration.prop === 'lost-column-flexbox') {
          if (declaration.value === 'flex') {
            lostColumnFlexbox = 'flex';
          } else {
            throw declaration.error(
              `lost-column-flexbox: property '${declaration.value}' is unknown.`
            );
          }

          declaration.remove();
        }
      });

      if (lostColumnFlexbox === 'flex') {
        decl.cloneBefore({
          prop: 'flex-grow',
          value: '0',
        });
        decl.cloneBefore({
          prop: 'flex-shrink',
          value: '0',
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
          value: lgLogic.calcValue(
            lostColumn,
            lostColumnGutter,
            lostColumnRounder,
            unit
          ),
        });

        // IE 10-11 don't take into account box-sizing when calculating flex-basis, but
        // adding an explicit max-width keeps them in line.
        // https://github.com/philipwalton/flexbugs#7-flex-basis-doesnt-account-for-box-sizingborder-box
        decl.cloneBefore({
          prop: 'max-width',
          value: lgLogic.calcValue(
            lostColumn,
            lostColumnGutter,
            lostColumnRounder,
            unit
          ),
        });

        if (gridDirection === 'rtl') {
          newBlock(decl, ':last-child', ['margin-left'], [0]);
          newBlock(
            decl,
            ':nth-child(1n)',
            ['margin-left', 'margin-right'],
            [lostColumnGutter, 0]
          );
        } else {
          newBlock(decl, ':last-child', ['margin-right'], [0]);
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
                ['right'] // FIXME: This feels odd with the clearing fallback...
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
          newBlock(decl, ':last-child', ['margin-left'], [0]);
        } else {
          newBlock(decl, ':last-child', ['margin-right'], [0]);
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
        value: lgLogic.calcValue(
          lostColumn,
          lostColumnGutter,
          lostColumnRounder,
          unit
        ),
      });
    } else {
      // If decl.value is 'none'
      decl.parent.nodes.forEach((declaration: any) => {
        if (declaration.prop === 'lost-column-flexbox') {
          if (declaration.value === 'flex') {
            lostColumnFlexbox = 'flex';
          } else {
            throw declaration.error(
              `lost-column-flexbox: property '${declaration.value}' is unknown.`
            );
          }

          declaration.remove();
        }
      });

      if (lostColumnFlexbox === 'flex') {
        decl.cloneBefore({
          prop: 'flex',
          value: 'unset',
        });
        decl.cloneBefore({
          prop: 'max-width',
          value: 'unset',
        });
        decl.cloneBefore({
          prop: 'width',
          value: 'unset',
        });
        if (gridDirection === 'rtl') {
          newBlock(decl, ':nth-child(1n + 1)', ['margin-left'], [0]);
          newBlock(decl, ':nth-child(1n)', ['margin-left'], [0]);
          newBlock(decl, ':last-child', ['margin-left'], [0]);
        } else {
          newBlock(decl, ':nth-child(1n + 1)', ['margin-right'], [0]);
          newBlock(decl, ':nth-child(1n)', ['margin-right'], [0]);
          newBlock(decl, ':last-child', ['margin-right'], [0]);
        }
      } else {
        decl.cloneBefore({
          prop: 'width',
          value: 'auto',
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
    }

    decl.remove();
  });
};
