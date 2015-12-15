'use strict';

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
    var declArr = decl.value.split(' '),
        lostColumnCycle = settings.cycle,
        lostColumnGutter = settings.gutter,
        lostColumnFlexbox = settings.flexbox,
        lostColumnSelector = settings.selector,
        lostColumn;
    for (let i = 0; i < declArr.length; i++) {
      if (settings.cycle === 'auto' && declArr[i].indexOf('/') !== -1) {
        lostColumnCycle = declArr[i].split('/')[1];
      }
      if (!isNaN(declArr[i])) {
        lostColumnCycle = declArr[i];
        break;
      }
    }
    for (let i = 0; i < declArr.length; i++) {
      if (declArr[i].indexOf('/') !== -1) {
        lostColumn = declArr[i];
      }
      if (declArr[i].indexOf('px') !== -1 || parseInt(declArr[i]) === 0) {
        lostColumnGutter = declArr[i];
      }
      if (declArr[i].indexOf('flex') !== -1) {
        lostColumnFlexbox = declArr[i];
      }
      if (declArr[i].indexOf('nth') !== -1) {
        lostColumnSelector = declArr[i];
      }
    }

    function lostBuildSelector(items) {
      let result;
      if (items) {
        result = [':', lostColumnSelector, '(', items, ')'];
      } else {
        result = [':last', lostColumnSelector.substr(3)];
      }
      return result.join('');
    }

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
        lostBuildSelector(),
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
        lostBuildSelector(),
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
