import { combineReducers } from 'redux';

import { StrictDict } from 'utils';

import * as app from './app';
import * as requests from './requests';
import * as cardData from './cardData';

export { default as thunkActions } from './thunkActions';

const modules = {
  app,
  requests,
  cardData,
};

const moduleProps = (propName) => Object.keys(modules).reduce(
  (obj, moduleKey) => {
    const value = modules[moduleKey][propName];
    return value ? { ...obj, [moduleKey]: value } : obj;
  },
  {},
);

const rootReducer = combineReducers(moduleProps('reducer'));

const actions = StrictDict(moduleProps('actions'));

const selectors = StrictDict(moduleProps('selectors'));

export { actions, selectors };

export default rootReducer;
