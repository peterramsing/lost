import { newBlock } from './core/lg-new-block';
import { lgUtils } from './core/lg-utilities';

const unitsMatch = (...args: any) => {
  const re = /(px|%|em|rem|vh|vw)$/gi;
  const extension = args[0].match(re).toString();
  let matched = true;

  args.forEach(function compareExtension(arg: any) {
    if (arg.match(re).toString() !== extension) {
      matched = false;
    }
  });
  return matched;
};

export const lostUtility = (css: any) => {
  css.walkDecls('lost-utility', function lostUtilityDeclFunction(decl: any) {
    const utilityArray = decl.value.split(' ');
    const utility = utilityArray[0];
    let color;

    if (utility === 'edit') {
      if (utilityArray[1]) {
        color = lgUtils.getColorValue(decl.value);

        newBlock(
          decl,
          ' *:not(input):not(textarea):not(select)',
          ['background-color'],
          ['rgba(' + color[0] + ',' + color[1] + ',' + color[2] + ', 0.1)']
        );
      } else {
        newBlock(
          decl,
          ' *:not(input):not(textarea):not(select)',
          ['background-color'],
          ['rgba(0, 0, 255, 0.1)']
        );
      }
    }

    if (utility === 'clearfix') {
      newBlock(
        decl,
        ':after',
        ['content', 'display', 'clear'],
        ["''", 'table', 'both']
      );

      newBlock(decl, ':before', ['content', 'display'], ["''", 'table']);
    }

    if (utility === 'overlay') {
      let maxWidth = utilityArray[1] || '1024px',
        numCols = utilityArray[2] || 12,
        gutter = utilityArray[3] || '20px',
        totalGutter = parseFloat(gutter) * (numCols - 1),
        colWidth =
          ((parseFloat(maxWidth) - totalGutter) /
            numCols /
            parseFloat(maxWidth)) *
          100,
        gutterPercentage = (parseFloat(gutter) / parseFloat(maxWidth)) * 100,
        position = 0,
        gradient = 'to right, ';

      color = utilityArray[4] || '#e6f6ff';

      if (!unitsMatch(maxWidth, gutter)) {
        throw decl.error(
          'lost-utility: Please use the same units for width and gutter.',
          { plugin: 'lost', word: 'lost-utility' }
        );
      }

      for (let i = 1; i < numCols; i++) {
        // Start of color column
        gradient = gradient + color + ' ' + position + '%, ';

        // Move position to end of color column
        position = position + colWidth;

        // End of color column + Start of gutter column
        gradient =
          gradient +
          color +
          ' ' +
          position +
          '%, transparent ' +
          position +
          '%, ';

        // Move position to end of gutter column
        position = position + gutterPercentage;

        // End of gutter column
        gradient = gradient + 'transparent ' + position + '%, ';
      }

      gradient = gradient + color + ' ' + position + '%, ' + color + ' 100%';

      newBlock(
        decl,
        ':before',
        [
          'background-image',
          'content',
          'display',
          'height',
          'left',
          'margin',
          'max-width',
          'opacity',
          'pointer-events',
          'position',
          'right',
          'width',
          'z-index',
        ],
        [
          'linear-gradient(' + gradient + ')',
          "''",
          'inline-block',
          '100%',
          '0',
          '0 auto',
          maxWidth,
          '0.4',
          'none',
          'fixed',
          '0',
          '100%',
          '1',
        ]
      );
    }

    if (decl.parent.nodes.length === 1) {
      decl.parent.remove();
    } else {
      decl.remove();
    }
  });
};
