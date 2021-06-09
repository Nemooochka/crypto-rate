// Start from here

import App from './components/App';
import { render } from './framework/render';

if (module.hot) {
  module.hot.accept();
}

render(App, document.getElementById('app-root'));
