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
    decl.parent.nodes.forEach(function lostMasonryColumnFlexboxFunction(declaration) {
      if (declaration.prop === 'lost-masonry-column-flexbox') {
        if (declaration.value === 'flex') {
          lostMasonryColumnFlexbox = 'flex';
        }

        declaration.remove();
      }
    });

    if (lostMasonryColumnGutter !== '0') {
      lostMasonryColumnGutterUnit = lostMasonryColumnGutter.match(/\D/g).join('');
    } else {
      lostMasonryColumnGutterUnit = '';
    }

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
        'margin-left': (parseInt(lostMasonryColumnGutter, 10) / 2),
        'margin-right': (parseInt(lostMasonryColumnGutter, 10) / 2)
      });
    }

    decl.remove();
  });
};
