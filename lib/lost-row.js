var newBlock = require('./new-block.js');

/**
 * lost-row: Creates a row that is a fraction of the size of its containing
 * element's height with a gutter.
 *
 * @param {string} [fraction] - This is a simple fraction of the containing
 *   element's height.
 *
 * @param {length} [gutter] - The margin on the bottom of the element used
 *   to create a gutter. Typically this is left alone and settings.gutter
 *   will be used, but you can override it here if you want certain elements
 *   to have a particularly large or small gutter (pass 0 for no gutter at
 *   all).
 *
 * @param {string} [flex|no-flex] - Determines whether this element should
 *   use Flexbox or not.
 *
 * @example
 *   section {
 *     height: 100%;
 *   }
 *   div {
 *     lost-row: 1/3;
 *   }
 */
module.exports = function lostRowDecl(css, settings) {
  css.walkDecls('lost-row', function(decl) {
    var declArr = [],
        lostRow,
        lostRowGutter = settings.gutter,
        lostRowFlexbox = settings.flexbox;

    declArr = decl.value.split(' ');
    lostRow = declArr[0];

    if (declArr[1] !== undefined && declArr[1].search(/^\d/) !== -1) {
      lostRowGutter = declArr[1];
    }

    if (declArr.indexOf('flex') !== -1) {
      lostRowFlexbox = 'flex';
    }

    if (declArr.indexOf('no-flex') !== -1) {
      lostRowFlexbox = 'no-flex';
    }

    decl.parent.nodes.forEach(function (decl) {
      if (decl.prop == 'lost-row-gutter') {
        lostRowGutter = decl.value;

        decl.remove();
      }
    });

    decl.parent.nodes.forEach(function (decl) {
      if (decl.prop == 'lost-row-flexbox') {
        if (decl.prop == 'flex') {
          lostRowFlexbox = 'flex';
        }

        decl.remove();
      }
    });

    decl.cloneBefore({
      prop: 'width',
      value: '100%'
    });

    if (lostRowFlexbox === 'flex') {
      decl.cloneBefore({
        prop: 'flex',
        value: '0 0 auto'
      });
    }

    if (lostRowGutter !== '0') {
      decl.cloneBefore({
        prop: 'height',
        value: 'calc(99.99% * '+ lostRow +' - ('+ lostRowGutter +' - '+ lostRowGutter +' * '+ lostRow +'))'
      });
    } else {
      decl.cloneBefore({
        prop: 'height',
        value: 'calc(99.999999% * '+ lostRow +')'
      });
    }

    decl.cloneBefore({
      prop: 'margin-bottom',
      value: lostRowGutter
    });

    newBlock(
      decl,
      ':last-child',
      ['margin-bottom'],
      [0]
    );

    decl.remove();
  });
};
