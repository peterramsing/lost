/**
 * @file General Logic for the LostGrid Math
 * @author Peter Ramsing <hi@peterramsing.com>
 */

/** Class representing a point. */
class LostLogic {
  /**
   * Get the "calc" for CSS
   * @param {string} fraction
   * @param {string} gutter
   * @param {number} rounder
   * @param {string} unit
   */
  calcValue(fraction, gutter, rounder, unit) {
    let calcValue = '';
    let gutterLogic = '';
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
  }

  /**
   * Determine if a unit validates
   * @param {string} value The the unit is
   * @param {array} validUnits List of valid units
   */
  validateUnit(value, validUnits) {
    if (validUnits.indexOf(value) !== -1) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Find Lost Properties
   * @param {array} nodes The PostCSS Nodes
   * @param {string} propertyName The Name you seek
   * @param {string} defaultPropertyValue The default
   */
  parseLostProperty(nodes, propertyName, defaultPropertyValue) {
    let propertyValue = defaultPropertyValue;
    nodes.forEach(declaration => {
      if (declaration.prop === propertyName) {
        propertyValue = declaration.value;
        declaration.remove();
      }
    });
    return propertyValue;
  }
}

module.exports = {
  LostLogic
};
