import { lgUtils } from './core/lg-utilities';

export const lostMasonryColumn = (css: any, settings: any) => {
  css.walkDecls(
    'lost-masonry-column',
    function lostMasonryColumnFunction(decl: any) {
      let declArr = [];
      let lostMasonryColumn;
      let lostMasonryColumnRounder = settings.rounder;
      let lostMasonryColumnFlexbox = settings.flexbox;
      let lostMasonryColumnGutter = settings.gutter;
      let lostMasonryColumnGutterUnit;

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

      decl.parent.nodes.forEach(function lostMasonryColumnRounderFunction(
        declaration: any
      ) {
        if (declaration.prop === 'lost-masonry-column-rounder') {
          lostMasonryColumnRounder = declaration.value;

          declaration.remove();
        }
      });

      decl.parent.nodes.forEach(function lostMasonryColumnGutterFunction(
        declaration: any
      ) {
        if (declaration.prop === 'lost-masonry-column-gutter') {
          lostMasonryColumnGutter = declaration.value;

          declaration.remove();
        }
      });
      decl.parent.nodes.forEach(function lostMasonryColumnFlexboxFunction(
        declaration: any
      ) {
        if (declaration.prop === 'lost-masonry-column-flexbox') {
          if (declaration.value === 'flex') {
            lostMasonryColumnFlexbox = 'flex';
          }

          declaration.remove();
        }
      });

      if (lostMasonryColumnGutter !== '0') {
        lostMasonryColumnGutterUnit = lostMasonryColumnGutter
          .match(/\D/g)
          .join('');
      } else {
        lostMasonryColumnGutterUnit = '';
      }

      if (lostMasonryColumnFlexbox === 'flex') {
        decl.cloneBefore({
          prop: 'flex',
          value: '0 0 auto',
        });
      } else {
        decl.cloneBefore({
          prop: 'float',
          value: 'left',
        });
      }

      if (lostMasonryColumnGutter !== '0') {
        cloneAllBefore({
          width:
            'calc(' +
            lostMasonryColumnRounder +
            '% * ' +
            lostMasonryColumn +
            ' - ' +
            lostMasonryColumnGutter +
            ')',
          'margin-left':
            parseInt(lostMasonryColumnGutter, 10) / 2 +
            lostMasonryColumnGutterUnit,
          'margin-right':
            parseInt(lostMasonryColumnGutter, 10) / 2 +
            lostMasonryColumnGutterUnit,
        });
      } else {
        cloneAllBefore({
          width:
            'calc(' +
            lostMasonryColumnRounder +
            '% * ' +
            lostMasonryColumn +
            ')',
          'margin-left': parseInt(lostMasonryColumnGutter, 10) / 2,
          'margin-right': parseInt(lostMasonryColumnGutter, 10) / 2,
        });
      }

      decl.remove();
    }
  );
};
