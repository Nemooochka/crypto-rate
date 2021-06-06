/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement } from './element';
import startApp from '../data/coinsData';

let Component, Target;
let firstLoad = true;

export default function renderApp(componentFunction = null, targetElement = null) {
  if (componentFunction) Component = componentFunction;
  if (targetElement) Target = targetElement;
  if (firstLoad) {
    firstLoad = false;
    startApp();
  }

  Target.innerHTML = '';
  Target.appendChild(<Component />);
}