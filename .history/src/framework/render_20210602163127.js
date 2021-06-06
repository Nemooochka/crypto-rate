import App from '../components/App';

let Component, Target;

export default function renderApp() {
  document.getElementById('app-root').innerHTML = `
            ${App()}
        `;
}
