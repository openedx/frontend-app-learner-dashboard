import { createSelector } from 'reselect';

import { StrictDict } from 'utils';

import * as module from './selectors';

export const appSelector = (state) => state.app;

const mkSimpleSelector = (cb) => createSelector([module.appSelector], cb);

// top-level app data selectors
export const simpleSelectors = {
  courseMetadata: mkSimpleSelector(app => app.courseMetadata),
};

export default StrictDict({
  ...simpleSelectors,
});
