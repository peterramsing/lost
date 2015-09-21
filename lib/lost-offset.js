/**
 * lost-offset: Margin to the left, right, bottom, or top, of an element
 * depending on if the fraction passed is positive or negative. It works for
 * both horizontal and vertical grids but not both.
 *
 * @param {string} [fraction] - Fraction of the container to be offset.
 *
 * @param {string} [row|column] - Direction the grid is going. Should be the
 *   opposite of the column or row it's being used on. Defaults to row.
 *
 * @param {length} [gutter] - How large the gutter involved is, typically
 *   this won't be adjusted, but if you have set the elements for that
 *   container to have different gutters than default, you will need to
 *   match that gutter here as well.
 *
 * @example
 *   .two-elements {
 *     lost-column: 1/3;
 *   }
 *   .two-elements:first-child {
 *     lost-offset: 1/3;
 *   }
 */
module.exports = function lostOffsetDecl(css, settings) {
  css.walkDecls('lost-offset', function(decl) {
    var declArr = [],
        lostOffset,
        lostOffsetNumerator,
        lostOffsetDirection,
        lostOffsetGutter = settings.gutter;

    declArr = decl.value.split(' ');
    lostOffset = declArr[0];
    lostOffsetNumerator = declArr[0].split('/')[0];

    if (declArr[1] !== undefined && declArr[1] == 'row' || declArr[1] == 'column') {
      lostOffsetDirection = declArr[1];
    }

    if (declArr[2] !== undefined && declArr[2].search(/^\d/) !== -1) {
      lostOffsetGutter = declArr[2];
    }

    decl.parent.nodes.forEach(function (decl) {
      if (decl.prop == 'lost-offset-direction') {
        lostOffsetDirection = decl.value;

        decl.remove();
      }
    });

    decl.parent.nodes.forEach(function (decl) {
      if (decl.prop == 'lost-offset-gutter') {
        lostOffsetGutter = decl.value;

        decl.remove();
      }
    });

    if (lostOffsetDirection == 'column') {
      if (lostOffsetNumerator > 0) {
        if (lostOffsetGutter !== '0') {
          decl.cloneBefore({
            prop: 'margin-bottom',
            value: 'calc(99.99% * '+ lostOffset +' - ('+ lostOffsetGutter +' - '+ lostOffsetGutter +' * '+ lostOffset +') + ('+ lostOffsetGutter +' * 2)) !important'
          });
        } else {
          decl.cloneBefore({
            prop: 'margin-bottom',
            value: 'calc(99.999999% * '+ lostOffset +') !important'
          });
        }
      } else if (lostOffsetNumerator < 0) {
        if (lostOffsetGutter !== '0') {
          decl.cloneBefore({
            prop: 'margin-top',
            value: 'calc(99.99% * ('+ lostOffset +' * -1) - ('+ lostOffsetGutter +' - '+ lostOffsetGutter +' * ('+ lostOffset +' * -1)) + '+ lostOffsetGutter +') !important'
          });
        } else {
          decl.cloneBefore({
            prop: 'margin-top',
            value: 'calc(99.999999% * '+ lostOffset +') !important'
          });
        }
      } else {
        decl.cloneBefore({
          prop: 'margin-top',
          value: '0 !important'
        });

        decl.cloneBefore({
          prop: 'margin-bottom',
          value: lostOffsetGutter +' !important'
        });
      }
    } else {
      if (lostOffsetNumerator > 0) {
        if (lostOffsetGutter !== '0') {
          decl.cloneBefore({
            prop: 'margin-right',
            value: 'calc(99.99% * '+ lostOffset +' - ('+ lostOffsetGutter +' - '+ lostOffsetGutter +' * '+ lostOffset +') + ('+ lostOffsetGutter +' * 2)) !important'
          });
        } else {
          decl.cloneBefore({
            prop: 'margin-right',
            value: 'calc(99.999999% * '+ lostOffset +') !important'
          });
        }
      } else if (lostOffsetNumerator < 0) {
        if (lostOffsetGutter !== '0') {
          decl.cloneBefore({
            prop: 'margin-left',
            value: 'calc(99.99% * ('+ lostOffset +' * -1) - ('+ lostOffsetGutter +' - '+ lostOffsetGutter +' * ('+ lostOffset +' * -1)) + '+ lostOffsetGutter +') !important'
          });
        } else {
          decl.cloneBefore({
            prop: 'margin-left',
            value: 'calc(99.999999% * '+ lostOffset +') !important'
          });
        }
      } else {
        decl.cloneBefore({
          prop: 'margin-left',
          value: '0 !important'
        });

        decl.cloneBefore({
          prop: 'margin-right',
          value: lostOffsetGutter +' !important'
        });
      }
    }

    decl.remove();
  });
};
