module.exports = {

  widthValue: function(columnFraction, gutter = '0', rounder) {
    let widthValue = '';
    let gutterLogic = '';

    if (gutter !== '0') {
      gutterLogic = ` - (${gutter} - ${gutter} * ${columnFraction})`;
    }

    widthValue = `calc(${rounder}% * ${columnFraction}${gutterLogic})`;
    return widthValue;
  }

};
