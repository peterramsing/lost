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
  },
  validateUnit: function(value, validUnits) {
    var validation = false;

    if (validUnits.indexOf(value) !== -1) {
      validation = true;
    }
    return validation;
  }
};
