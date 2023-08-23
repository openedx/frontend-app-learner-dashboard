import { createSelector } from 'reselect';
import { StrictDict } from 'utils';

import * as module from './simpleSelectors';

export const appSelector = (state) => state.app;
const mkSimpleSelector = (cb) => createSelector([module.appSelector], cb);

// top-level app data selectors
export const simpleSelectors = StrictDict({
  courseData: mkSimpleSelector(app => app.courseData),
  platformSettings: mkSimpleSelector(app => app.platformSettings),
  suggestedCourses: mkSimpleSelector(app => app.suggestedCourses),
  emailConfirmation: mkSimpleSelector(app => app.emailConfirmation),
  enterpriseDashboard: mkSimpleSelector(app => app.enterpriseDashboard || {}),
  selectSessionModal: mkSimpleSelector(app => app.selectSessionModal),
  pageNumber: mkSimpleSelector(app => app.pageNumber),
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
