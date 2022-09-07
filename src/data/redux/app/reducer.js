import { StrictDict } from 'utils';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  enrollments: [],
  courseData: {},
  entitlement: [],
  emailConfirmation: {},
  enterpriseDashboards: {},
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
      enterpriseDashboards: payload.enterpriseDashboards,
      platformSettings: payload.platformSettings,
      suggestedCourses: payload.suggestedCourses,
    }),
    updateSelectSessionModal: (state, { payload }) => ({
      ...state,
      selectSessionModal: { cardId: payload },
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
