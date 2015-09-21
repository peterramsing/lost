var newBlock = require('./new-block.js');

/**
 * lost-waffle: Creates a block that is a fraction of the size of its
 * containing element's width AND height with a gutter on the right
 * and bottom.
 *
 * @param {string} [fraction] - This is a simple fraction of the containing
 *   element's width and height.
 *
 * @param {integer} [cycle] - Lost works by assigning a margin-right/bottom
 *   to all elements except the last row (no margin-bottom) and the last
 *   column (no margin-right). It does this by default by using the
 *   denominator of the fraction you pick. To override this default use this
 *   param., e.g.: .foo { lost-waffle: 2/4 2; }
 *
 * @param {length} [gutter] - The margin on the right and bottom side of the
 *   element used to create a gutter. Typically this is left alone and the
 *   global $gutter will be used, but you can override it here if you want
 *   certain elements to have a particularly large or small gutter (pass 0
 *   for no gutter at all).
 *
 * @param {string} [flex|no-flex] - Determines whether this element should
 *   use Flexbox or not.
 *
 * @example
 *   section {
 *     height: 100%;
 *   }
 *   div {
 *     lost-waffle: 1/3;
 *   }
 */
module.exports = function lostWaffleDecl(css, settings) {
  css.walkDecls('lost-waffle', function(decl) {
    var declArr = [],
        lostWaffle,
        lostWaffleCycle,
        lostWaffleGutter = settings.gutter,
        lostWaffleFlexbox = settings.flexbox;

    if (settings.cycle === 'auto') {
      lostWaffleCycle = decl.value.split('/')[1];
    } else {
      lostWaffleCycle = settings.cycle;
    }

    declArr = decl.value.split(' ');
    lostWaffle = declArr[0];

    if (declArr[1] !== undefined && declArr[1].search(/^\d/) !== -1) {
      lostWaffleCycle = declArr[1];
    }

    if (declArr[1] == 'flex' || declArr[1] == 'no-flex' || declArr[1] == 'auto') {
      lostWaffleCycle = declArr[0].split('/')[1];
    }

    if (declArr[2] !== undefined && declArr[2].search(/^\d/) !== -1) {
      lostWaffleGutter = declArr[2];
    }

    if (declArr.indexOf('flex') !== -1) {
      lostWaffleFlexbox = 'flex';
    }

    if (declArr.indexOf('no-flex') !== -1) {
      lostWaffleFlexbox = 'no-flex';
    }

    decl.parent.nodes.forEach(function (decl) {
      if (decl.prop == 'lost-waffle-cycle') {
        lostWaffleCycle = decl.value;

        decl.remove();
      }
    });

    decl.parent.nodes.forEach(function (decl) {
      if (decl.prop == 'lost-waffle-gutter') {
        lostWaffleGutter = decl.value;

        decl.remove();
      }
    });

    decl.parent.nodes.forEach(function (decl) {
      if (decl.prop == 'lost-waffle-flexbox') {
        if (decl.prop == 'flex') {
          lostWaffleFlexbox = 'flex';
        }

        decl.remove();
      }
    });

    if (lostWaffleFlexbox === 'flex') {
      decl.cloneBefore({
        prop: 'flex',
        value: '0 0 auto'
      });

      if (lostWaffleCycle !== 0) {
        newBlock(
          decl,
          ':nth-last-child(-n + '+ lostWaffleCycle +')',
          ['margin-bottom'],
          [0]
        );

        newBlock(
          decl,
          ':nth-child('+ lostWaffleCycle +'n)',
          ['margin-right'],
          [0]
        );
      }

      newBlock(
        decl,
        ':last-child',
        ['margin-right', 'margin-bottom'],
        [0, 0]
      );

      newBlock(
        decl,
        ':nth-child(n)',
        ['margin-right', 'margin-bottom'],
        [lostWaffleGutter, lostWaffleGutter]
      );
    } else {
      if (lostWaffleCycle !== 0) {
        newBlock(
          decl,
          ':nth-last-child(-n + '+ lostWaffleCycle +')',
          ['margin-bottom'],
          [0]
        );

        newBlock(
          decl,
          ':nth-child('+ lostWaffleCycle +'n + 1)',
          ['clear'],
          ['left']
        );

        newBlock(
          decl,
          ':nth-child('+ lostWaffleCycle +'n)',
          ['margin-right'],
          [0]
        );
      }

      newBlock(
        decl,
        ':last-child',
        ['margin-right', 'margin-bottom'],
        [0, 0]
      );

      newBlock(
        decl,
        ':nth-child(n)',
        ['float', 'margin-right', 'margin-bottom', 'clear'],
        ['left', lostWaffleGutter, lostWaffleGutter, 'none']
      );
    }

    if (lostWaffleGutter !== '0') {
      decl.cloneBefore({
        prop: 'width',
        value: 'calc(99.99% * '+ lostWaffle +' - ('+ lostWaffleGutter +' - '+ lostWaffleGutter +' * '+ lostWaffle +'))'
      });

      decl.cloneBefore({
        prop: 'height',
        value: 'calc(99.99% * '+ lostWaffle +' - ('+ lostWaffleGutter +' - '+ lostWaffleGutter +' * '+ lostWaffle +'))'
      });
    } else {
      decl.cloneBefore({
        prop: 'width',
        value: 'calc(99.999999% * '+ lostWaffle +')'
      });

      decl.cloneBefore({
        prop: 'height',
        value: 'calc(99.999999% * '+ lostWaffle +')'
      });
    }

    decl.remove();
  });
};
