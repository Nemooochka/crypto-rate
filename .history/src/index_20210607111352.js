// Start from here

import App from './components/App';
import renderApp from './framework/render';
import dataStore from './data/dataStore';

if (module.hot) {
  module.hot.accept();
}

renderApp(App, document.getElementById('app-root'));
