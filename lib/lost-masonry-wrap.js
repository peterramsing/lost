var newBlock = require('./new-block.js');

module.exports = function lostMasonryWrapDecl(css, settings) {
  css.walkDecls('lost-masonry-wrap', function lostMasonryWrapDeclFunction(decl) {
    var declArr = [];
    var lostMasonryWrapFlexbox = settings.flexbox;
    var lostMasonryWrapGutter = settings.gutter;
    var lostMasonryWrapGutterUnit;

    function cloneAllBefore(props) {
      Object.keys(props).forEach(function traverseProps(prop) {
        decl.cloneBefore({
          prop: prop,
          value: props[prop]
        });
      });
    }

    declArr = decl.value.split(' ');

    if ((declArr[0] !== undefined && declArr[0] === 'flex') || declArr[0] === 'no-flex') {
      lostMasonryWrapFlexbox = declArr[0];
    }

    if (declArr.indexOf('flex') !== -1) {
      lostMasonryWrapFlexbox = 'flex';
    }

    if (declArr.indexOf('no-flex') !== -1) {
      lostMasonryWrapFlexbox = 'no-flex';
    }

    if (declArr[1] !== undefined && declArr[1].search(/^\d/) !== -1) {
      lostMasonryWrapGutter = declArr[1];
    }

    decl.parent.nodes.forEach(function lostMasonryWrapFlexboxFunction(declaration) {
      if (declaration.prop === 'lost-masonry-wrap-flexbox') {
        if (declaration.value === 'flex') {
          lostMasonryWrapFlexbox = 'flex';
        }

        declaration.remove();
      }
    });

    decl.parent.nodes.forEach(function lostMasonryWrapFunction(declaration) {
      if (declaration.prop === 'lost-masonry-wrap-gutter') {
        lostMasonryWrapGutter = declaration.value;
        declaration.remove();
      }
    });

    if (lostMasonryWrapFlexbox !== 'flex') {
      newBlock(
        decl,
        ':after',
        ['content', 'display', 'clear'],
        ['\'\'', 'table', 'both']
      );

      newBlock(
        decl,
        ':before',
        ['content', 'display'],
        ['\'\'', 'table']
      );
    } else {
      decl.cloneBefore({
        prop: 'display',
        value: 'flex'
      });

      decl.cloneBefore({
        prop: 'flex-flow',
        value: 'row wrap'
      });
    }

    lostMasonryWrapGutterUnit = lostMasonryWrapGutter.match(/\D/g).join('');

    cloneAllBefore({
      'margin-left': (parseInt(lostMasonryWrapGutter, 10) / -2) + lostMasonryWrapGutterUnit,
      'margin-right': (parseInt(lostMasonryWrapGutter, 10) / -2) + lostMasonryWrapGutterUnit
    });

    decl.remove();
  });
};
