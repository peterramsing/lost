module.exports = function lostAtRule(rule, settings) {
  if (rule.name != 'lost') {
    return;
  }
  const breakoutParams = rule.params.split(' ');

  if (breakoutParams[0] === 'gutter') {
    settings.gutter = breakoutParams[1];
  }
  if (breakoutParams[0] === 'clearing') {
    settings.clearing = breakoutParams[1];
  }

  if (breakoutParams[0] === 'flexbox') {
    settings.flexbox = breakoutParams[1];
  }
  if (breakoutParams[0] === 'rounder') {
    settings.rounder = breakoutParams[1];
  }
  if (breakoutParams[0] === '--beta-direction') {
    settings.direction = breakoutParams[1];
  }
  if (breakoutParams[0] === 'gridUnit') {
    settings.gridUnit = breakoutParams[1];
  }
  if (breakoutParams[0] === 'cycle') {
    if (breakoutParams[1] !== 'auto') {
      if (breakoutParams[1] === 'none' || breakoutParams[1] === '0') {
        settings.cycle = 0;
      } else {
        settings.cycle = breakoutParams[1];
      }
    } else {
      settings.cycle = 'auto';
    }
  }
  rule.remove();
};
