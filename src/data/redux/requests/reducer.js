import { createSlice } from '@reduxjs/toolkit';

import { StrictDict } from 'utils';

import { RequestStates, RequestKeys } from 'data/constants/requests';

const initialState = {
  [RequestKeys.initialize]: { status: RequestStates.inactive },
  [RequestKeys.refreshList]: { status: RequestStates.inactive },
  [RequestKeys.enrollEntitlementSession]: { status: RequestStates.inactive },
  [RequestKeys.leaveEntitlementSession]: { status: RequestStates.inactive },
  [RequestKeys.masquerade]: { status: RequestStates.inactive },
};

// eslint-disable-next-line no-unused-vars
const requests = createSlice({
  name: 'requests',
  initialState,
  reducers: {
    startRequest: (state, { payload }) => ({
      ...state,
      [payload.requestKey]: {
        status: RequestStates.pending,
      },
    }),
    completeRequest: (state, { payload }) => ({
      ...state,
      [payload.requestKey]: {
        status: RequestStates.completed,
        response: payload.response,
      },
    }),
    failRequest: (state, { payload }) => ({
      ...state,
      [payload.requestKey]: {
        status: RequestStates.failed,
        error: payload.error,
      },
    }),
    clearRequest: (state, { payload }) => ({
      ...state,
      [payload.requestKey]: {},
    }),
  },
});

const actions = StrictDict(requests.actions);
const { reducer } = requests;

export {
  actions,
  reducer,
  initialState,
};
