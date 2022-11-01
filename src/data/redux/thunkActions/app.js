import { StrictDict } from 'utils';
import { handleEvent } from 'data/services/segment/utils';
import { eventNames } from 'data/services/segment/constants';
import { actions, selectors } from 'data/redux';
import { post } from 'data/services/lms/utils';

import requests from './requests';

// import { locationId } from 'data/constants/app';

// import { } from './requests';
import * as module from './app';

export const loadData = ({ courses, ...globalData }) => dispatch => {
  dispatch(actions.app.setPageNumber(1));
  dispatch(actions.app.loadGlobalData(globalData));
  dispatch(actions.app.loadCourses({ courses }));
};

/**
 * initialize the app, loading ora and course metadata from the api, and loading the initial
 * submission list data.
 */
export const initialize = () => (dispatch) => (
  dispatch(requests.initializeList({
    onSuccess: ({ data }) => dispatch(module.loadData(data)),
  }))
);

// TODO: connect hook to actual api later
export const sendConfirmEmail = () => (dispatch, getState) => post(
  selectors.app.emailConfirmation(getState()).sendEmailUrl,
);

export const newEntitlementEnrollment = (cardId, selection) => (dispatch, getState) => {
  const { uuid } = selectors.app.courseCard.entitlement(getState(), cardId);
  handleEvent(eventNames.sessionChange({ action: 'new' }), {
    fromCourseRun: null,
    toCourseRun: selection,
  });
  dispatch(requests.newEntitlementEnrollment({ uuid, courseId: selection }));
  dispatch(initialize());
};

export const switchEntitlementEnrollment = (cardId, selection) => (dispatch, getState) => {
  const { courseId } = selectors.app.courseCard.courseRun(getState(), cardId);
  const { uuid } = selectors.app.courseCard.entitlement(getState(), cardId);
  handleEvent(eventNames.sessionChange({ action: 'switch' }), {
    fromCourseRun: courseId,
    toCourseRun: selection,
  });
  dispatch(requests.switchEntitlementEnrollment({ uuid, courseId: selection }));
  dispatch(initialize());
};

export const leaveEntitlementSession = (cardId) => (dispatch, getState) => {
  const { courseId } = selectors.app.courseCard.courseRun(getState(), cardId);
  const { uuid } = selectors.app.courseCard.entitlement(getState(), cardId);
  handleEvent(eventNames.entitlementUnenroll({ action: 'leave' }), {
    fromCourseRun: courseId,
    toCourseRun: null,
  });
  dispatch(requests.leaveEntitlementSession({ uuid }));
  dispatch(initialize());
};

export const unenrollFromCourse = (cardId, reason) => (dispatch, getState) => {
  const { courseId } = selectors.app.courseCard.courseRun(getState(), cardId);
  if (reason) {
    handleEvent(eventNames.unenrollReason, {
      category: 'user-engagement',
      displayName: 'v1',
      label: reason,
      course_id: courseId,
    });
  }
  dispatch(requests.unenrollFromCourse({
    courseId,
    onSuccess: () => dispatch(module.initialize()),
  }));
};

export const masqueradeAs = (user) => (dispatch) => (
  dispatch(requests.masqueradeAs({
    user,
    onSuccess: ({ data }) => dispatch(module.loadData(data)),
  }))
);

export const clearMasquerade = () => (dispatch) => {
  dispatch(requests.clearMasquerade());
  dispatch(module.initialize());
};

export const updateEmailSettings = (cardId, enable) => (dispatch, getState) => {
  const { courseId } = selectors.app.courseCard.courseRun(getState(), cardId);
  dispatch(requests.updateEmailSettings({
    courseId,
    enable,
  }));
};

export default StrictDict({
  loadData,
  initialize,
  refreshList: initialize,
  sendConfirmEmail,
  newEntitlementEnrollment,
  switchEntitlementEnrollment,
  leaveEntitlementSession,
  unenrollFromCourse,
  masqueradeAs,
  clearMasquerade,
  updateEmailSettings,
});
