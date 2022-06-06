import { StrictDict } from 'utils';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  enrollments: [],
  entitlements: [],
};

// eslint-disable-next-line no-unused-vars
const app = createSlice({
  name: 'app',
  initialState,
  reducers: {
    loadEnrollments: (state, { payload }) => ({ ...state, enrollments: payload }),
    loadEntitlements: (state, { payload }) => ({ ...state, entitlements: payload }),
  },
});

const actions = StrictDict(app.actions);

const { reducer } = app;

export {
  actions,
  initialState,
  reducer,
};
