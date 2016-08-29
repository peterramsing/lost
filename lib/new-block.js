module.exports = function newBlock(decl, selector, props, values) {
  var completeSelector;
  var block;

  function appendToSelectors(_thisSelector, selectorToAppend) {
    var appendedSelectors = [];

    _thisSelector.split(',').forEach(function appendSelectorsFunction(item) {
      appendedSelectors.push(item + selectorToAppend);
    });

    return appendedSelectors.join(',');
  }

  completeSelector = appendToSelectors(decl.parent.selector, selector);

  block = decl.parent.cloneAfter({
    selector: completeSelector
  });

  block.walkDecls(function removeDeclarationFunction(declaration) {
    declaration.remove();
  });

  props.forEach(function addRulesFunction(prop, i) {
    var rule = decl.clone({
      prop: prop,
      value: values[i].toString()
    });

    rule.moveTo(block);
  });
};
