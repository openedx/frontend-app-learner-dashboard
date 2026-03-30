import React from 'react';

import { AppContext } from '@edx/frontend-platform/react';

import { RequestKeys } from 'data/constants/requests';
import { post } from 'data/services/lms/utils';
import api from 'data/services/lms/api';

import * as reduxHooks from 'data/redux/hooks';
import * as module from './api';
import { useQuery, useMutation } from '@tanstack/react-query';

const { useMakeNetworkRequest } = reduxHooks;

export const useNetworkRequest = (action, args) => {
  const makeNetworkRequest = useMakeNetworkRequest();
  return (...actionsArgs) => makeNetworkRequest({
    promise: action(...actionsArgs),
    ...args,
  });
};

/**
 * initialize the app, loading ora and course metadata from the api, and loading the initial
 * submission list data.
 */
export const useInitializeApp = () => {
  const { data, error, isLoading } = useQuery('initializeApp', () => api.initializeList());

  return {
    data,
    error,
    isLoading,
  };
};

export const useNewEntitlementEnrollment = (cardId) => {
  const { uuid } = reduxHooks.useCardEntitlementData(cardId);
  const { mutate, isLoading, error } = useMutation(
    (selection) => api.updateEntitlementEnrollment({ uuid, courseId: selection }),
  );

  return {
    enroll: mutate,
    isLoading,
    error,
  };
};

export const useSwitchEntitlementEnrollment = (cardId) => {
  const { uuid } = reduxHooks.useCardEntitlementData(cardId);
  const { mutate, isLoading, error } = useMutation(
    (selection) => api.updateEntitlementEnrollment({ uuid, courseId: selection }),
  );

  return {
    switchEnrollment: mutate,
    isLoading,
    error,
  };
};

export const useLeaveEntitlementSession = (cardId) => {
  const { uuid, isRefundable } = reduxHooks.useCardEntitlementData(cardId);
  const { mutate, isLoading, error } = useMutation(
    () => api.deleteEntitlementEnrollment({ uuid, isRefundable }),
  );

  return {
    leaveSession: mutate,
    isLoading,
    error,
  };
};

export const useUnenrollFromCourse = (cardId) => {
  const { courseId } = reduxHooks.useCardCourseRunData(cardId);
  return module.useNetworkRequest(
    () => api.unenrollFromCourse({ courseId }),
    { requestKey: RequestKeys.unenrollFromCourse },
  );
};

export const useMasqueradeAs = () => {
  const loadData = reduxHooks.useLoadData();
  return module.useNetworkRequest(
    (user) => api.initializeList({ user }),
    { onSuccess: ({ data }) => loadData(data), requestKey: RequestKeys.masquerade },
  );
};

export const useClearMasquerade = () => {
  const clearRequest = reduxHooks.useClearRequest();
  const initializeApp = module.useInitializeApp();
  return () => {
    clearRequest(RequestKeys.masquerade);
    initializeApp();
  };
};

export const useUpdateEmailSettings = (cardId) => {
  const { courseId } = reduxHooks.useCardCourseRunData(cardId);
  return module.useNetworkRequest(
    (enable) => api.updateEmailSettings({ courseId, enable }),
    { requestKey: RequestKeys.updateEmailSettings },
  );
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
