/**
 * lost-move: Source ordering. Shift elements left, right, up, or down, by
 * their left or top position by passing a positive or negative fraction.
 *
 * @param {string} [fraction] - Fraction of the container to be shifted.
 *
 * @param {string} [row|column] - Direction the grid is going. Should be the
 *   opposite of the column or row it's being used on.
 *
 * @param {length} [gutter] - Adjust the size of the gutter for this
 *   movement. Should match the element's gutter.
 *
 * @example
 *   div {
 *     lost-column: 1/2;
 *   }
 *   div:first-child {
 *     lost-move: 1/2;
 *   }
 *   div:last-child {
 *     lost-move: -1/2;
 *   }
 */
module.exports = function lostMoveDecl(css, settings) {
  css.walkDecls('lost-move', function lostMoveDeclFunction(decl) {
    var declArr = [];
    var lostMove;
    var lostMoveDirection;
    var lostMoveRounder = settings.rounder;
    var lostMoveGutter = settings.gutter;

    declArr = decl.value.split(' ');
    lostMove = declArr[0];

    if ((declArr[1] !== undefined && declArr[1] === 'row') || declArr[1] === 'column') {
      lostMoveDirection = declArr[1];
    }

    decl.parent.nodes.forEach(function lostMoveRounderFunction(declaration) {
      if (declaration.prop === 'lost-move-rounder') {
        lostMoveRounder = declaration.value;

        declaration.remove();
      }
    });

    decl.parent.nodes.forEach( (declaration) => {
      if (declaration.prop === 'lost-column') {
        var columnArray = declaration.value.split(' ');
        if (columnArray[2]) {
          lostMoveGutter = columnArray[2];
        }
      }
      if (declaration.prop === 'lost-column-gutter') {
        lostMoveGutter = declaration.value;
      }
    });

    decl.parent.nodes.forEach( (declaration) => {
      if (declaration.prop === 'lost-row') {
        var rowArray = declaration.value.split(' ');
        if (rowArray[1]) {
          lostMoveGutter = rowArray[1];
        }
      }
      if (declaration.prop === 'lost-row-gutter') {
        lostMoveGutter = declaration.value;
      }
    });

    if (declArr[2] !== undefined && declArr[2].search(/^\d/) !== -1) {
      lostMoveGutter = declArr[2];
    }

    decl.parent.nodes.forEach(function lostMoveDirectionFunction(declaration) {
      if (declaration.prop === 'lost-move-direction') {
        lostMoveDirection = declaration.value;

        declaration.remove();
      }
    });

    decl.parent.nodes.forEach(function lostMoveGutterFunction(declaration) {
      if (declaration.prop === 'lost-move-gutter') {
        lostMoveGutter = declaration.value;

        declaration.remove();
      }
    });

    decl.cloneBefore({
      prop: 'position',
      value: 'relative'
    });

    if (lostMoveDirection === 'column') {
      if (lostMoveGutter !== '0') {
        decl.cloneBefore({
          prop: 'top',
          value: 'calc(' + lostMoveRounder + '% * '
          + lostMove + ' - (' + lostMoveGutter + ' - '
          + lostMoveGutter + ' * ' + lostMove + ') + ' + lostMoveGutter + ')'
        });
      } else {
        decl.cloneBefore({
          prop: 'top',
          value: 'calc(' + lostMoveRounder + '% * ' + lostMove + ')'
        });
      }
    } else if (lostMoveGutter !== '0') {
      decl.cloneBefore({
        prop: 'left',
        value: 'calc(' + lostMoveRounder + '% * '
        + lostMove + ' - (' + lostMoveGutter + ' - '
        + lostMoveGutter + ' * ' + lostMove + ') + ' + lostMoveGutter + ')'
      });
    } else {
      decl.cloneBefore({
        prop: 'left',
        value: 'calc(' + lostMoveRounder + '% * ' + lostMove + ')'
      });
    }

    decl.remove();
  });
};
