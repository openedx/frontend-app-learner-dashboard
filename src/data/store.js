import * as redux from 'redux';
import thunkMiddleware from 'redux-thunk';
import {
  composeWithDevToolsLogOnlyInProduction,
} from '@redux-devtools/extension';
import { createLogger } from 'redux-logger';

import reducer from './redux';

export const createStore = () => {
  const loggerMiddleware = createLogger();

  const middleware = [thunkMiddleware, loggerMiddleware];

  const store = redux.createStore(
    reducer,
    composeWithDevToolsLogOnlyInProduction(redux.applyMiddleware(...middleware)),
  );

  return store;
};

const store = createStore();

export default store;
