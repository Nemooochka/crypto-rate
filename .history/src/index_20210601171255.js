// Start from here

import App from './components/App';
import dataStore from './data/dataStore';
import startApp from './data/coinsData';
import 

if (module.hot) {
  module.hot.accept();
}

window.dataStorage = dataStore;

window.renderApp = () => {
  document.getElementById('app-root').innerHTML = `
          ${App()}
      `;
};

startApp();
