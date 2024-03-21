import { createSelector } from 'reselect';
import { StrictDict } from 'utils';

import * as module from './simpleSelectors';

export const appSelector = (state) => state.app;
// NOTE: createSelector has two parameters here
// The first parameter — inputSelectors is an array [module.appSelector]
// here it is just referencing the above appSelector to select the "app" slice
// In this case, there is only one input selector, but there can be multiple
// The second parameter — is a result function which will take in the input selectors as separate arguments
const mkSimpleSelector = (cb) => createSelector([module.appSelector], cb);

// NOTE: These selectors use the above util to generate selectors for values in the store
// Selectors are used in the app.js file to create exported hooks that eventually called in React components/hooks
// top-level app data selectors
export const simpleSelectors = StrictDict({
  courseData: mkSimpleSelector(app => app.courseData),
  platformSettings: mkSimpleSelector(app => app.platformSettings),
  suggestedCourses: mkSimpleSelector(app => app.suggestedCourses),
  emailConfirmation: mkSimpleSelector(app => app.emailConfirmation),
  enterpriseDashboard: mkSimpleSelector(app => app.enterpriseDashboard || {}),
  selectSessionModal: mkSimpleSelector(app => app.selectSessionModal),
  pageNumber: mkSimpleSelector(app => app.pageNumber),
  // TODO: refactor: add simpleSelector for filters
  filters: mkSimpleSelector(app => app.filters),
  socialShareSettings: mkSimpleSelector(app => app.socialShareSettings),
});

export const cardSimpleSelectors = StrictDict({
  certificate: ({ certificate }) => certificate,
  course: ({ course }) => course,
  courseProvider: ({ courseProvider }) => courseProvider,
  courseRun: ({ courseRun }) => courseRun,
  credit: ({ credit }) => credit,
  enrollment: ({ enrollment }) => enrollment,
  entitlement: ({ entitlement }) => entitlement,
  gradeData: ({ gradeData }) => gradeData,
  relatedPrograms: ({ programs: { relatedPrograms } }) => relatedPrograms,
});

export const mkCardSelector = (simpleSelector, selector) => (state, cardId) => (
  selector(simpleSelector(module.simpleSelectors.courseData(state)[cardId]))
);

export default simpleSelectors;
