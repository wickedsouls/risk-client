import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
// Reducers

import { rootSaga } from './sagas';

interface Env {
  NODE_PATH: string;
  REACT_APP_MAP_KEY: string;
  REACT_APP_SERVER_URL: string;
}

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    _env_: Env;
  }
}

declare global {
  type RootState = any;
  // interface RootState {
  //   // reducer interface goes here
  // }
}

/** Create reducer combined of all others. This is the global app state */
const rootReducer = () =>
  combineReducers<RootState>({
    // list of all reducers
  });

/** Enable redux dev tools */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  rootReducer(),
  composeEnhancers(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(rootSaga);
