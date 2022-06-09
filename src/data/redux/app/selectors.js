import { createSelector } from 'reselect';

import { StrictDict } from 'utils';

import * as module from './selectors';

export const appSelector = (state) => state.app;

const mkSimpleSelector = (cb) => createSelector([module.appSelector], cb);

// top-level app data selectors
export const simpleSelectors = {
  enrollments: mkSimpleSelector(app => app.enrollments),
  entitlements: mkSimpleSelector(app => app.entitlements),
  courseData: mkSimpleSelector(app => app.courseData),
};

export const courseCardData = (state, courseNumber) => (
  module.simpleSelectors.courseData(state)[courseNumber]
);

export const cardSelector = (sel, courseNumber) => state => sel(state, courseNumber);

export default StrictDict({
  ...simpleSelectors,
  courseCardData,
  cardSelector,
});
