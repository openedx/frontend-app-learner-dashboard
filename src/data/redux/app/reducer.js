import { StrictDict } from 'utils';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  courseMetadata: {
    name: '',
    number: '',
    org: '',
    courseId: '',
  },
};

// eslint-disable-next-line no-unused-vars
const app = createSlice({
  name: 'app',
  initialState,
  reducers: {
    loadCourseMetadata: (state, { payload }) => ({ ...state, courseMetadata: payload }),
  },
});

const actions = StrictDict(app.actions);

const { reducer } = app;

export {
  actions,
  initialState,
  reducer,
};
