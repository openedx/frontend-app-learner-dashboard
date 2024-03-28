import { combineReducers } from 'redux';

import { StrictDict } from 'utils';

import * as app from './app';
import * as requests from './requests';

const modules = {
  app,
  requests,
};

/**
 * Extracts keys from the modules object and the provided propName parameter to locate the
 * corresponding object for that propName.
 * Example: moduleProps('reducer') will return an aggregated object containing the reducer for each module
 *
 * @param {string} propName Used to locate the prop in each module
 * @returns {object} Aggregated values for the provided propName
 */
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
