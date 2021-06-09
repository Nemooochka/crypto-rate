// Start from here

import App from './components/App';
import { render } from './framework';

if (module.hot) {
  module.hot.accept();
}

renderApp(App, document.getElementById('app-root'));
