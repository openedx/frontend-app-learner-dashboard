// TODO: research: waht is createSlice?
import { createSlice } from '@reduxjs/toolkit';

import { StrictDict } from 'utils';

const initialState = {
  pageNumber: 1,
  courseData: {},
  entitlement: [],
  emailConfirmation: {},
  enterpriseDashboard: {},
  platformSettings: {},
  suggestedCourses: [],
  // TODO: remove this?? It's not currently being used by anything
  filterState: {},
  selectSessionModal: {},
  // TODO: refactor: add initial state for filters array
  filters: [],
};

export const cardId = (val) => `card-${val}`;

export const today = Date.now();

// NOTE: createSlice accepts a name, initial state, and an object of reducer functions
// The reducer functions are what's used to generate the action types
// Think of each reducer function as a case in a switch statement
// eslint-disable-next-line no-unused-vars
const app = createSlice({
  name: 'app',
  initialState,
  reducers: {
    loadCourses: (state, { payload: { courses } }) => ({
      ...state,
      courseData: courses.reduce(
        (obj, curr, index) => {
          const out = { ...curr, cardId: cardId(index) };
          if (out.enrollment.lastEnrolled === null) {
            out.enrollment.lastEnrolled = today;
          }
          return { ...obj, [cardId(index)]: out };
        },
        {},
      ),
    }),
    loadGlobalData: (state, { payload }) => ({
      ...state,
      emailConfirmation: payload.emailConfirmation,
      enterpriseDashboard: payload.enterpriseDashboard,
      platformSettings: payload.platformSettings,
      suggestedCourses: payload.suggestedCourses,
      socialShareSettings: payload.socialShareSettings,
    }),
    updateSelectSessionModal: (state, { payload }) => ({
      ...state,
      selectSessionModal: { cardId: payload },
    }),
    setPageNumber: (state, { payload }) => ({ ...state, pageNumber: payload }),
    // TODO: refactor:
    setFilters: (state, { payload }) => ({
      ...state,
      filters: payload,
    }),
    addFilter: (state, { payload }) => ({
      ...state,
      filters: [...state.filters, payload],
    }),
    removeFilter: (state, { payload }) => ({
      ...state,
      filters: state.filters.filter(item => item !== payload),
    }),
    clearFilters: (state) => ({
      ...state,
      filters: [],
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
