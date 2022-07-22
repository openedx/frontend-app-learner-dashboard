import { StrictDict } from 'utils';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  enrollments: [],
  courseData: {},
  entitlements: [],
  emailConfirmation: {},
  enterpriseDashboards: {},
  platformSettings: {},
  suggestedCourses: {},
  filterState: {},
};

// eslint-disable-next-line no-unused-vars
const app = createSlice({
  name: 'app',
  initialState,
  reducers: {
    loadCourses: (state, { payload: { enrollments, entitlements } }) => ({
      ...state,
      enrollments: [
        ...enrollments.map(curr => curr.courseRun.courseNumber),
        ...entitlements.map(curr => curr.courseRun.courseNumber),
      ],
      courseData: {
        ...entitlements.reduce(
          (obj, curr) => ({ ...obj, [curr.courseRun.courseNumber]: curr }),
          {},
        ),
        ...enrollments.reduce(
          (obj, curr) => ({ ...obj, [curr.courseRun.courseNumber]: curr }),
          {},
        ),
      },
    }),
    loadGlobalData: (state, { payload }) => ({
      ...state,
      emailConfirmation: payload.emailConfirmation,
      enterpriseDashboards: payload.enterpriseDashboards,
      platformSettings: payload.platformSettings,
      suggestedCourses: payload.suggestedCourses,
    }),
  },
});

const actions = StrictDict(app.actions);

const { reducer } = app;

export {
  actions,
  initialState,
  reducer,
};
