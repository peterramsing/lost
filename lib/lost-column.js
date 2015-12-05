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
  css.walkDecls('lost-column', function(decl) {
    var lostColumnCycle,
        declArr = decl.value.split(' '),
        lostColumn = declArr[0],
        lostColumnCycle = declArr.reduce((initVal, curVal, index, arr) => {
          let cycle = (settings.cycle === 'auto')
            ? lostColumn.split('/')[1]
            : settings.cycle
          let cycle = (! parseInt(curVal).isNaN())
            ? arr[index]
            : cycle;
        }, 0);
        lostColumnGutter = declArr.reduce((initVal, curVal, index, arr) => {
          return (curVal.indexOf('px') !== -1)
            ? arr[index]
            : settings.gutter;
        }, 0);
        lostColumnFlexbox = declArr.reduce((initVal, curVal, index, arr) => {
          return (curVal.indexOf('flex') !== -1)
            ? arr[index]
            : settings.flexbox;
        }, 0);
        lostColumnSelector = declArr.reduce((initVal, curVal, index, arr) => {
          return (curVal.indexOf('nth-') !== -1)
            ? arr[index]
            : settings.selector;
        }, 0);
        console.log(declArr);

    function lostBuildSelector(items) {
      return [
        ':',
        lostColumnSelector,
        '(',
        items,
        ')'
      ].join('');
    }

    // if (settings.cycle === 'auto') {
    //   lostColumnCycle = decl.value.split('/')[1];
    // } else {
    //   lostColumnCycle = settings.cycle;
    // }
    //
    // if (declArr[1] !== undefined && declArr[1].search(/^\d/) !== -1) {
    //   lostColumnCycle = declArr[1];
    // }

    decl.parent.nodes.forEach(function (decl) {
      if (decl.prop == 'lost-column-cycle') {
        lostColumnCycle = decl.value;

        decl.remove();
      }
    });

    decl.parent.nodes.forEach(function (decl) {
      if (decl.prop == 'lost-column-gutter') {
        lostColumnGutter = decl.value;

        decl.remove();
      }
    });

    decl.parent.nodes.forEach(function (decl) {
      if (decl.prop == 'lost-column-flexbox') {
        if (decl.prop == 'flex') {
          lostColumnFlexbox = 'flex';
        }

        decl.remove();
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
          lostBuildSelector([lostColumnCycle, 'n'].join('')),
          ['margin-right'],
          [0]
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
        lostBuildSelector('n'),
        ['margin-right'],
        [lostColumnGutter]
      );
    } else {

      if (lostColumnCycle !== 0) {
        newBlock(
          decl,
          lostBuildSelector([lostColumnCycle, 'n + 1'].join('')),
          ['clear'],
          ['left']
        );

        newBlock(
          decl,
          lostBuildSelector([lostColumnCycle, 'n'].join('')),
          ['margin-right'],
          [0]
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
        lostBuildSelector('n'),
        ['float', 'margin-right', 'clear'],
        ['left', lostColumnGutter, 'none']
      );
    }

    if (lostColumnGutter !== '0') {
      decl.cloneBefore({
        prop: 'width',
        value: 'calc(99.99% * '+ lostColumn +' - ('+ lostColumnGutter +' - '+ lostColumnGutter +' * '+ lostColumn +'))'
      });
    } else {
      decl.cloneBefore({
        prop: 'width',
        value: 'calc(99.999999% * '+ lostColumn +')'
      });
    }

    decl.remove();
  });
};
