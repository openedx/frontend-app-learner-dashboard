import React from 'react';

import { AppContext } from '@edx/frontend-platform/react';

import { RequestKeys } from 'data/constants/requests';
import { post } from 'data/services/lms/utils';
import api from 'data/services/lms/api';

import * as reduxHooks from 'data/redux/hooks';

import * as module from './api';

const { useMakeNetworkRequest } = reduxHooks;

export const useNetworkRequest = (action, args) => {
  const makeNetworkRequest = useMakeNetworkRequest();
  return () => makeNetworkRequest({
    promise: action(),
    ...args,
  });
};

/**
 * initialize the app, loading ora and course metadata from the api, and loading the initial
 * submission list data.
 */
export const useInitializeApp = () => {
  const loadData = reduxHooks.useLoadData();
  return module.useNetworkRequest(api.initializeList, {
    requestKey: RequestKeys.initialize,
    onSuccess: ({ data }) => loadData(data),
  });
};

export const useNewEntitlementEnrollment = (cardId) => {
  const { uuid } = reduxHooks.useCardEntitlementData(cardId);
  const onSuccess = module.useInitializeApp();
  const requestKey = RequestKeys.newEntitlementEnrollment;
  return (selection) => module.useNetworkRequest(
    () => api.updateEntitlementEnrollment({ uuid, courseId: selection }),
    { requestKey, onSuccess },
  )();
};

export const useSwitchEntitlementEnrollment = (cardId) => {
  const { uuid } = reduxHooks.useCardEntitlementData(cardId);
  const onSuccess = module.useInitializeApp();
  const requestKey = RequestKeys.switchEntitlementSession;
  return (selection) => module.useNetworkRequest(
    () => api.updateEntitlementEnrollment({ uuid, courseId: selection }),
    { requestKey, onSuccess },
  )();
};

export const useLeaveEntitlementSession = (cardId) => {
  const { uuid, isRefundable } = reduxHooks.useCardEntitlementData(cardId);
  const onSuccess = module.useInitializeApp();
  const requestKey = RequestKeys.leaveEntitlementSession;
  return module.useNetworkRequest(
    () => api.deleteEntitlementEnrollment({ uuid, isRefundable }),
    { requestKey, onSuccess },
  );
};

export const useUnenrollFromCourse = (cardId) => {
  const { courseId } = reduxHooks.useCardCourseRunData(cardId);
  const requestKey = RequestKeys.unenrollFromCourse;
  return module.useNetworkRequest(
    () => api.unenrollFromCourse({ courseId }),
    { requestKey },
  );
};

export const useMasqueradeAs = () => {
  const requestKey = RequestKeys.masquerade;
  const loadData = reduxHooks.useLoadData();
  return (user) => module.useNetworkRequest(
    () => api.initializeList({ user }),
    { requestKey, onSuccess: ({ data }) => loadData(data) },
  )();
};

export const useClearMasquerade = () => {
  const clearRequest = reduxHooks.requests.useClearRequest();
  const initializeApp = module.useInitializeApp();
  return () => {
    clearRequest(RequestKeys.masquerade);
    initializeApp();
  };
};

export const useUpdateEmailSettings = (cardId) => {
  const { courseId } = reduxHooks.useCardCourseRunData(cardId);
  const requestKey = RequestKeys.updateEmailSettings;
  return (enable) => module.useNetworkRequest(
    () => api.updateEmailSettings({ courseId, enable }),
    { requestKey },
  )();
};

export const useSendConfirmEmail = () => {
  const { sendEmailUrl } = reduxHooks.useEmailConfirmationData();
  return () => post(sendEmailUrl);
};

export const useCreateCreditRequest = (cardId) => {
  const { providerId } = reduxHooks.useCardCreditData(cardId);
  const { authenticatedUser: { username } } = React.useContext(AppContext);
  const { courseId } = reduxHooks.useCardCourseRunData(cardId);
  return () => api.createCreditRequest({ providerId, courseId, username });
};
