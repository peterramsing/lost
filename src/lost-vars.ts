import { lostGutter } from './lost-gutter';
import { lostVarsGutterLocal } from './lost-vars-gutter-local';

export const lostVars = (css: any, settings: any) => {
  let variableFunctions = {
    gutter: lostGutter,
    'gutter-local': lostVarsGutterLocal,
  };

  css.walkDecls((declaration: any) => {
    let value = declaration.value,
      variables = [],
      // eslint-disable-next-line
      re = /lost\-vars\(\s?['"]([\w\-]+)['"]\s?\)/gi,
      match = null;

    if (typeof value !== 'string' || value.indexOf('lost-vars(') === -1) {
      return;
    }

    while ((match = re.exec(value)) !== null) {
      let variableFound = match[1].replace(/["']/g, '');

      if (variables.indexOf(variableFound) === -1) {
        variables.push(variableFound);
      }
    }

    variables.forEach((variable) => {
      console.log(declaration, 'declaration');
      // @ts-ignore
      let func = variableFunctions[variable];

      if (typeof func !== 'function') {
        throw declaration.error(
          `lost-vars: variable '${variable}' is unknown.`
        );
      }
      let newValue;
      if (variable === 'gutter-local') {
        newValue = func(declaration, settings);
      } else if (variable === 'gutter') {
        newValue = func(css, settings);
      } else {
        throw declaration.error(
          `lost-vars: variable '${variable}' is unknown.`
        );
      }

      let replaceRegex = new RegExp(
        // eslint-disable-next-line
        `lost-vars\\(\s?['"]${variable}['"]\s?\\)`,
        'gi'
      );

      value = value.replace(replaceRegex, newValue);
    });

    declaration.value = value;
  });
};
