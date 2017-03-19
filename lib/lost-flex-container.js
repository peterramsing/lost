module.exports = function lostFlexContainerDecl(css) {
  css.walkDecls('lost-flex-container', function lostFlexContainerFunction(decl) {
    decl.cloneBefore({
      prop: 'display',
      value: 'flex'
    });

    if (decl.value === 'column') {
      decl.cloneBefore({
        prop: 'flex-flow',
        value: 'column nowrap'
      });
    } else {
      decl.cloneBefore({
        prop: 'flex-flow',
        value: 'row wrap'
      });
    }

    decl.remove();
  });
};
