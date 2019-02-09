module.exports = {
  calcValue: function(fraction, gutter, rounder, unit) {
    var calcValue = '';
    var gutterLogic = '';

    if (!gutter) {
      gutter = '0';
    }

    if (gutter !== '0') {
      gutterLogic = ` - (${gutter} - ${gutter} * ${fraction})`;
    }

    if (!unit) {
      unit = '%';
    }

    calcValue = `calc(${rounder}${unit} * ${fraction}${gutterLogic})`;
    return calcValue;
  },
  validateUnit: function(value, validUnits) {
    var validation = false;

    if (validUnits.indexOf(value) !== -1) {
      validation = true;
    }
    return validation;
  },
  parseLostProperty: function(nodes, propertyName, defaultPropertyValue) {
    var propertyValue = defaultPropertyValue;

    nodes.forEach(declaration => {
      if (declaration.prop === propertyName) {
        propertyValue = declaration.value;
        declaration.remove();
      }
    });

    return propertyValue;
  }
};
