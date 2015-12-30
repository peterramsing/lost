/**
 * Set up args for lost-column and lost-row.
 *
 * @param {array} [settings] - Lost settings.
 *
 * @param {string} settings[fraction] - This is a simple fraction of the containing
 *   element's width.
 *
 * @param {integer} settings[cycle] - Lost works by assigning a margin-right to all
 *   elements except the last in the row. If settings.cycle is set to auto
 *   it will do this by default by using the denominator of the fraction you
 *   pick. To override the default use this param.,
 *   e.g.: .foo { lost-column: 2/4 2; }
 *
 * @param {length} settings[gutter] - The margin on the right side of the element
 *   used to create a gutter. Typically this is left alone and
 *   settings.gutter will be used, but you can override it here if you want
 *   certain elements to have a particularly large or small gutter (pass 0
 *   for no gutter at all).
 *
 * @param {string} settings[flex|no-flex] - Determines whether this element should
 *   use Flexbox or not.
 *
 * @param {string} settings[nth-child|nth-of-type] - Determines whether to use
 *   `nth-child` or `nth-of-type`.
 *
 * @param {decl} [string] - The declaration, i.e. `lost-column` or `lost-row`.
 *
 * @returns {object} Object of arguments for lost-column and lost-row.
 */

module.exports = function (settings, decl) {
  'use strict';
  const lostArgs = {};
  let declArr = decl.value.split(' ');
  lostArgs.cycle = settings.cycle,
  lostArgs.gutter = settings.gutter,
  lostArgs.flexbox = settings.flexbox,
  lostArgs.selector = settings.selector;
  for (let i = 0; i < declArr.length; i++) {
    if (settings.cycle === 'auto' && declArr[i].indexOf('/') !== -1) {
      lostArgs.cycle = declArr[i].split('/')[1];
    }
    if (!isNaN(declArr[i])) {
      lostArgs.cycle = declArr[i];
      break;
    }
  }
  for (let i = 0; i < declArr.length; i++) {
    if (declArr[i].indexOf('/') !== -1) {
      lostArgs.column = declArr[i];
    }
    if (declArr[i].indexOf('px') !== -1 || parseInt(declArr[i]) === 0) {
      lostArgs.gutter = declArr[i];
    }
    if (declArr[i].indexOf('flex') !== -1) {
      lostArgs.flexbox = declArr[i];
    }
    if (declArr[i].indexOf('nth') !== -1) {
      lostArgs.selector = declArr[i];
    }
  }
  return lostArgs;
}
