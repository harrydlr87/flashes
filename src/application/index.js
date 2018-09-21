import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faChartBar } from '@fortawesome/free-solid-svg-icons';
import Routes from './routes';

library.add(faChartBar);

const App = () => <Routes />;

export default App;
