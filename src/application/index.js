import React from 'react';
import { Provider } from 'react-redux'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faChartBar, faRss } from '@fortawesome/free-solid-svg-icons';
import store from './store';
import Routes from './routes';

library.add(faChartBar);
library.add(faRss);

const App = () => (
  <Provider store={store}>
    <Routes />
  </Provider>
);

export default App;
