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
  dispatch(requests.initializeList({
    onSuccess: (({ courses, ...globalData }) => {
      dispatch(actions.app.loadCourses({ courses }));
      dispatch(actions.app.loadGlobalData(globalData));
    }),
  }))
);

export const refreshList = () => (dispatch) => (
  dispatch(requests.initializeList({
    onSuccess: (({ courses, ...globalData }) => {
      dispatch(actions.app.loadCourses({ courses }));
      dispatch(actions.app.loadGlobalData(globalData));
    }),
  }))
);

// TODO: connect hook to actual api later
export const sendConfirmEmail = () => () => console.log('send confirm email');

export default StrictDict({
  initialize,
  refreshList,
  sendConfirmEmail,
});
