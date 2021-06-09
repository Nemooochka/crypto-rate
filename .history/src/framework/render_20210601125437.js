import App from './App';

window.renderApp = () => {
    document.getElementById('app-root').innerHTML = `
            ${App()}
        `;
};