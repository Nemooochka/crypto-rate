/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement } from './element';

let Component, Target;

export function render(componentFunction = null, targetElement = null) {
  console.log(Component, Target);
  if (componentFunction) Component = componentFunction;
  if (targetElement) Target = targetElement;
  // if (firstLoad) {
  //   firstLoad = false;
  //   startApp();
  // }

  // Target.innerHTML = '';
  // Target.appendChild(<Component />);

  Target.replaceChildren(<Component />);
}

// /** @jsx createElement */
// /*** @jsxFrag createFragment */
// import { createElement } from './element';
// import { current } from './hooks';

// /**
//  * Renders a component and attaches it to the target DOM element
//  * @param Component - function
//  * @param target - DOM element to attach component to
//  */

// let timer;

// export function render(Component, target) {
//   function workLoop() {
//     if (current.shouldReRender) {
//       current.shouldReRender = false;
//       target.replaceChildren(<Component />);
//     }

//     cancelAnimationFrame(timer);
//     timer = requestAnimationFrame(workLoop);
//   }
//   timer = requestAnimationFrame(workLoop);
// }

// export default render;
