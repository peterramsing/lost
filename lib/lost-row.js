var newBlock = require('./new-block.js');
var buildSelector = require('./buildSelector.js');
var lostArgs = require('./lostArgs.js');

/**
 * lost-row: Creates a row that is a fraction of the size of its containing
 * element's height with a gutter.
 *
 * @param {string} css - CSS to parse.
 *
 * @param {array} settings - Lost default settings.
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
    var args = lostArgs(settings, decl);

    decl.parent.nodes.forEach(function (decl) {
      if (decl.prop == 'lost-row-gutter') {
        args.gutter = decl.value;

        decl.remove();
      }
    });

    decl.parent.nodes.forEach(function (decl) {
      if (decl.prop == 'lost-row-flexbox') {
        if (decl.prop == 'flex') {
          args.flexbox = 'flex';
        }

        decl.remove();
      }
    });

    decl.cloneBefore({
      prop: 'width',
      value: '100%'
    });

    if (args.flexbox === 'flex') {
      decl.cloneBefore({
        prop: 'flex',
        value: '0 0 auto'
      });
    }

    if (args.gutter !== '0') {
      decl.cloneBefore({
        prop: 'height',
        value: 'calc(99.99% * '+ args.column +' - ('+ args.gutter +' - '+ args.gutter +' * '+ args.column +'))'
      });
    } else {
      decl.cloneBefore({
        prop: 'height',
        value: 'calc(99.999999% * '+ args.column +')'
      });
    }

    decl.cloneBefore({
      prop: 'margin-bottom',
      value: args.gutter
    });

    newBlock(
      decl,
      buildSelector(args.selector),
      ['margin-bottom'],
      [0]
    );

    decl.remove();
  });
};
