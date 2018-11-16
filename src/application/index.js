import React from 'react';
import { Provider } from 'react-redux'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faChartBar, faRss, faTimes } from '@fortawesome/free-solid-svg-icons';
import store from './store';
import AppInitializer from './components/app-initializer';
import Routes from './routes';

library.add(faChartBar);
library.add(faRss);
library.add(faTimes);

const App = () => (
  <Provider store={store}>
    <AppInitializer>
      <Routes />
    </AppInitializer>
  </Provider>
);

export default App;
