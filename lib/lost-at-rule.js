module.exports = function lostAtRule(rule, settings) {
  const breakoutPramams = rule.params.split(' ');

  if (breakoutPramams[0] === 'gutter') {
    settings.gutter = breakoutPramams[1];
  }
  if (breakoutPramams[0] === 'clearing') {
    settings.clearing = breakoutPramams[1];
  }

  if (breakoutPramams[0] === 'flexbox') {
    settings.flexbox = breakoutPramams[1];
  }
  if (breakoutPramams[0] === 'rounder') {
    settings.rounder = breakoutPramams[1];
  }
  if (breakoutPramams[0] === '--beta-direction') {
    settings.direction = breakoutPramams[1];
  }
  if (breakoutPramams[0] === 'cycle') {
    if (breakoutPramams[1] !== 'auto') {
      if (breakoutPramams[1] === 'none' || breakoutPramams[1] === '0') {
        settings.cycle = 0;
      } else {
        settings.cycle = breakoutPramams[1];
      }
    } else {
      settings.cycle = 'auto';
    }
  }
  rule.remove();
};
