const { LostLogic } = require('./../core/lost-logic');
const lostLogic = new LostLogic();

module.exports = {
  calcValue: function(fraction, gutter, rounder, unit) {
    return lostLogic.calcValue(fraction, gutter, rounder, unit);
  },
  validateUnit: function(value, validUnits) {
    return lostLogic.validateUnit(value, validUnits);
  },
  parseLostProperty: function(nodes, propertyName, defaultPropertyValue) {
    return lostLogic.parseLostProperty(
      nodes,
      propertyName,
      defaultPropertyValue
    );
  }
};
