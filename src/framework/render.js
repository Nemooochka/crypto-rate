import App from './components/App';

window.renderApp = () => {
  document.getElementById('app-root').innerHTML = `
            ${App()}
        `;
};
