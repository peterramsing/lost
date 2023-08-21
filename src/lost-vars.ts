import { lostVarsGutter } from './lost-vars-gutter';
import { lostVarsGutterLocal } from './lost-vars-gutter-local';

export const lostVars = (css: any, settings: any) => {
  const variableFunctions = {
    gutter: lostVarsGutter,
    'gutter-local': lostVarsGutterLocal,
  };

  css.walkDecls((declaration: any) => {
    let value = declaration.value;
    const variables = [],
      // eslint-disable-next-line
      re = /lost\-vars\(\s?['"]([\w\-]+)['"]\s?\)/gi;
    let match = null;

    if (typeof value !== 'string' || value.indexOf('lost-vars(') === -1) {
      return;
    }

    const variablesSet = new Set();

    while ((match = re.exec(value)) !== null) {
      const variableFound = match[1].replace(/["']/g, '');

      if (!variablesSet.has(variableFound)) {
        variablesSet.add(variableFound);
        variables.push(variableFound);
      }
    }

    variables.forEach((variable) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const func = variableFunctions[variable];

      if (typeof func !== 'function') {
        throw declaration.error(
          `lost-vars: variable '${variable}' is unknown.`
        );
      }
      const newValue = func(declaration, settings);
      const replaceRegex = new RegExp(
        // eslint-disable-next-line
        `lost-vars\\(\s?['"]${variable}['"]\s?\\)`,
        'gi'
      );

      value = value.replace(replaceRegex, newValue);
    });

    declaration.value = value;
  });
};
