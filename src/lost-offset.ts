import { lgUtils } from './core/lg-utilities';

export const lostOffset = (css: any, settings: any) => {
  css.walkDecls('lost-offset', function lostOffsetDeclFunction(decl: any) {
    let declArr = [];
    let lostOffsetDirection: any;
    let lostOffsetRounder = settings.rounder;
    let lostOffsetGutter = settings.gutter;

    function cloneAllBefore(props: any) {
      Object.keys(props).forEach(function traverseProps(prop) {
        decl.cloneBefore({
          prop: prop,
          value: props[prop],
        });
      });
    }

    const sanitizedDecl = lgUtils.glueFractionMembers(decl.value);
    declArr = sanitizedDecl.split(' ');
    const lostOffset = declArr[0];
    const lostOffsetNumerator = parseInt(declArr[0].split('/')[0]);

    if (
      (declArr[1] !== undefined && declArr[1] === 'row') ||
      declArr[1] === 'column'
    ) {
      lostOffsetDirection = declArr[1];
    }

    if (declArr[2] !== undefined && declArr[2].search(/^\d/) !== -1) {
      lostOffsetGutter = declArr[2];
    }

    decl.parent.nodes.forEach(function lostOffsetRounderFunction(
      declaration: any
    ) {
      if (declaration.prop === 'lost-offset-rounder') {
        lostOffsetRounder = declaration.value;

        declaration.remove();
      }
    });

    decl.parent.nodes.forEach(function lostOffsetDirectionFunction(
      declaration: any
    ) {
      if (declaration.prop === 'lost-offset-direction') {
        lostOffsetDirection = declaration.value;

        declaration.remove();
      }
    });

    decl.parent.nodes.forEach(function lostOffsetGutterFunction(
      declaration: any
    ) {
      if (declaration.prop === 'lost-offset-gutter') {
        lostOffsetGutter = declaration.value;

        declaration.remove();
      }
    });

    if (lostOffsetDirection === 'column') {
      if (lostOffset === 'clear') {
        decl.cloneBefore({
          prop: 'margin-top',
          value: 'auto!important',
        });
        decl.cloneBefore({
          prop: 'margin-bottom',
          value: 'auto!important',
        });
      } else if (lostOffset === 'clear-top') {
        decl.cloneBefore({
          prop: 'margin-top',
          value: 'auto!important',
        });
      } else if (lostOffset === 'clear-bottom') {
        decl.cloneBefore({
          prop: 'margin-bottom',
          value: 'auto!important',
        });
      } else if (lostOffsetNumerator > 0) {
        if (lostOffsetGutter !== '0') {
          decl.cloneBefore({
            prop: 'margin-bottom',
            value:
              'calc(' +
              lostOffsetRounder +
              '% * ' +
              lostOffset +
              ' - (' +
              lostOffsetGutter +
              ' - ' +
              lostOffsetGutter +
              ' * ' +
              lostOffset +
              ') + (' +
              lostOffsetGutter +
              ' * 2)) !important',
          });
        } else {
          decl.cloneBefore({
            prop: 'margin-bottom',
            value:
              'calc(' +
              lostOffsetRounder +
              '% * ' +
              lostOffset +
              ') !important',
          });
        }
      } else if (lostOffsetNumerator < 0) {
        if (lostOffsetGutter !== '0') {
          decl.cloneBefore({
            prop: 'margin-top',
            value:
              'calc(' +
              lostOffsetRounder +
              '% * (' +
              lostOffset +
              ' * -1) - (' +
              lostOffsetGutter +
              ' - ' +
              lostOffsetGutter +
              ' * (' +
              lostOffset +
              ' * -1)) + ' +
              lostOffsetGutter +
              ') !important',
          });
        } else {
          decl.cloneBefore({
            prop: 'margin-top',
            value:
              'calc(' +
              lostOffsetRounder +
              '% * ' +
              lostOffset +
              ') !important',
          });
        }
      } else {
        decl.cloneBefore({
          prop: 'margin-top',
          value: '0 !important',
        });

        decl.cloneBefore({
          prop: 'margin-bottom',
          value: lostOffsetGutter + ' !important',
        });
      }
    } else if (lostOffset === 'clear') {
      decl.cloneBefore({
        prop: 'margin-left',
        value: 'auto!important',
      });
      decl.cloneBefore({
        prop: 'margin-right',
        value: 'auto!important',
      });
    } else if (lostOffset === 'clear-left') {
      decl.cloneBefore({
        prop: 'margin-left',
        value: 'auto!important',
      });
    } else if (lostOffset === 'clear-right') {
      decl.cloneBefore({
        prop: 'margin-right',
        value: 'auto!important',
      });
    } else if (lostOffsetNumerator > 0) {
      if (lostOffsetGutter !== '0') {
        decl.cloneBefore({
          prop: 'margin-left',
          value:
            'calc(' +
            lostOffsetRounder +
            '% * (-' +
            lostOffset +
            ' * -1) - (' +
            lostOffsetGutter +
            ' - ' +
            lostOffsetGutter +
            ' * (-' +
            lostOffset +
            ' * -1)) + ' +
            lostOffsetGutter +
            ') !important',
        });
      } else {
        decl.cloneBefore({
          prop: 'margin-left',
          value:
            'calc(' + lostOffsetRounder + '% * ' + lostOffset + ') !important',
        });
      }
    } else if (lostOffsetNumerator < 0) {
      if (lostOffsetGutter !== '0') {
        decl.cloneBefore({
          prop: 'margin-left',
          value:
            'calc(' +
            lostOffsetRounder +
            '% * ' +
            lostOffset +
            ' - (' +
            lostOffsetGutter +
            ' - ' +
            lostOffsetGutter +
            ' * ' +
            lostOffset +
            ') + ' +
            lostOffsetGutter +
            ') !important',
        });
      } else {
        decl.cloneBefore({
          prop: 'margin-left',
          value:
            'calc(' + lostOffsetRounder + '% * ' + lostOffset + ') !important',
        });
      }
    } else {
      cloneAllBefore({
        'margin-left': '0 !important',
        'margin-right': lostOffsetGutter + ' !important',
      });
    }

    decl.remove();
  });
};
