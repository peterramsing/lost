import { lostVarsGutterLocal } from './lost-vars-gutter-local';
import { lostVarsGutter } from './lost-vars-gutter';

export const lostGutter = (css: any, settings: any) => {
  var gutter, newValue;
  css.walkDecls((declaration: any) => {
    if (
      /(\$lost-gutter)/g.test(declaration.value) &&
      !/(\$lost-gutter-local)/g.test(declaration.value)
    ) {
      gutter = lostVarsGutter(declaration, settings);

      newValue = declaration.value.replace(/(\$lost-gutter)/g, gutter);
      declaration.value = newValue;
    }
    if (/(\$lost-gutter-local)/g.test(declaration.value)) {
      gutter = lostVarsGutterLocal(declaration, settings);

      newValue = declaration.value.replace(/(\$lost-gutter-local)/g, gutter);
      declaration.value = newValue;
    }
  });
};

// css.walkDecls((declaration) => {
//   if (
//     /(\$lost-gutter)/g.test(declaration.value) &&
//     !/(\$lost-gutter-local)/g.test(declaration.value)
//   ) {
//     gutter = lostGutter(declaration, settings);

//     newValue = declaration.value.replace(/(\$lost-gutter)/g, gutter);
//     declaration.value = newValue;
//   }
//   if (/(\$lost-gutter-local)/g.test(declaration.value)) {
//     gutter = lostGutterLocal(declaration, settings);

//     newValue = declaration.value.replace(/(\$lost-gutter-local)/g, gutter);
//     declaration.value = newValue;
//   }
// });
