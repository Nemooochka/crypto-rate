// Start from here

import App from './components/App';
import renderApp from './framework/render';
import dataStore from './data/dataStore';
import Filters from './components/Filters';

if (module.hot) {
  module.hot.accept();
}

window.dataStorage = dataStore;
window.renderApp = renderApp;
// window.Filters = Filters;

renderApp(App, document.getElementById('app-root'));
