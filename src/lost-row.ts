import { newBlock } from './core/lg-new-block';
import { lgLogic } from './core/lg-logic';
import { lgUtils } from './core/lg-utilities';

export const lostRow = (css: any, settings: any, result: any) => {
  css.walkDecls('lost-row', function lostRowDeclFunction(decl: any) {
    let declArr = [];
    let lostRow;
    let unit = settings.gridUnit;
    let lostRowRounder = settings.rounder;
    let lostRowGutter = settings.gutter;
    let lostRowFlexbox = settings.flexbox;
    const validUnits = ['%', 'vh'];

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

      decl.parent.nodes.forEach(function lostRowRounderFunction(
        declaration: any
      ) {
        if (declaration.prop === 'lost-row-rounder') {
          lostRowRounder = declaration.value;

          declaration.remove();
        }
      });

      decl.parent.nodes.forEach(function lostRowGutterFunction(
        declaration: any
      ) {
        if (declaration.prop === 'lost-row-gutter') {
          lostRowGutter = declaration.value;

          declaration.remove();
        }
      });

      decl.parent.nodes.forEach(function lostRowFlexboxFunction(
        declaration: any
      ) {
        if (declaration.prop === 'lost-row-flexbox') {
          if (declaration.value === 'flex') {
            lostRowFlexbox = 'flex';
          }

          declaration.remove();
        }
      });

      decl.parent.nodes.forEach((declaration: any) => {
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
        value: '100%',
      });

      if (lostRowFlexbox === 'flex') {
        decl.cloneBefore({
          prop: 'flex',
          value: '0 0 auto',
        });
      }

      if (lostRowGutter !== '0') {
        decl.cloneBefore({
          prop: 'height',
          value: lgLogic.calcValue(
            lostRow,
            lostRowGutter,
            lostRowRounder,
            unit
          ),
        });
      } else {
        decl.cloneBefore({
          prop: 'height',
          value: lgLogic.calcValue(
            lostRow,
            lostRowGutter,
            lostRowRounder,
            unit
          ),
        });
      }

      decl.cloneBefore({
        prop: 'margin-bottom',
        value: lostRowGutter,
      });

      newBlock(decl, ':last-child', ['margin-bottom'], [0]);
    } else {
      decl.cloneBefore({
        prop: 'width',
        value: 'auto',
      });

      decl.cloneBefore({
        prop: 'height',
        value: 'auto',
      });

      decl.cloneBefore({
        prop: 'margin-bottom',
        value: '0',
      });
    }

    decl.remove();
  });
};
