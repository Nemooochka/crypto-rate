import App from './com'

window.renderApp = () => {
    document.getElementById('app-root').innerHTML = `
            ${App()}
        `;
};