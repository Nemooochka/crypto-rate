// Start from here

import App from './components/App';
import { render } from './framework';

if (module.hot) {
  module.hot.accept();
}

render('<div>asdas</div>, document.getElementById('app-root'));
