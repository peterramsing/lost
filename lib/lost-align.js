var newBlock = require('./new-block.js');

/**
 * lost-align: Align nested elements. Apply this to a parent container.
 *
 * @param {string} [reset|horizontal|vertical|top-left|top-center|top|
 * top-right|middle-left|left|middle-center|center|middle-right|right|
 * bottom-left|bottom-center|bottom|bottom-right] - The position the nested
 *   element takes relative to the containing element.
 *
 * @param {string} [flex|no-flex] - Determines whether this element should
 *   use Flexbox or not.
 *
 * @example
 *   .parent {
 *     lost-align: right;
 *     width: 600px;
 *     height: 400px;
 *   }
 *   .child {
 *     width: 300px;
 *     height: 150px;
 *   }
 */
module.exports = function lostAlignDecl(css, settings) {
  css.walkDecls('lost-align', function(decl) {
    var declArr = [];
    var lostAlign;

    declArr = decl.value.split(' ');
    lostAlign = declArr[0];

    if (declArr[1] !== 'flex') {
      if (lostAlign == 'reset') {
        decl.cloneBefore({
          prop: 'position',
          value: 'static'
        });

        newBlock(
          decl,
          ' > *',
          ['position', 'top', 'right', 'bottom', 'left', 'transform'],
          ['static', 'auto', 'auto', 'auto', 'auto', 'translate(0, 0)']
        );
      } else {
        decl.cloneBefore({
          prop: 'position',
          value: 'relative'
        });

        if (lostAlign == 'horizontal') {
          newBlock(
            decl,
            ' > *',
            ['position', 'top', 'right', 'bottom', 'left', 'transform'],
            ['absolute', 'auto', 'auto', 'auto', '50%', 'translate(-50%, 0)']
          );
        } else if (lostAlign == 'vertical') {
          newBlock(
            decl,
            ' > *',
            ['position', 'top', 'right', 'bottom', 'left', 'transform'],
            ['absolute', '50%', 'auto', 'auto', 'auto', 'translate(0, -50%)']
          );
        } else if (lostAlign == 'top-left') {
          newBlock(
            decl,
            ' > *',
            ['position', 'top', 'right', 'bottom', 'left', 'transform'],
            ['absolute', '0', 'auto', 'auto', '0', 'translate(0, 0)']
          );
        } else if (lostAlign == 'top-center' || lostAlign == 'top') {
          newBlock(
            decl,
            ' > *',
            ['position', 'top', 'right', 'bottom', 'left', 'transform'],
            ['absolute', '0', 'auto', 'auto', '50%', 'translate(-50%, 0)']
          );
        } else if (lostAlign == 'top-right') {
          newBlock(
            decl,
            ' > *',
            ['position', 'top', 'right', 'bottom', 'left', 'transform'],
            ['absolute', '0', '0', 'auto', 'auto', 'translate(0, 0)']
          );
        } else if (lostAlign == 'middle-left' || lostAlign == 'left') {
          newBlock(
            decl,
            ' > *',
            ['position', 'top', 'right', 'bottom', 'left', 'transform'],
            ['absolute', '50%', 'auto', 'auto', '0', 'translate(0, -50%)']
          );
        } else if (lostAlign == 'middle-center' || lostAlign == 'center') {
          newBlock(
            decl,
            ' > *',
            ['position', 'top', 'right', 'bottom', 'left', 'transform'],
            ['absolute', '50%', 'auto', 'auto', '50%', 'translate(-50%, -50%)']
          );
        } else if (lostAlign == 'middle-right' || lostAlign == 'right') {
          newBlock(
            decl,
            ' > *',
            ['position', 'top', 'right', 'bottom', 'left', 'transform'],
            ['absolute', '50%', '0', 'auto', 'auto', 'translate(0, -50%)']
          );
        } else if (lostAlign == 'bottom-left') {
          newBlock(
            decl,
            ' > *',
            ['position', 'top', 'right', 'bottom', 'left', 'transform'],
            ['absolute', 'auto', 'auto', '0', '0', 'translate(0, 0)']
          );
        } else if (lostAlign == 'bottom-center' || lostAlign == 'bottom') {
          newBlock(
            decl,
            ' > *',
            ['position', 'top', 'right', 'bottom', 'left', 'transform'],
            ['absolute', 'auto', 'auto', '0', '50%', 'translate(-50%, 0)']
          );
        } else if (lostAlign == 'bottom-right') {
          newBlock(
            decl,
            ' > *',
            ['position', 'top', 'right', 'bottom', 'left', 'transform'],
            ['absolute', 'auto', '0', '0', 'auto', 'translate(0, 0)']
          );
        }
      }
    } else {
      if (lostAlign == 'reset') {
        decl.cloneBefore({
          prop: 'display',
          value: 'initial'
        });

        newBlock(
          decl,
          ' > *',
          ['justify-content', 'align-items'],
          ['inherit', 'inherit']
        );
      } else {
        decl.cloneBefore({
          prop: 'display',
          value: 'flex'
        });

        if (lostAlign == 'horizontal') {
          newBlock(
            decl,
            ' > *',
            ['justify-content', 'align-items'],
            ['center', 'inherit']
          );
        } else if (lostAlign == 'vertical') {
          newBlock(
            decl,
            ' > *',
            ['justify-content', 'align-items'],
            ['inherit', 'center']
          );
        } else if (lostAlign == 'top-left') {
          newBlock(
            decl,
            ' > *',
            ['justify-content', 'align-items'],
            ['flex-start', 'flex-start']
          );
        } else if (lostAlign == 'top-center' || lostAlign == 'top') {
          newBlock(
            decl,
            ' > *',
            ['justify-content', 'align-items'],
            ['center', 'flex-start']
          );
        } else if (lostAlign == 'top-right') {
          newBlock(
            decl,
            ' > *',
            ['justify-content', 'align-items'],
            ['flex-end', 'flex-start']
          );
        } else if (lostAlign == 'middle-left' || lostAlign == 'left') {
          newBlock(
            decl,
            ' > *',
            ['justify-content', 'align-items'],
            ['flex-start', 'center']
          );
        } else if (lostAlign == 'middle-center' || lostAlign == 'center') {
          newBlock(
            decl,
            ' > *',
            ['justify-content', 'align-items'],
            ['center', 'center']
          );
        } else if (lostAlign == 'middle-right' || lostAlign == 'right') {
          newBlock(
            decl,
            ' > *',
            ['justify-content', 'align-items'],
            ['flex-end', 'center']
          );
        } else if (lostAlign == 'bottom-left') {
          newBlock(
            decl,
            ' > *',
            ['justify-content', 'align-items'],
            ['flex-start', 'flex-end']
          );
        } else if (lostAlign == 'bottom-center' || lostAlign == 'bottom') {
          newBlock(
            decl,
            ' > *',
            ['justify-content', 'align-items'],
            ['center', 'flex-end']
          );
        } else if (lostAlign == 'bottom-right') {
          newBlock(
            decl,
            ' > *',
            ['justify-content', 'align-items'],
            ['flex-end', 'flex-end']
          );
        }
      }
    }

    decl.remove();
  });
};
