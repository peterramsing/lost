module.exports = function lostVarsGutterLocal(declaration, settings) {
  var newLocalValue = settings.gutter;

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
  });

  return newLocalValue;
};
