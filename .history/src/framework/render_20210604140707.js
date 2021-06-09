/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';
import startApp from '../data/coinsData';

let Component, Target;
let firstLoad = true;

export default function renderApp(componentFunction, targetElementId) {
  if (componentFunction) Component = componentFunction;
  if (targetElementId) Target = targetElementId;
  if (firstLoad) {
    firstLoad = false;
    startApp();
  }

  document.getElementById(Target).innerHTML = `
            ${Component()}
        `;
}
