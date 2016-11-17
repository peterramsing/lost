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
  validateUnit: function(value, rule) {
    var validation = false;
    var lgColumnUnits = ['%','vw'];
    if (rule === 'lg-column') {
      if (lgColumnUnits.indexOf(value) !== -1) {
        validation = true;
      }
    }
    return validation;
  }
};
