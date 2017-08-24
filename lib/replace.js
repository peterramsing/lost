var parse = require('postcss-js/parser');

function newBlock(decl, selector) {
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

  return block;
}

function appendCss(decl, block) {
  decl.nodes.forEach(node => block.append({
    prop: node.prop,
    value: node.value
  }));
}

function applyCss(decl, block) {
  block.nodes.forEach(node => {
    if (node.type === 'rule') {
      appendCss(node, newBlock(decl, node.selector));
    } else {
      decl.cloneBefore({
        prop: node.prop,
        value: node.value
      });
    }
  });
}

module.exports = function replace(decl, css) {
  var root = parse(css);
  
  applyCss(decl, root);
  
  decl.remove();  
};
