const testRgb = /rgb/;
const matchRgb = /rgba?\(([^\)]+)\)/;
const testHex = /#\w+/;

/**
 * Glues fraction members, meaning "1 /    6" becomes "1/6"
 */
const glueFractionMembers = (str: string): string =>
  str.replace(/\s*\/\s*/, '/');

/**
 * Returns a base10 number from one or two hex digits
 */
const hToD = function hToD(...h: (string | number)[]): number {
  let hh = '00';
  if (h.length === 1) {
    hh = '' + h[0] + h[0];
  } else if (h.length === 2) {
    hh = '' + h[0] + h[1];
  }
  const d = parseInt(hh, 16);
  return !isNaN(d) ? d : 0;
};

/**
 * Extracts the comma-separated numbers from a rgb(a?) string.
 */
const extractRgbSubstring = (string: string): string => {
  const candidate = string.match(matchRgb);
  if (candidate && typeof candidate[1] === 'string' && candidate[1].length) {
    return candidate[1];
  }
  return '0,0,255';
};

/**
 * Returns a three-member number array from a hex string
 */
const safeHexToRgb = (hex: string): number[] => {
  const value = hex.trim().split('#');
  const c = value.length === 1 ? value[0].split('') : value[1].split('');
  const l = c.length;

  switch (l) {
    case 3:
    case 4:
      return [hToD(c[0]), hToD(c[1]), hToD(c[2])];
    case 6:
    case 8:
      return [hToD(c[0], c[1]), hToD(c[2], c[3]), hToD(c[4], c[5])];
    default:
      return [0, 0, 255];
  }
};

/**
 * Returns a three-member number array from a rgb string
 */
const safeRgbToRgb = (rgb: string): number[] => {
  const values = extractRgbSubstring(rgb)
    .split(',')
    .map((a) => {
      const b = parseInt(a, 10);
      return isNaN(b) ? 0 : b;
    });

  if (values.length >= 3) {
    return [values[0], values[1], values[2]];
  }

  return [0, 0, 255];
};

/**
 * Returns a sanitized three-number array representing RGB color values, with a safe default.
 */
const getColorValue = (string: string): number[] => {
  if (testRgb.test(string)) return safeRgbToRgb(string);
  if (testHex.test(string)) return safeHexToRgb(string);
  return [0, 0, 255];
};

export const lgUtils = {
  getColorValue,
  extractRgbSubstring,
  hToD,
  safeRgbToRgb,
  safeHexToRgb,
  glueFractionMembers,
};
