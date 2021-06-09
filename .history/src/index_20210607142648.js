// Start from here

import App from './components/App';
import { render } from './framework/index';

if (module.hot) {
  module.hot.accept();
}

console.log(render);

render(App, document.getElementById('app-root'));
