import App from './components/App';

export default renderApp = () => {
  document.getElementById('app-root').innerHTML = `
            ${App()}
        `;
};
