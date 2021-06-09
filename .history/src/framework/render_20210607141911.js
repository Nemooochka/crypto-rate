/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement } from './element';
import startApp from '../data/coinsData';

let Component, Target;
let firstLoad = true;

export default function render(componentFunction = null, targetElement = null) {
  if (componentFunction) Component = componentFunction;
  if (targetElement) Target = targetElement;
  if (firstLoad) {
    firstLoad = false;
    startApp();
  }

  Target.innerHTML = '';
  Target.appendChild(<Component />);
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

// import startApp from '../data/coinsData';

// let timer;
// let firstLoad = true;

// export function render(Component, target) {
//   function workLoop() {
//     if (current.shouldReRender) {
//       current.shouldReRender = false;
//       target.replaceChildren(<Component />);
//     }

//     cancelAnimationFrame(timer);
//     timer = requestAnimationFrame(workLoop);
//   }
//   if (firstLoad) {
//     firstLoad = false;
//     startApp();
//   }
//   timer = requestAnimationFrame(workLoop);
// }

// export default render;
