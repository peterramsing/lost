var newBlock = require('./new-block.js');

var lgLogic = require('./_lg-logic');
var lgUtils = require('./_lg-utilities');

module.exports = function lostRowDecl(css, settings, result) {
  css.walkDecls('lost-row', function lostRowDeclFunction(decl) {
    var declArr = [];
    var lostRow;
    var unit = settings.gridUnit;
    var lostRowRounder = settings.rounder;
    var lostRowGutter = settings.gutter;
    var lostRowFlexbox = settings.flexbox;
    var validUnits = ['%', 'vh'];

    if (decl.value !== 'none') {
      const sanitizedDecl = lgUtils.glueFractionMembers(decl.value);
      declArr = sanitizedDecl.split(' ');
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

      decl.parent.nodes.forEach(function lostRowRounderFunction(declaration) {
        if (declaration.prop === 'lost-row-rounder') {
          lostRowRounder = declaration.value;

          declaration.remove();
        }
      });

      decl.parent.nodes.forEach(function lostRowGutterFunction(declaration) {
        if (declaration.prop === 'lost-row-gutter') {
          lostRowGutter = declaration.value;

          declaration.remove();
        }
      });

      decl.parent.nodes.forEach(function lostRowFlexboxFunction(declaration) {
        if (declaration.prop === 'lost-row-flexbox') {
          if (declaration.value === 'flex') {
            lostRowFlexbox = 'flex';
          }

          declaration.remove();
        }
      });

      decl.parent.nodes.forEach(declaration => {
        if (declaration.prop === 'lost-unit') {
          if (lgLogic.validateUnit(declaration.value, validUnits)) {
            unit = declaration.value;
          } else {
            decl.warn(
              result,
              `${declaration.value} is not a valid unit for lost-row`
            );
          }
          declaration.remove();
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
          value: lgLogic.calcValue(lostRow, lostRowGutter, lostRowRounder, unit)
        });
      } else {
        decl.cloneBefore({
          prop: 'height',
          value: lgLogic.calcValue(lostRow, lostRowGutter, lostRowRounder, unit)
        });
      }

      decl.cloneBefore({
        prop: 'margin-bottom',
        value: lostRowGutter
      });

      newBlock(decl, ':last-child', ['margin-bottom'], [0]);
    } else {
      decl.cloneBefore({
        prop: 'width',
        value: 'auto'
      });

      decl.cloneBefore({
        prop: 'height',
        value: 'auto'
      });

      decl.cloneBefore({
        prop: 'margin-bottom',
        value: '0'
      });
    }

    decl.remove();
  });
};
