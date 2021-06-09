// Start from here

import App from './components/App';
import renderApp from './framework/render';
import dataStore from './data/dataStore';

if (module.hot) {
  module.hot.accept();
}

window.dataStorage = dataStore;
window.renderApp = renderApp;

renderApp(App, document.getElementById('app-root'));
