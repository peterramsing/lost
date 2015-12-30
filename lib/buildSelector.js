/**
 * Build a pseudo selector for lost-column and lost-row.
 *
 * @param {string} [selector] - `nth-child` or `nth-of-type`.
 *
 * @param {string|integer} [items] - Number of items to parse. Can be 'n'.
 *
 * @returns {string} pseudo selector.
 */

module.exports = function(selector, items) {
  'use strict';
  let result;
  if (items) {
    result = [':', selector, '(', items, ')'];
  } else {
    result = [':last', selector.substr(3)];
  }
  return result.join('');
}
