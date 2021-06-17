import startApp from '../data/coinsData';
let Component, Target, firstLoad = true;

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