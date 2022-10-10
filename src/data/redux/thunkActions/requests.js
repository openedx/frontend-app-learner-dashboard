import { StrictDict } from 'utils';

import { RequestKeys } from 'data/constants/requests';
import { actions } from 'data/redux';
import api from 'data/services/lms/api';

import * as module from './requests';

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

export const networkAction = (requestKey, promise, options) => (dispatch) => (
  dispatch(module.networkRequest({
    requestKey,
    promise,
    ...options,
  })));

export const initializeList = (options) => module.networkAction(
  RequestKeys.initialize,
  api.initializeList(),
  options,
);

export const newEntitlementEnrollment = ({
  uuid,
  courseId,
  ...options
}) => module.networkAction(
  RequestKeys.newEntitlementEnrollment,
  api.updateEntitlementEnrollment({ uuid, courseId }),
  options,
);

export const switchEntitlementEnrollment = ({
  uuid,
  courseId,
  ...options
}) => module.networkAction(
  RequestKeys.switchEntitlementSession,
  api.updateEntitlementEnrollment({ uuid, courseId }),
  options,
);

export const leaveEntitlementSession = ({ uuid, ...options }) => module.networkAction(
  RequestKeys.leaveEntitlementSession,
  api.leaveEntitlementEnrollment({ uuid }),
  options,
);

export const unenrollFromCourse = ({ courseId, ...options }) => module.networkAction(
  RequestKeys.unenrollFromCourse,
  api.unenrollFromCourse({ courseId }),
  options,
);

export const updateEmailSettings = ({ courseId, enable, ...options }) => module.networkAction(
  RequestKeys.updateEmailSettings,
  api.updateEmailSettings({ courseId, enable }),
  options,
);

export const masqueradeAs = ({ user, onSuccess, onFailure }) => (dispatch) => {
  dispatch(networkRequest({
    requestKey: RequestKeys.masquerade,
    onFailure,
    onSuccess,
    promise: api.initializeList({ user }),
  }));
};

export const recommendedCourses = (options) => module.networkAction(
  RequestKeys.recommendedCourses,
  api.recommendedCourses(),
  options,
);

export const clearMasquerade = () => (dispatch) => dispatch(
  actions.requests.clearRequest({ requestKey: RequestKeys.masquerade }),
);

export default StrictDict({
  initializeList,
  masqueradeAs,
  clearMasquerade,
  leaveEntitlementSession,
  newEntitlementEnrollment,
  switchEntitlementEnrollment,
  unenrollFromCourse,
  updateEmailSettings,
  recommendedCourses,
});
