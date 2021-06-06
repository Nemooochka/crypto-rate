import App from '../components/App';

let Component, Target;

export default function renderApp(componentFunction, targetElementId) {
  if (componentFunction) Component = componentFunction;
  if (targetElementId) Target = targetElementId;
  document.getElementById('app-root').innerHTML = `
            ${App()}
        `;
}
