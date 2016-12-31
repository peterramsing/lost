module.exports = function lgGutter(css, settings) {
  var gutter = settings.gutter;
  css.walkDecls( declaration => {
    if (
      /(\$lost-gutter)/g.test(declaration.value) &&
      !/(\$lost-gutter-local)/g.test(declaration.value)
    ) {
      var newGlobalValue = declaration.value.replace(/(\$lost-gutter)/g, gutter);
      declaration.value = newGlobalValue;
    }
    if (/(\$lost-gutter-local)/g.test(declaration.value)) {
      var newLocalValue = gutter;
      declaration.parent.nodes.forEach( parentDeclaration => {
        var declarationArray = parentDeclaration.value.split(' ');

        if (
          parentDeclaration.prop === 'lost-column' ||
          parentDeclaration.prop === 'lost-waffle' ||
          parentDeclaration.prop === 'lost-offset'
        ) {
          if (declarationArray[2] !== undefined && declarationArray[2].search(/^\d/) !== -1) {
            newLocalValue = declarationArray[2];
          }
        } else if (
          parentDeclaration.prop === 'lost-center' ||
          parentDeclaration.prop === 'lost-masonry-wrap' ||
          parentDeclaration.prop === 'lost-masonry-column' ||
          parentDeclaration.prop === 'lost-row'
        ) {
          if (declarationArray[1] !== undefined && declarationArray[1].search(/^\d/) !== -1) {
            newLocalValue = declarationArray[1];

          }
        } else if (parentDeclaration.prop === 'lost-column-gutter') {
          newLocalValue = parentDeclaration.value;
        }

        declaration.value = newLocalValue;
      });

      newLocalValue = declaration.value.replace(/(\$lost-gutter-local)/g, gutter);
      declaration.value = newLocalValue;
    }

  });
};
