import { createSelector } from 'reselect';

import { StrictDict } from 'utils';

import * as module from './selectors';

export const appSelector = (state) => state.app;

const mkSimpleSelector = (cb) => createSelector([module.appSelector], cb);

// top-level app data selectors
export const simpleSelectors = {
  enrollments: mkSimpleSelector(app => app.enrollments),
  entitlements: mkSimpleSelector(app => app.entitlements),
};

export default StrictDict({
  ...simpleSelectors,
});
