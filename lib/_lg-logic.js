module.exports = {

  calcValue: function(fraction, gutter, rounder) {
    var calcValue = '';
    var gutterLogic = '';

    if (!gutter) {
      gutter = '0';
    }

    if (gutter !== '0') {
      gutterLogic = ` - (${gutter} - ${gutter} * ${fraction})`;
    }

    calcValue = `calc(${rounder}% * ${fraction}${gutterLogic})`;
    return calcValue;
  }

};
