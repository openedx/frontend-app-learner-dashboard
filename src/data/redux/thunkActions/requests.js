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

export const networkAction = ({ requestKey, promise, options }) => (dispatch) => (
  dispatch(module.networkRequest({
    requestKey,
    promise,
    ...options,
  })));

export const initializeList = (options) => module.networkAction({
  requestKey: RequestKeys.initialize,
  promise: api.initializeList(),
  options,
});

export const newEntitlementEnrollment = ({
  uuid,
  courseId,
  ...options
}) => module.networkAction({
  requestKey: RequestKeys.newEntitlementEnrollment,
  promise: api.updateEntitlementEnrollment({ uuid, courseId }),
  options,
});

export const switchEntitlementEnrollment = ({
  uuid,
  courseId,
  ...options
}) => module.networkAction({
  requestKey: RequestKeys.switchEntitlementSession,
  promise: api.updateEntitlementEnrollment({ uuid, courseId }),
  options,
});

export const leaveEntitlementSession = ({ uuid, isRefundable, ...options }) => module.networkAction({
  requestKey: RequestKeys.leaveEntitlementSession,
  promise: api.deleteEntitlementEnrollment({ uuid, isRefundable }),
  options,
});

export const unenrollFromCourse = ({ courseId, ...options }) => module.networkAction({
  requestKey: RequestKeys.unenrollFromCourse,
  promise: api.unenrollFromCourse({ courseId }),
  options,
});

export const updateEmailSettings = ({ courseId, enable, ...options }) => module.networkAction({
  requestKey: RequestKeys.updateEmailSettings,
  promise: api.updateEmailSettings({ courseId, enable }),
  options,
});

export const masqueradeAs = ({ user, ...options }) => module.networkAction({
  requestKey: RequestKeys.masquerade,
  promise: api.initializeList({ user }),
  options,
});

export const clearMasquerade = () => (dispatch) => dispatch(
  actions.requests.clearRequest({ requestKey: RequestKeys.masquerade }),
);

export const recommendedCourses = (options) => module.networkAction({
  requestKey: RequestKeys.recommendedCourses,
  promise: api.recommendedCourses(),
  options,
});

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
