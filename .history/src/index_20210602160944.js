// Start from here

import App from './components/App';
import render
import dataStore from './data/dataStore';
import startApp from './data/coinsData';
import Filters from './components/filters';

if (module.hot) {
  module.hot.accept();
}

window.dataStorage = dataStore;
window.Filters = Filters;

window.renderApp = () => {
  document.getElementById('app-root').innerHTML = `
          ${App()}
      `;
};

startApp();
