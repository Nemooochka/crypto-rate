import startApp from '../'
let Component, Target, firstLoad;

export default function renderApp(componentFunction, targetElementId) {
  if (componentFunction) Component = componentFunction;
  if (targetElementId) Target = targetElementId;
  if(firstLoad) 

  document.getElementById(Target).innerHTML = `
            ${Component()}
        `;
}
