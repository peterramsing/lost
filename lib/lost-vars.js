var lostGutter = require('./lost-vars-gutter');
var lostGutterLocal = require('./lost-vars-gutter-local');

var variableFunctions = {
  gutter: lostGutter,
  'gutter-local': lostGutterLocal
};

module.exports = function lostVarsDecl(css, settings) {
  css.walkDecls(declaration => {
    var value = declaration.value,
      variables = [],
      // eslint-disable-next-line
      re = /lost\-vars\(\s?['"]([\w\-]+)['"]\s?\)/gi,
      match = null;

    if (value.indexOf('lost-vars(') === -1) {
      return;
    }

    while ((match = re.exec(value)) !== null) {
      var variableFound = match[1].replace(/["']/g, '');

      if (variables.indexOf(variableFound) === -1) {
        variables.push(variableFound);
      }
    }

    variables.forEach(variable => {
      var func = variableFunctions[variable];

      if (typeof func !== 'function') {
        throw declaration.error(
          `lost-vars: variable '${variable}' is unknown.`
        );
      }

      var newValue = func(declaration, settings);
      var replaceRegex = new RegExp(
        // eslint-disable-next-line
        `lost-vars\\(\s?['"]${variable}['"]\s?\\)`,
        'gi'
      );

      value = value.replace(replaceRegex, newValue);
    });

    declaration.value = value;
  });
};
