import App from './components/App';

exrenderApp = () => {
  document.getElementById('app-root').innerHTML = `
            ${App()}
        `;
};
