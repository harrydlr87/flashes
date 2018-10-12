import { combineReducers, createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import ReduxFsaThunk from 'redux-thunk-fsa';
import ReduxPromise from 'redux-promise';

// Reducers
import application from './reducer';
// import scenes from '../../scenes/reducer';
// import common from '../../common/components/containers/reducer';

const rootReducer = combineReducers({
  application,
  // scenes,
  // common,
});

const developmentMode = process.env.NODE_ENV === 'development';
const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

// Create store
const createStoreWithMiddleware = applyMiddleware(
  ReduxFsaThunk,
  ReduxThunk,
  ReduxPromise,
)(createStore);

export default createStoreWithMiddleware(rootReducer, developmentMode && devToolsExtension && devToolsExtension());
