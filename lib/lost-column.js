var newBlock = require('./new-block.js');
var buildSelector = require('./buildSelector.js');
var lostArgs = require('./lostArgs.js');

/**
 * lost-column: Creates a column that is a fraction of the size of its
 * containing element's width with a gutter.
 *
 * @param {string} css - CSS to parse.
 *
 * @param {array} settings - Lost default settings.
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
    var args = lostArgs(settings, decl);

    decl.parent.nodes.forEach(function (decl) {
      if (decl.prop == 'lost-column-cycle') {
        args.cycle = decl.value;

        decl.remove();
      }
    });

    decl.parent.nodes.forEach(function (decl) {
      if (decl.prop == 'lost-column-gutter') {
        args.gutter = decl.value;

        decl.remove();
      }
    });

    decl.parent.nodes.forEach(function (decl) {
      if (decl.prop == 'lost-column-flexbox') {
        if (decl.prop == 'flex') {
          args.flexbox = 'flex';
        }

        decl.remove();
      }
    });

    if (args.flexbox === 'flex') {
      decl.cloneBefore({
        prop: 'flex',
        value: '0 0 auto'
      });

      if (args.cycle !== 0) {
        newBlock(
          decl,
          buildSelector(args.selector, [args.cycle, 'n'].join('')),
          ['margin-right'],
          [0]
        );
      }

      newBlock(
        decl,
        buildSelector(args.selector),
        ['margin-right'],
        [0]
      );

      newBlock(
        decl,
        buildSelector(args.selector, 'n'),
        ['margin-right'],
        [args.gutter]
      );
    } else {

      if (args.cycle !== 0) {
        newBlock(
          decl,
          buildSelector(args.selector, [args.cycle, 'n + 1'].join('')),
          ['clear'],
          ['left']
        );

        newBlock(
          decl,
          buildSelector(args.selector, [args.cycle, 'n'].join('')),
          ['margin-right'],
          [0]
        );
      }

      newBlock(
        decl,
        buildSelector(args.selector),
        ['margin-right'],
        [0]
      );

      newBlock(
        decl,
        buildSelector(args.selector, 'n'),
        ['float', 'margin-right', 'clear'],
        ['left', args.gutter, 'none']
      );
    }

    if (args.gutter !== '0') {
      decl.cloneBefore({
        prop: 'width',
        value: 'calc(99.99% * '+ args.column +' - ('+ args.gutter +' - '+ args.gutter +' * '+ args.column +'))'
      });
    } else {
      decl.cloneBefore({
        prop: 'width',
        value: 'calc(99.999999% * '+ args.column +')'
      });
    }

    decl.remove();
  });
};
