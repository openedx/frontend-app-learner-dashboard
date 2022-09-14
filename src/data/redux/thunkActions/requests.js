import { StrictDict } from 'utils';

import { RequestKeys } from 'data/constants/requests';
import { actions } from 'data/redux';
import api from 'data/services/lms/api';

// import * as module from './requests';

/**
 * Wrapper around a network request promise, that sends actions to the redux store to
 * track the state of that promise.
 * Tracks the promise by requestKey, and sends an action when it is started, succeeds, or
 * fails.  It also accepts onSuccess and onFailure methods to be called with the output
 * of failure or success of the promise.
 * @param {string} requestKey - request tracking identifier
 * @param {Promise} promise - api event promise
 * @param {[func]} onSuccess - onSuccess method ((response) => { ... })
 * @param {[func]} onFailure - onFailure method ((error) => { ... })
 */
export const networkRequest = ({
  requestKey,
  promise,
  onSuccess,
  onFailure,
}) => (dispatch) => {
  dispatch(actions.requests.startRequest(requestKey));
  return promise.then((response) => {
    if (onSuccess) { onSuccess(response); }
    dispatch(actions.requests.completeRequest({ requestKey, response }));
  }).catch((error) => {
    if (onFailure) { onFailure(error); }
    dispatch(actions.requests.failRequest({ requestKey, error }));
  });
};

export const initializeList = ({ onSuccess, onFailure }) => (dispatch) => {
  dispatch(networkRequest({
    requestKey: RequestKeys.initialize,
    onFailure,
    onSuccess,
    promise: api.initializeList(),
  }));
};

export const updateEntitlementEnrollment = ({
  uuid,
  courseId,
  onSuccess,
  onFailure,
}) => (dispatch) => {
  dispatch(networkRequest({
    requestKey: RequestKeys.enrollEntitlementSession,
    onFailure,
    onSuccess,
    promise: api.updateEntitlementEnrollment({ uuid, courseId }),
  }));
};

export const leaveEntitlementSession = ({
  uuid,
  onSuccess,
  onFailure,
}) => (dispatch) => {
  dispatch(networkRequest({
    requestKey: RequestKeys.leaveEntitlementSession,
    onFailure,
    onSuccess,
    promise: api.leaveEntitlementEnrollment({ uuid }),
  }));
};

export default StrictDict({
  initializeList,
  updateEntitlementEnrollment,
  leaveEntitlementSession,
});
