/**
 * Module dependencies
 */
var postcss = require('postcss'),
    assign = require('object-assign');


/**
 * Lost Grid plugin
 */
module.exports = postcss.plugin('lost', function lost(settings) {
  var newBlock = function (decl, selector, props, values) {
    var appendToSelectors, completeSelector, block;

    appendToSelectors = function (selector, selectorToAppend) {
      var appendedSelectors = [];

      selector.split(',').forEach(function(item) {
        appendedSelectors.push(item + selectorToAppend);
      });

      return appendedSelectors.join(',');
    };

    completeSelector = appendToSelectors(decl.parent.selector, selector);

    block = decl.parent.cloneAfter({
          selector: completeSelector
        }),
        props = props || [],
        values = values || [];

    block.eachDecl(function (decl) {
      decl.removeSelf();
    });

    props.forEach(function (prop, i) {
      var rule = decl.clone({
        prop: prop,
        value: values[i].toString()
      });

      rule.moveTo(block);
    });
  };

  return function (css) {

    settings = settings || {};

    settings.gutter = settings.gutter || '30px';
    settings.flexbox = settings.flexbox || 'no-flex';
    settings.cycle = settings.cycle || 'auto';

    /**
     * Override global settings from at-rules set in stylesheet.
     *
     * @example
     *   @lost gutter 60px;
     *
     *   div {
     *     lost-column: 1/3;
     *   }
     */
    css.eachAtRule('lost', function (rule) {
      rule.params = rule.params.split(' ');

      if (rule.params[0] == 'gutter') {
        settings.gutter = rule.params[1];
      }
      if (rule.params[0] == 'flexbox') {
        settings.flexbox = rule.params[1];
      }
      if (rule.params[0] == 'cycle') {
        if (rule.params[1] !== 'auto') {
          if (rule.params[1] === 'none' || rule.params[1] === '0') {
            settings.cycle = 0;
          } else {
            settings.cycle = rule.params[1];
          }
        } else {
          settings.cycle = 'auto';
        }
      }

      rule.removeSelf();
    });


    /**
     * lost-utility: A general utility toolbelt for Lost. Included are mixins
     * that require no additional input other than being called.
     *
     * @param {string} [edit|clearfix] - The mixin to create.
     *
     * @example
     *   body {
     *     lost-utility: edit;
     *   }
     *
     * @example
     *   .parent {
     *     lost-utility: clearfix;
     *   }
     *   .child {
     *     lost-column: 1/2;
     *   }
     */
    css.eachDecl('lost-utility', function (decl) {
      if (decl.value == 'edit') {
        newBlock(
          decl,
          ' *:not(input):not(textarea):not(select)',
          ['background-color'],
          ['rgba(0, 0, 255, 0.1)']
        );
      }

      if (decl.value == 'clearfix') {
        decl.cloneBefore({
          prop: '*zoom',
          value: '1'
        });

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
      }

      if (decl.parent.nodes.length === 1) {
        decl.parent.removeSelf();
      } else {
        decl.removeSelf();
      }
    });


    /**
     * lost-flex-container: Creates a Flexbox container.
     *
     * @param {string} [row|column] - The flex-direction the container should
     *   create. This is typically opposite to the element you're creating so a
     *   row would need `lost-flex-container: column;`.
     *
     * @example
     *   section {
     *     lost-flex-container: row;
     *   }
     *   div {
     *     lost-column: 1/2 flex;
     *   }
     */
    css.eachDecl('lost-flex-container', function (decl) {
      decl.cloneBefore({
        prop: 'display',
        value: 'flex'
      });

      if (decl.value == 'column') {
        decl.cloneBefore({
          prop: 'flex-flow',
          value: 'column nowrap'
        });
      } else {
        decl.cloneBefore({
          prop: 'flex-flow',
          value: 'row wrap'
        });
      }

      decl.removeSelf();
    });


    /**
     * lost-center: Horizontally center a container element and apply padding
     * to it.
     *
     * @param {length} [max-width] - A max-width to assign. Can be any unit.
     *
     * @param {length} [padding] - Padding on the left and right of the element.
     *   Can be any unit.
     *
     * @param {string} [flex|no-flex] - Determines whether this element should
     *   use Flexbox or not.
     *
     * @example
     *   section {
     *     lost-center: 980px;
     *   }
     *
     * @example
     *   section {
     *     lost-center: 1140px 30px flex;
     *   }
     */
    css.eachDecl('lost-center', function (decl) {
      var declArr = [],
          lostCenterPadding,
          lostCenterFlexbox = settings.flexbox;

      declArr = decl.value.split(' ');

      if (declArr[1] !== undefined && declArr[1].search(/^\d/) !== -1) {
        lostCenterPadding = declArr[1];
      }

      if (declArr.indexOf('flex') !== -1) {
        lostCenterFlexbox = 'flex';
      }

      if (declArr.indexOf('no-flex') !== -1) {
        lostCenterFlexbox = 'no-flex';
      }

      decl.parent.nodes.forEach(function (decl) {
        if (decl.prop == 'lost-center-padding') {
          lostCenterPadding = decl.value;

          decl.removeSelf();
        }
      });

      decl.parent.nodes.forEach(function (decl) {
        if (decl.prop == 'lost-center-flexbox') {
          if (decl.value == 'flex') {
            lostCenterFlexbox = decl.value;
          }

          decl.removeSelf();
        }
      });

      if (lostCenterFlexbox === 'no-flex') {
        decl.cloneBefore({
          prop: '*zoom',
          value: '1'
        });

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

      decl.cloneBefore({
        prop: 'max-width',
        value: declArr[0]
      });

      decl.cloneBefore({
        prop: 'margin-left',
        value: 'auto'
      });

      decl.cloneBefore({
        prop: 'margin-right',
        value: 'auto'
      });

      if (lostCenterPadding !== undefined) {
        decl.cloneBefore({
          prop: 'padding-left',
          value: lostCenterPadding
        });

        decl.cloneBefore({
          prop: 'padding-right',
          value: lostCenterPadding
        });
      }

      decl.removeSelf();

    });


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
    css.eachDecl('lost-align', function (decl) {
      var declArr = [],
          lostAlign;

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

      decl.removeSelf();
    });


    /**
     * lost-column: Creates a column that is a fraction of the size of its
     * containing element's width with a gutter.
     *
     * @param {string} [fraction] - This is a simple fraction of the containing
     *   element's width.
     *
     * @param {integer} [cycle] - Lost works by assigning a margin-right to all
     *   elements except the last in the row. If settings.cycle is set to auto
     *   it will do this by default by using the denominator of the fraction you
     *   pick. To override the default use this param.,
     *   e.g.: .foo { lost-column: 2/4 2; }
     *
     * @param {length} [gutter] - The margin on the right side of the element
     *   used to create a gutter. Typically this is left alone and
     *   settings.gutter will be used, but you can override it here if you want
     *   certain elements to have a particularly large or small gutter (pass 0
     *   for no gutter at all).
     *
     * @param {string} [flex|no-flex] - Determines whether this element should
     *   use Flexbox or not.
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
    css.eachDecl('lost-column', function (decl) {
      var declArr = [],
          lostColumn,
          lostColumnCycle,
          lostColumnGutter = settings.gutter,
          lostColumnFlexbox = settings.flexbox;

      if (settings.cycle === 'auto') {
        lostColumnCycle = decl.value.split('/')[1];
      } else {
        lostColumnCycle = settings.cycle;
      }

      declArr = decl.value.split(' ');
      lostColumn = declArr[0];

      if (declArr[1] !== undefined && declArr[1].search(/^\d/) !== -1) {
        lostColumnCycle = declArr[1];
      }

      if (declArr[1] == 'flex' || declArr[1] == 'no-flex' || declArr[1] == 'auto') {
        lostColumnCycle = declArr[0].split('/')[1];
      }

      if (declArr[2] !== undefined && declArr[2].search(/^\d/) !== -1) {
        lostColumnGutter = declArr[2];
      }

      if (declArr.indexOf('flex') !== -1) {
        lostColumnFlexbox = 'flex';
      }

      if (declArr.indexOf('no-flex') !== -1) {
        lostColumnFlexbox = 'no-flex';
      }

      decl.parent.nodes.forEach(function (decl) {
        if (decl.prop == 'lost-column-cycle') {
          lostColumnCycle = decl.value;

          decl.removeSelf();
        }
      });

      decl.parent.nodes.forEach(function (decl) {
        if (decl.prop == 'lost-column-gutter') {
          lostColumnGutter = decl.value;

          decl.removeSelf();
        }
      });

      decl.parent.nodes.forEach(function (decl) {
        if (decl.prop == 'lost-column-flexbox') {
          if (decl.prop == 'flex') {
            lostColumnFlexbox = 'flex';
          }

          decl.removeSelf();
        }
      });

      if (lostColumnFlexbox === 'flex') {
        decl.cloneBefore({
          prop: 'flex',
          value: '0 0 auto'
        });

        if (lostColumnCycle !== 0) {
          newBlock(
            decl,
            ':nth-child('+ lostColumnCycle +'n)',
            ['margin-right'],
            [0]
          );
        }

        newBlock(
          decl,
          ':last-child',
          ['margin-right'],
          [0]
        );

        newBlock(
          decl,
          ':nth-child(n)',
          ['margin-right'],
          [lostColumnGutter]
        );
      } else {

        if (lostColumnCycle !== 0) {
          newBlock(
            decl,
            ':nth-child('+ lostColumnCycle +'n + 1)',
            ['clear'],
            ['left']
          );

          newBlock(
            decl,
            ':nth-child('+ lostColumnCycle +'n)',
            ['margin-right'],
            [0]
          );
        }

        newBlock(
          decl,
          ':last-child',
          ['margin-right'],
          [0]
        );

        newBlock(
          decl,
          ':nth-child(n)',
          ['float', 'margin-right', 'clear'],
          ['left', lostColumnGutter, 'none']
        );
      }

      if (lostColumnGutter !== '0') {
        decl.cloneBefore({
          prop: 'width',
          value: 'calc(99.99% * '+ lostColumn +' - ('+ lostColumnGutter +' - '+ lostColumnGutter +' * '+ lostColumn +'))'
        });
      } else {
        decl.cloneBefore({
          prop: 'width',
          value: 'calc(99.999999% * '+ lostColumn +')'
        });
      }

      decl.removeSelf();
    });


    /**
     * lost-row: Creates a row that is a fraction of the size of its containing
     * element's height with a gutter.
     *
     * @param {string} [fraction] - This is a simple fraction of the containing
     *   element's height.
     *
     * @param {length} [gutter] - The margin on the bottom of the element used
     *   to create a gutter. Typically this is left alone and settings.gutter
     *   will be used, but you can override it here if you want certain elements
     *   to have a particularly large or small gutter (pass 0 for no gutter at
     *   all).
     *
     * @param {string} [flex|no-flex] - Determines whether this element should
     *   use Flexbox or not.
     *
     * @example
     *   section {
     *     height: 100%;
     *   }
     *   div {
     *     lost-row: 1/3;
     *   }
     */
    css.eachDecl('lost-row', function (decl) {
      var declArr = [],
          lostRow,
          lostRowGutter = settings.gutter,
          lostRowFlexbox = settings.flexbox;

      declArr = decl.value.split(' ');
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

      decl.parent.nodes.forEach(function (decl) {
        if (decl.prop == 'lost-row-gutter') {
          lostRowGutter = decl.value;

          decl.removeSelf();
        }
      });

      decl.parent.nodes.forEach(function (decl) {
        if (decl.prop == 'lost-row-flexbox') {
          if (decl.prop == 'flex') {
            lostRowFlexbox = 'flex';
          }

          decl.removeSelf();
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
          value: 'calc(99.99% * '+ lostRow +' - ('+ lostRowGutter +' - '+ lostRowGutter +' * '+ lostRow +'))'
        });
      } else {
        decl.cloneBefore({
          prop: 'height',
          value: 'calc(99.999999% * '+ lostRow +')'
        });
      }

      decl.cloneBefore({
        prop: 'margin-bottom',
        value: lostRowGutter
      });

      newBlock(
        decl,
        ':last-child',
        ['margin-bottom'],
        [0]
      );

      decl.removeSelf();
    });


    /**
     * lost-waffle: Creates a block that is a fraction of the size of its
     * containing element's width AND height with a gutter on the right
     * and bottom.
     *
     * @param {string} [fraction] - This is a simple fraction of the containing
     *   element's width and height.
     *
     * @param {integer} [cycle] - Lost works by assigning a margin-right/bottom
     *   to all elements except the last row (no margin-bottom) and the last
     *   column (no margin-right). It does this by default by using the
     *   denominator of the fraction you pick. To override this default use this
     *   param., e.g.: .foo { lost-waffle: 2/4 2; }
     *
     * @param {length} [gutter] - The margin on the right and bottom side of the
     *   element used to create a gutter. Typically this is left alone and the
     *   global $gutter will be used, but you can override it here if you want
     *   certain elements to have a particularly large or small gutter (pass 0
     *   for no gutter at all).
     *
     * @param {string} [flex|no-flex] - Determines whether this element should
     *   use Flexbox or not.
     *
     * @example
     *   section {
     *     height: 100%;
     *   }
     *   div {
     *     lost-waffle: 1/3;
     *   }
     */
    css.eachDecl('lost-waffle', function (decl) {
      var declArr = [],
          lostWaffle,
          lostWaffleCycle,
          lostWaffleGutter = settings.gutter,
          lostWaffleFlexbox = settings.flexbox;

      if (settings.cycle === 'auto') {
        lostWaffleCycle = decl.value.split('/')[1];
      } else {
        lostWaffleCycle = settings.cycle;
      }

      declArr = decl.value.split(' ');
      lostWaffle = declArr[0];

      if (declArr[1] !== undefined && declArr[1].search(/^\d/) !== -1) {
        lostWaffleCycle = declArr[1];
      }

      if (declArr[1] == 'flex' || declArr[1] == 'no-flex' || declArr[1] == 'auto') {
        lostWaffleCycle = declArr[0].split('/')[1];
      }

      if (declArr[2] !== undefined && declArr[2].search(/^\d/) !== -1) {
        lostWaffleGutter = declArr[2];
      }

      if (declArr.indexOf('flex') !== -1) {
        lostWaffleFlexbox = 'flex';
      }

      if (declArr.indexOf('no-flex') !== -1) {
        lostWaffleFlexbox = 'no-flex';
      }

      decl.parent.nodes.forEach(function (decl) {
        if (decl.prop == 'lost-waffle-cycle') {
          lostWaffleCycle = decl.value;

          decl.removeSelf();
        }
      });

      decl.parent.nodes.forEach(function (decl) {
        if (decl.prop == 'lost-waffle-gutter') {
          lostWaffleGutter = decl.value;

          decl.removeSelf();
        }
      });

      decl.parent.nodes.forEach(function (decl) {
        if (decl.prop == 'lost-waffle-flexbox') {
          if (decl.prop == 'flex') {
            lostWaffleFlexbox = 'flex';
          }

          decl.removeSelf();
        }
      });

      if (lostWaffleFlexbox === 'flex') {
        decl.cloneBefore({
          prop: 'flex',
          value: '0 0 auto'
        });

        if (lostWaffleCycle !== 0) {
          newBlock(
            decl,
            ':nth-last-child(-n + '+ lostWaffleCycle +')',
            ['margin-bottom'],
            [0]
          );

          newBlock(
            decl,
            ':nth-child('+ lostWaffleCycle +'n)',
            ['margin-right'],
            [0]
          );
        }

        newBlock(
          decl,
          ':last-child',
          ['margin-right', 'margin-bottom'],
          [0, 0]
        );

        newBlock(
          decl,
          ':nth-child(n)',
          ['margin-right', 'margin-bottom'],
          [lostWaffleGutter, lostWaffleGutter]
        );
      } else {
        if (lostWaffleCycle !== 0) {
          newBlock(
            decl,
            ':nth-last-child(-n + '+ lostWaffleCycle +')',
            ['margin-bottom'],
            [0]
          );

          newBlock(
            decl,
            ':nth-child('+ lostWaffleCycle +'n + 1)',
            ['clear'],
            ['left']
          );

          newBlock(
            decl,
            ':nth-child('+ lostWaffleCycle +'n)',
            ['margin-right'],
            [0]
          );
        }

        newBlock(
          decl,
          ':last-child',
          ['margin-right', 'margin-bottom'],
          [0, 0]
        );

        newBlock(
          decl,
          ':nth-child(n)',
          ['float', 'margin-right', 'margin-bottom', 'clear'],
          ['left', lostWaffleGutter, lostWaffleGutter, 'none']
        );
      }

      if (lostWaffleGutter !== '0') {
        decl.cloneBefore({
          prop: 'width',
          value: 'calc(99.99% * '+ lostWaffle +' - ('+ lostWaffleGutter +' - '+ lostWaffleGutter +' * '+ lostWaffle +'))'
        });

        decl.cloneBefore({
          prop: 'height',
          value: 'calc(99.99% * '+ lostWaffle +' - ('+ lostWaffleGutter +' - '+ lostWaffleGutter +' * '+ lostWaffle +'))'
        });
      } else {
        decl.cloneBefore({
          prop: 'width',
          value: 'calc(99.999999% * '+ lostWaffle +')'
        });

        decl.cloneBefore({
          prop: 'height',
          value: 'calc(99.999999% * '+ lostWaffle +')'
        });
      }

      decl.removeSelf();
    });


    /**
     * lost-offset: Margin to the left, right, bottom, or top, of an element
     * depending on if the fraction passed is positive or negative. It works for
     * both horizontal and vertical grids but not both.
     *
     * @param {string} [fraction] - Fraction of the container to be offset.
     *
     * @param {string} [row|column] - Direction the grid is going. Should be the
     *   opposite of the column or row it's being used on. Defaults to row.
     *
     * @param {length} [gutter] - How large the gutter involved is, typically
     *   this won't be adjusted, but if you have set the elements for that
     *   container to have different gutters than default, you will need to
     *   match that gutter here as well.
     *
     * @example
     *   .two-elements {
     *     lost-column: 1/3;
     *   }
     *   .two-elements:first-child {
     *     lost-offset: 1/3;
     *   }
     */
    css.eachDecl('lost-offset', function (decl) {
      var declArr = [],
          lostOffset,
          lostOffsetNumerator,
          lostOffsetDirection,
          lostOffsetGutter = settings.gutter;

      declArr = decl.value.split(' ');
      lostOffset = declArr[0];
      lostOffsetNumerator = declArr[0].split('/')[0];

      if (declArr[1] !== undefined && declArr[1] == 'row' || declArr[1] == 'column') {
        lostOffsetDirection = declArr[1];
      }

      if (declArr[2] !== undefined && declArr[2].search(/^\d/) !== -1) {
        lostOffsetGutter = declArr[2];
      }

      decl.parent.nodes.forEach(function (decl) {
        if (decl.prop == 'lost-offset-direction') {
          lostOffsetDirection = decl.value;

          decl.removeSelf();
        }
      });

      decl.parent.nodes.forEach(function (decl) {
        if (decl.prop == 'lost-offset-gutter') {
          lostOffsetGutter = decl.value;

          decl.removeSelf();
        }
      });

      if (lostOffsetDirection == 'column') {
        if (lostOffsetNumerator > 0) {
          if (lostOffsetGutter !== '0') {
            decl.cloneBefore({
              prop: 'margin-bottom',
              value: 'calc(99.99% * '+ lostOffset +' - ('+ lostOffsetGutter +' - '+ lostOffsetGutter +' * '+ lostOffset +') + ('+ lostOffsetGutter +' * 2)) !important'
            });
          } else {
            decl.cloneBefore({
              prop: 'margin-bottom',
              value: 'calc(99.999999% * '+ lostOffset +') !important'
            });
          }
        } else if (lostOffsetNumerator < 0) {
          if (lostOffsetGutter !== '0') {
            decl.cloneBefore({
              prop: 'margin-top',
              value: 'calc(99.99% * ('+ lostOffset +' * -1) - ('+ lostOffsetGutter +' - '+ lostOffsetGutter +' * ('+ lostOffset +' * -1)) + '+ lostOffsetGutter +') !important'
            });
          } else {
            decl.cloneBefore({
              prop: 'margin-top',
              value: 'calc(99.999999% * '+ lostOffset +') !important'
            });
          }
        } else {
          decl.cloneBefore({
            prop: 'margin-top',
            value: '0 !important'
          });

          decl.cloneBefore({
            prop: 'margin-bottom',
            value: lostOffsetGutter +' !important'
          });
        }
      } else {
        if (lostOffsetNumerator > 0) {
          if (lostOffsetGutter !== '0') {
            decl.cloneBefore({
              prop: 'margin-right',
              value: 'calc(99.99% * '+ lostOffset +' - ('+ lostOffsetGutter +' - '+ lostOffsetGutter +' * '+ lostOffset +') + ('+ lostOffsetGutter +' * 2)) !important'
            });
          } else {
            decl.cloneBefore({
              prop: 'margin-right',
              value: 'calc(99.999999% * '+ lostOffset +') !important'
            });
          }
        } else if (lostOffsetNumerator < 0) {
          if (lostOffsetGutter !== '0') {
            decl.cloneBefore({
              prop: 'margin-left',
              value: 'calc(99.99% * ('+ lostOffset +' * -1) - ('+ lostOffsetGutter +' - '+ lostOffsetGutter +' * ('+ lostOffset +' * -1)) + '+ lostOffsetGutter +') !important'
            });
          } else {
            decl.cloneBefore({
              prop: 'margin-left',
              value: 'calc(99.999999% * '+ lostOffset +') !important'
            });
          }
        } else {
          decl.cloneBefore({
            prop: 'margin-left',
            value: '0 !important'
          });

          decl.cloneBefore({
            prop: 'margin-right',
            value: lostOffsetGutter +' !important'
          });
        }
      }

      decl.removeSelf();
    });


    /**
     * lost-move: Source ordering. Shift elements left, right, up, or down, by
     * their left or top position by passing a positive or negative fraction.
     *
     * @param {string} [fraction] - Fraction of the container to be shifted.
     *
     * @param {string} [row|column] - Direction the grid is going. Should be the
     *   opposite of the column or row it's being used on.
     *
     * @param {length} [gutter] - Adjust the size of the gutter for this
     *   movement. Should match the element's gutter.
     *
     * @example
     *   div {
     *     lost-column: 1/2;
     *   }
     *   div:first-child {
     *     lost-move: 1/2;
     *   }
     *   div:last-child {
     *     lost-move: -1/2;
     *   }
     */
    css.eachDecl('lost-move', function (decl) {
      var declArr = [],
          lostMove,
          lostMoveNumerator,
          lostMoveDirection,
          lostMoveGutter = settings.gutter;

      declArr = decl.value.split(' ');
      lostMove = declArr[0];
      lostMoveNumerator = declArr[0].split('/')[0];

      if (declArr[1] !== undefined && declArr[1] == 'row' || declArr[1] == 'column') {
        lostMoveDirection = declArr[1];
      }

      if (declArr[2] !== undefined && declArr[2].search(/^\d/) !== -1) {
        lostMoveGutter = declArr[2];
      }

      decl.parent.nodes.forEach(function (decl) {
        if (decl.prop == 'lost-move-direction') {
          lostMoveDirection = decl.value;

          decl.removeSelf();
        }
      });

      decl.parent.nodes.forEach(function (decl) {
        if (decl.prop == 'lost-move-gutter') {
          lostMoveGutter = decl.value;

          decl.removeSelf();
        }
      });

      decl.cloneBefore({
        prop: 'position',
        value: 'relative'
      });

      if (lostMoveDirection == 'column') {
        if (lostMoveGutter !== '0') {
          decl.cloneBefore({
            prop: 'top',
            value: 'calc(99.99% * '+ lostMove +' - ('+ lostMoveGutter +' - '+ lostMoveGutter +' * '+ lostMove +') + '+ lostMoveGutter +')'
          });
        } else {
          decl.cloneBefore({
            prop: 'top',
            value: 'calc(99.999999% * '+ lostMove +')'
          });
        }
      } else {
        if (lostMoveGutter !== '0') {
          decl.cloneBefore({
            prop: 'left',
            value: 'calc(99.99% * '+ lostMove +' - ('+ lostMoveGutter +' - '+ lostMoveGutter +' * '+ lostMove +') + '+ lostMoveGutter +')'
          });
        } else {
          decl.cloneBefore({
            prop: 'left',
            value: 'calc(99.999999% * '+ lostMove +')'
          });
        }
      }

      decl.removeSelf();
    });


    /**
     * lost-masonry-wrap: Creates a wrapping element for working with JS Masonry
     * libraries like Isotope. Assigns a negative margin on each side of this
     * wrapping element.
     *
     * @param {string} [flex|no-flex] - Determines whether this element should
     *   use Flexbox or not.
     *
     * @param {length} [gutter] - How large the gutter involved is, typically
     *   this won't be adjusted and will inherit settings.gutter, but it's made
     *   available if you want your masonry grid to have a special gutter, it
     *   should match your masonry-column's gutter.
     *
     * @example
     *   section {
     *     lost-masonry-wrap: no-flex;
     *   }
     *   div {
     *     lost-masonry-column: 1/3;
     *   }
     */
    css.eachDecl('lost-masonry-wrap', function (decl) {
      var declArr = [],
          lostMasonryWrap,
          lostMasonryWrapFlexbox = settings.flexbox,
          lostMasonryWrapGutter = settings.gutter,
          lostMasonryWrapGutterUnit;

      declArr = decl.value.split(' ');

      if (declArr[0] !== undefined && declArr[0] == 'flex' || declArr[0] == 'no-flex') {
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

      decl.parent.nodes.forEach(function (decl) {
        if (decl.prop == 'lost-masonry-wrap-flexbox') {
          if (decl.value == 'flex') {
            lostMasonryWrapFlexbox = 'flex';
          }

          decl.removeSelf();
        }
      });

      decl.parent.nodes.forEach(function (decl) {
        if (decl.prop == 'lost-masonry-wrap-gutter') {
          lostMasonryWrap = decl.value;

          decl.removeSelf();
        }
      });

      if (lostMasonryWrapFlexbox !== 'flex') {
        decl.cloneBefore({
          prop: '*zoom',
          value: '1'
        });

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

      decl.cloneBefore({
        prop: 'margin-left',
        value: (parseInt(lostMasonryWrapGutter) / -2) + lostMasonryWrapGutterUnit
      });

      decl.cloneBefore({
        prop: 'margin-right',
        value: (parseInt(lostMasonryWrapGutter) / -2) + lostMasonryWrapGutterUnit
      });

      decl.removeSelf();
    });


    /**
     * lost-masonry-column: Creates a column for working with JS masonry
     * libraries like Isotope. Assigns a margin to each side of the element.
     *
     * @param {length} [gutter] - How large the gutter involved is, typically
     *   this won't be adjusted and will inherit settings.gutter, but it's made
     *   available if you want your masonry grid to have a special gutter, it
     *   should match your masonry-row's gutter.
     *
     * @param {string} [flex|no-flex] - Determines whether this element should
     *   use Flexbox or not.
     *
     * @example
     *   section {
     *     lost-masonry-wrap: flex 60px;
     *   }
     *   div {
     *     lost-masonry-column: 1/3 60px flex;
     *   }
     */
    css.eachDecl('lost-masonry-column', function (decl) {
      var declArr = [],
          lostMasonryColumn,
          lostMasonryColumnFlexbox = settings.flexbox,
          lostMasonryColumnGutter = settings.gutter,
          lostMasonryColumnGutterUnit;

      declArr = decl.value.split(' ');
      lostMasonryColumn = declArr[0];

      if (declArr[1] !== undefined && declArr[1].search(/^\d/) !== -1) {
        lostMasonryColumnGutter = declArr[1];
      }

      if (declArr[2] !== undefined && declArr[2] == 'flex' || declArr[2] == 'no-flex') {
        lostMasonryColumnFlexbox = declArr[2];
      }

      if (declArr.indexOf('flex') !== -1) {
        lostMasonryColumnFlexbox = 'flex';
      }

      if (declArr.indexOf('no-flex') !== -1) {
        lostMasonryColumnFlexbox = 'no-flex';
      }

      decl.parent.nodes.forEach(function (decl) {
        if (decl.prop == 'lost-masonry-column-gutter') {
          lostMasonryColumnGutter = decl.value;

          decl.removeSelf();
        }
      });

      decl.parent.nodes.forEach(function (decl) {
        if (decl.prop == 'lost-masonry-column-flexbox') {
          if (decl.value == 'flex') {
            lostMasonryColumnFlexbox = 'flex';
          }

          decl.removeSelf();
        }
      });

      lostMasonryColumnGutterUnit = lostMasonryColumnGutter.match(/\D/g).join('');

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
        decl.cloneBefore({
          prop: 'width',
          value: 'calc(99.99% * '+ lostMasonryColumn +' - '+ lostMasonryColumnGutter +')'
        });

        decl.cloneBefore({
          prop: 'margin-left',
          value: (parseInt(lostMasonryColumnGutter) / 2) + lostMasonryColumnGutterUnit
        });

        decl.cloneBefore({
          prop: 'margin-right',
          value: (parseInt(lostMasonryColumnGutter) / 2) + lostMasonryColumnGutterUnit
        });
      } else {
        decl.cloneBefore({
          prop: 'width',
          value: 'calc(99.999999% * '+ lostMasonryColumn +')'
        });

        decl.cloneBefore({
          prop: 'margin-left',
          value: (parseInt(lostMasonryColumnGutter) / 2) + lostMasonryColumnGutterUnit
        });

        decl.cloneBefore({
          prop: 'margin-right',
          value: (parseInt(lostMasonryColumnGutter) / 2) + lostMasonryColumnGutterUnit
        });
      }

      decl.removeSelf();
    });
  };
});
