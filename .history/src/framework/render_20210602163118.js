import App from '../components/App';

let 

export default function renderApp() {
  document.getElementById('app-root').innerHTML = `
            ${App()}
        `;
}
