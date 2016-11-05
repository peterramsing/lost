/**
 * lost-masonry-column: Creates a column for working with JS masonry
 * libraries like Isotope. Assigns a margin to each side of the element.
 *
 * @param {length} [gutter] - How large the gutter involved is, typically
 *   this won't be adjusted and will inherit settings.gutter, but it's made
 *   available if you want your masonry grid to have a special gutter, it
 *   should match your masonry-row's gutter.
 *
 * @param {string} [flex|no-flex] - Determines whether this element should
 *   use Flexbox or not.
 *
 * @example
 *   section {
 *     lost-masonry-wrap: flex 60px;
 *   }
 *   div {
 *     lost-masonry-column: 1/3 60px flex;
 *   }
 */
module.exports = function lostMasonryColumnDecl(css, settings) {
  css.walkDecls('lost-masonry-column', function lostMasonryColumnFunction(decl) {
    var declArr = [];
    var lostMasonryColumn;
    var lostMasonryColumnRounder = settings.rounder;
    var lostMasonryColumnFlexbox = settings.flexbox;
    var lostMasonryColumnGutter = settings.gutter;
    var lostMasonryColumnGutterUnit;

    function cloneAllBefore(props) {
      Object.keys(props).forEach(function traverseProps(prop) {
        decl.cloneBefore({
          prop: prop,
          value: props[prop]
        });
      });
    }

    declArr = decl.value.split(' ');
    lostMasonryColumn = declArr[0];

    if (declArr[1] !== undefined && declArr[1].search(/^\d/) !== -1) {
      lostMasonryColumnGutter = declArr[1];
    }

    if ((declArr[2] !== undefined && declArr[2] === 'flex') || declArr[2] === 'no-flex') {
      lostMasonryColumnFlexbox = declArr[2];
    }

    if (declArr.indexOf('flex') !== -1) {
      lostMasonryColumnFlexbox = 'flex';
    }

    if (declArr.indexOf('no-flex') !== -1) {
      lostMasonryColumnFlexbox = 'no-flex';
    }

    decl.parent.nodes.forEach(function lostMasonryColumnRounderFunction(declaration) {
      if (declaration.prop === 'lost-masonry-column-rounder') {
        lostMasonryColumnRounder = declaration.value;

        declaration.remove();
      }
    });

    decl.parent.nodes.forEach(function lostMasonryColumnGutterFunction(declaration) {
      if (declaration.prop === 'lost-masonry-column-gutter') {
        lostMasonryColumnGutter = declaration.value;

        declaration.remove();
      }
    });
    decl.parent.nodes.forEach(function lostMasonryColumnRounderFunction(declaration) {
      if (declaration.prop === 'lost-rounder') {
        lostMasonryColumnRounder = declaration.value;

        declaration.remove();
      }
    });
    decl.parent.nodes.forEach(function lostMasonryColumnFlexboxFunction(declaration) {
      if (declaration.prop === 'lost-masonry-column-flexbox') {
        if (declaration.value === 'flex') {
          lostMasonryColumnFlexbox = 'flex';
        }

        declaration.remove();
      }
    });

    lostMasonryColumnGutterUnit = lostMasonryColumnGutter.match(/\D/g).join('');

    if (lostMasonryColumnFlexbox === 'flex') {
      decl.cloneBefore({
        prop: 'flex',
        value: '0 0 auto'
      });
    } else {
      decl.cloneBefore({
        prop: 'float',
        value: 'left'
      });
    }

    if (lostMasonryColumnGutter !== '0') {
      cloneAllBefore({
        width: 'calc(' + lostMasonryColumnRounder + '% * ' + lostMasonryColumn +
        ' - ' + lostMasonryColumnGutter + ')',
        'margin-left': (parseInt(lostMasonryColumnGutter, 10) / 2) + lostMasonryColumnGutterUnit,
        'margin-right': (parseInt(lostMasonryColumnGutter, 10) / 2) + lostMasonryColumnGutterUnit
      });
    } else {
      cloneAllBefore({
        width: 'calc(' + lostMasonryColumnRounder + '% * ' + lostMasonryColumn + ')',
        'margin-left': (parseInt(lostMasonryColumnGutter, 10) / 2) + lostMasonryColumnGutterUnit,
        'margin-right': (parseInt(lostMasonryColumnGutter, 10) / 2) + lostMasonryColumnGutterUnit
      });
    }

    decl.remove();
  });
};
