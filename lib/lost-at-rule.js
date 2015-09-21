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
module.exports = function lostAtRule(css, settings) {
  css.walkAtRules('lost', function(rule) {
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

    rule.remove();
  });
};
