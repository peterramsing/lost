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
  css.walkDecls('lost-move', function(decl) {
    var declArr = [],
        lostMove,
        lostMoveNumerator,
        lostMoveDirection,
        lostMoveGutter = settings.gutter;

    declArr = decl.value.split(' ');
    lostMove = declArr[0];
    lostMoveNumerator = declArr[0].split('/')[0];

    if (declArr[1] !== undefined && declArr[1] == 'row' || declArr[1] == 'column') {
      lostMoveDirection = declArr[1];
    }

    if (declArr[2] !== undefined && declArr[2].search(/^\d/) !== -1) {
      lostMoveGutter = declArr[2];
    }

    decl.parent.nodes.forEach(function (decl) {
      if (decl.prop == 'lost-move-direction') {
        lostMoveDirection = decl.value;

        decl.remove();
      }
    });

    decl.parent.nodes.forEach(function (decl) {
      if (decl.prop == 'lost-move-gutter') {
        lostMoveGutter = decl.value;

        decl.remove();
      }
    });

    decl.cloneBefore({
      prop: 'position',
      value: 'relative'
    });

    if (lostMoveDirection == 'column') {
      if (lostMoveGutter !== '0') {
        decl.cloneBefore({
          prop: 'top',
          value: 'calc(99.99% * '+ lostMove +' - ('+ lostMoveGutter +' - '+ lostMoveGutter +' * '+ lostMove +') + '+ lostMoveGutter +')'
        });
      } else {
        decl.cloneBefore({
          prop: 'top',
          value: 'calc(99.999999% * '+ lostMove +')'
        });
      }
    } else {
      if (lostMoveGutter !== '0') {
        decl.cloneBefore({
          prop: 'left',
          value: 'calc(99.99% * '+ lostMove +' - ('+ lostMoveGutter +' - '+ lostMoveGutter +' * '+ lostMove +') + '+ lostMoveGutter +')'
        });
      } else {
        decl.cloneBefore({
          prop: 'left',
          value: 'calc(99.999999% * '+ lostMove +')'
        });
      }
    }

    decl.remove();
  });
};
