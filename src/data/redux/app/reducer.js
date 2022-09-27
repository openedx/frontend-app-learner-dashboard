import { createSlice } from '@reduxjs/toolkit';

import { StrictDict } from 'utils';

const initialState = {
  pageNumber: 1,
  enrollments: [],
  courseData: {},
  entitlement: [],
  emailConfirmation: {},
  enterpriseDashboard: {},
  platformSettings: {},
  suggestedCourses: [],
  filterState: {},
  selectSessionModal: {},
};

export const cardId = (val) => `card-${val}`;

// eslint-disable-next-line no-unused-vars
const app = createSlice({
  name: 'app',
  initialState,
  reducers: {
    loadCourses: (state, { payload: { courses } }) => ({
      ...state,
      courseData: courses.reduce(
        (obj, curr, index) => ({
          ...obj,
          [cardId(index)]: { ...curr, cardId: cardId(index) },
        }),
        {},
      ),
    }),
    loadGlobalData: (state, { payload }) => ({
      ...state,
      emailConfirmation: payload.emailConfirmation,
      enterpriseDashboard: payload.enterpriseDashboard,
      platformSettings: payload.platformSettings,
      suggestedCourses: payload.suggestedCourses,
    }),
    updateSelectSessionModal: (state, { payload }) => ({
      ...state,
      selectSessionModal: { cardId: payload },
    }),
    setPageNumber: (state, { payload }) => ({ ...state, pageNumber: payload }),
  },
});

const actions = StrictDict(app.actions);

const { reducer } = app;

export {
  actions,
  initialState,
  reducer,
};
