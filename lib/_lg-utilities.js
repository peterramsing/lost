const testRgb = new RegExp(/rgb/);
//eslint-disable-next-line
const matchRgb = new RegExp(/rgba?\(([^\)]+)\)/);
const testHex = new RegExp(/#\w+/);

/**
 * Glues fraction members, meaning "1 /    6" becomes "1/6"
 * @param {string} str
 * @returns {string}
 */
const glueFractionMembers = function glueFractionMembers(str) {
  return str.replace(/\s*\/\s*/, '/');
};

/**
 * Returns a three-member number array from a hex string
 * @param hex
 * @returns {number[]}
 */
const safeHexToRgb = function safeHexToRgb(hex) {
  const value = hex.trim().split('#');
  var c = ['00', '00', '00'];
  if (value.length === 1) {
    c = value[0].split('');
  }
  if (value.length === 2) {
    c = value[1].split('');
  }
  const l = c.length;
  if (l === 3) return [hToD(c[0]), hToD(c[1]), hToD(c[2])];
  if (l === 4) return [hToD(c[0]), hToD(c[1]), hToD(c[2])];
  if (l === 6) return [hToD(c[0], c[1]), hToD(c[2], c[3]), hToD(c[4], c[5])];
  if (l === 8) return [hToD(c[0], c[1]), hToD(c[2], c[3]), hToD(c[4], c[5])];
  return [0, 0, 255];
};

/**
 * Returns a sanitized three-number array representing RGB color values, with a safe default.
 * @param string
 * @returns {number[]}
 */
const getColorValue = function getColorValue(string) {
  if (testRgb.test(string)) {
    return safeRgbToRgb(string);
  }
  if (testHex.test(string)) {
    return safeHexToRgb(string);
  }
  return [0, 0, 255];
};

/**
 * Extracts the comma-separated numbers from a rgb(a?) string.
 * @param string
 * @returns {string}
 */
const extractRgbSubstring = function extractRgbSubstring(string) {
  var candidate = string.match(matchRgb);
  if (
    candidate &&
    candidate.length > 1 &&
    candidate[1].length > 0 &&
    typeof candidate[1] === 'string'
  ) {
    return candidate[1];
  }
  return '0,0,255';
};

/**
 * Returns a base10 number from one or two hex digits
 * @param h
 * @returns {number}
 */
const hToD = function hToD(...h) {
  var hh = '00';
  if (h.length === 1) {
    hh = '' + h[0] + h[0];
  } else if (h.length === 2) {
    hh = '' + h[0] + h[1];
  }
  var d = parseInt(hh, 16);
  return !isNaN(d) ? d : 0;
};

/**
 * Returns a three-member number array from a rgb string
 * @param rgb
 * @returns {number[]}
 */
const safeRgbToRgb = function safeRgbToRgb(rgb) {
  var value = extractRgbSubstring(rgb)
    .split(',')
    .map(function(a) {
      var b = parseInt(a, 10);
      return !isNaN(b) ? b : 0;
    });
  if (value.length >= 3) {
    return [value[0], value[1], value[2]];
  }
  return [0, 0, 255];
};

module.exports = {
  getColorValue,
  extractRgbSubstring,
  hToD,
  safeRgbToRgb,
  safeHexToRgb,
  glueFractionMembers
};
