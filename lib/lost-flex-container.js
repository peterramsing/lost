/**
 * lost-flex-container: Creates a Flexbox container.
 *
 * @param {string} [row|column] - The flex-direction the container should
 *   create. This is typically opposite to the element you're creating so a
 *   row would need `lost-flex-container: column;`.
 *
 * @example
 *   section {
 *     lost-flex-container: row;
 *   }
 *   div {
 *     lost-column: 1/2 flex;
 *   }
 */
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
