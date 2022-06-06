import { StrictDict } from 'utils';
import { actions } from 'data/redux';

import requests from './requests';

// import { locationId } from 'data/constants/app';

// import { } from './requests';
// import * as module from './app';

/**
 * initialize the app, loading ora and course metadata from the api, and loading the initial
 * submission list data.
 */
export const initialize = () => (dispatch) => (
  requests.initializeList().then(
    ({ enrollments, entitlements }) => {
      dispatch(actions.app.loadEnrollments(enrollments));
      dispatch(actions.app.loadEntitlements(entitlements));
    },
  )
);

export const refreshList = () => (dispatch) => (
  requests.initializeList().then(
    ({ enrollments, entitlements }) => {
      dispatch(actions.app.loadEnrollments(enrollments));
      dispatch(actions.app.loadEntitlements(entitlements));
    },
  )
);

export default StrictDict({
  initialize,
  refreshList,
});
