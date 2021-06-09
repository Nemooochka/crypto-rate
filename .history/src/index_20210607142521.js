// Start from here

import App from './components/App';
import { render } from './framework';

if (module.hot) {
  module.hot.accept();
}

console.log(App, render);

render(App, document.getElementById('app-root'));
