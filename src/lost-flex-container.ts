export const lostFlexContainer = (css: any) => {
  css.walkDecls(
    'lost-flex-container',
    function lostFlexContainerFunction(decl: any) {
      decl.cloneBefore({
        prop: 'display',
        value: 'flex',
      });

      if (decl.value === 'column') {
        decl.cloneBefore({
          prop: 'flex-flow',
          value: 'column nowrap',
        });
      } else {
        decl.cloneBefore({
          prop: 'flex-flow',
          value: 'row wrap',
        });
      }

      decl.remove();
    }
  );
};
