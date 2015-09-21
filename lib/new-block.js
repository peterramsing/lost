module.exports = function newBlock(decl, selector, props, values) {
  var appendToSelectors, completeSelector, block;

  appendToSelectors = function (selector, selectorToAppend) {
    var appendedSelectors = [];

    selector.split(',').forEach(function(item) {
      appendedSelectors.push(item + selectorToAppend);
    });

    return appendedSelectors.join(',');
  };

  completeSelector = appendToSelectors(decl.parent.selector, selector);

  block = decl.parent.cloneAfter({
        selector: completeSelector
      }),
      props = props || [],
      values = values || [];

  block.walkDecls(function (decl) {
    decl.remove();
  });

  props.forEach(function (prop, i) {
    var rule = decl.clone({
      prop: prop,
      value: values[i].toString()
    });

    rule.moveTo(block);
  });
};
