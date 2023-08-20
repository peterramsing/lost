const calcValue = (
  fraction: string,
  gutter: number | string = '0', //FIXME: this should be a number
  rounder: number,
  unit: string = '%'
): string => {
  let calcValue = '';
  let gutterLogic = '';

  if (gutter !== '0') {
    // FIXME: there's messed up logic here with lost-center
    gutterLogic = ` - (${gutter} - ${gutter} * ${fraction})`;
  }

  calcValue = `calc(${rounder}${unit} * ${fraction}${gutterLogic})`;
  return calcValue;
};

const parseLostProperty = (
  nodes: any,
  propertyName: string,
  defaultPropertyValue: any
): any => {
  let propertyValue = defaultPropertyValue;

  nodes.forEach((declaration: any) => {
    if (declaration.prop === propertyName) {
      propertyValue = declaration.value;
      declaration.remove();
    }
  });

  return propertyValue;
};

const validateUnit = (value: string, validUnits: string[]): boolean => {
  return validUnits.includes(value);
};

export const lgLogic = {
  calcValue,
  parseLostProperty,
  validateUnit,
};
