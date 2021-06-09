// Start from here

import App from './components/App';
import renderApp from './framework/render';
import dataStore from './data/dataStore';
import startApp from './data/coinsData';
import Filters from './components/filters';

if (module.hot) {
  module.hot.accept();
}

window.dataStorage = dataStore;
qin
window.Filters = Filters;

window.renderApp = () => {
  document.getElementById('app-root').innerHTML = `
          ${App()}
      `;
};

startApp();
