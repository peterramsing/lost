export const newBlock = (
  decl: any,
  selector: any,
  props: any[],
  values: any
) => {
  function appendToSelectors(_thisSelector: string, selectorToAppend: any) {
    const appendedSelectors: any[] = [];

    _thisSelector
      .split(',')
      .forEach(function appendSelectorsFunction(item: any) {
        appendedSelectors.push(item + selectorToAppend);
      });

    return appendedSelectors.join(',');
  }

  const completeSelector = appendToSelectors(decl.parent.selector, selector);

  const block = decl.parent.cloneAfter({
    selector: completeSelector,
  });

  block.walkDecls(function removeDeclarationFunction(declaration: {
    remove: () => void;
  }) {
    declaration.remove();
  });

  props.forEach(function addRulesFunction(prop: any, i: string | number) {
    const rule = decl.clone({
      prop: prop,
      value: values[i].toString(),
    });

    block.append(rule);
  });
};
