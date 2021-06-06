import App from '../components/App';

let Component, Target;

export default function renderApp(componentFunction, targetElementId) {
  if(componentFunction) Component =  
  document.getElementById('app-root').innerHTML = `
            ${App()}
        `;
}
