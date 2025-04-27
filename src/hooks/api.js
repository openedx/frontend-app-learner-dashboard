import { useContext } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { SiteContext } from '@openedx/frontend-base';

import GlobalDataContext from '../data/contexts/GlobalDataContext';
import MasqueradeUserContext from '../data/contexts/MasqueradeUserContext';

import { RequestKeys } from '../data/constants/requests';
import { post } from '../data/services/lms/utils';
import api from '../data/services/lms/api';

import * as reduxHooks from '../data/redux/hooks';
import * as module from './api';

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
  const { masqueradeUser, setMasqueradeIsSuccess, setMasqueradeIsPending, setMasqueradeIsError, setMasqueradeError } = useContext(MasqueradeUserContext);
  const { setEmailConfirmation, setPlatformSettings } = useContext(GlobalDataContext);
  const loadData = reduxHooks.useLoadData();

  const query = useQuery({
    queryKey: [RequestKeys.initialize, masqueradeUser],
    queryFn: async () => api.initializeList({ user: masqueradeUser }),
    retry: false,
  });

  // Masquerade handles errors independenty.
  if (masqueradeUser) {
    setMasqueradeIsPending(query.isPending);
    setMasqueradeIsError(query.isError);
    setMasqueradeError(query.error);
  }

  if (!query.isPending && !query.isError && query.data?.data) {
    if (masqueradeUser) {
      setMasqueradeIsSuccess(true);
    }
    // Load data into React contexts.
    const { emailConfirmation, platformSettings } = query.data.data;
    setEmailConfirmation(emailConfirmation);
    setPlatformSettings(platformSettings);

    // Load data into Redux.
    loadData(query.data.data);
  }

  return query;
};

export const useNewEntitlementEnrollment = (cardId) => {
  const { uuid } = reduxHooks.useCardEntitlementData(cardId);
  const queryClient = useQueryClient();
  const onSuccess = () => queryClient.invalidateQueries({ queryKey: [RequestKeys.initialize] });

  return module.useNetworkRequest(
    (selection) => api.updateEntitlementEnrollment({ uuid, courseId: selection }),
    { onSuccess, requestKey: RequestKeys.newEntitlementEnrollment },
  );
};

export const useSwitchEntitlementEnrollment = (cardId) => {
  const { uuid } = reduxHooks.useCardEntitlementData(cardId);
  const queryClient = useQueryClient();
  const onSuccess = () => queryClient.invalidateQueries({ queryKey: [RequestKeys.initialize] });
  const action = (selection) => api.updateEntitlementEnrollment({ uuid, courseId: selection });
  return module.useNetworkRequest(
    action,
    { onSuccess, requestKey: RequestKeys.switchEntitlementSession },
  );
};

export const useLeaveEntitlementSession = (cardId) => {
  const { uuid, isRefundable } = reduxHooks.useCardEntitlementData(cardId);
  const queryClient = useQueryClient();
  const onSuccess = () => queryClient.invalidateQueries({ queryKey: [RequestKeys.initialize] });
  return module.useNetworkRequest(
    () => api.deleteEntitlementEnrollment({ uuid, isRefundable }),
    { onSuccess, requestKey: RequestKeys.leaveEntitlementSession },
  );
};

export const useUnenrollFromCourse = (cardId) => {
  const { courseId } = reduxHooks.useCardCourseRunData(cardId);
  return module.useNetworkRequest(
    () => api.unenrollFromCourse({ courseId }),
    { requestKey: RequestKeys.unenrollFromCourse },
  );
};

export const useUpdateEmailSettings = (cardId) => {
  const { courseId } = reduxHooks.useCardCourseRunData(cardId);
  return module.useNetworkRequest(
    (enable) => api.updateEmailSettings({ courseId, enable }),
    { requestKey: RequestKeys.updateEmailSettings },
  );
};

export const useSendConfirmEmail = () => {
  const { emailConfirmation } = useContext(GlobalDataContext);
  const { sendEmailUrl } = emailConfirmation;
  return () => post(sendEmailUrl);
};

export const useCreateCreditRequest = (cardId) => {
  const { providerId } = reduxHooks.useCardCreditData(cardId);
  const { authenticatedUser: { username } } = useContext(SiteContext);
  const { courseId } = reduxHooks.useCardCourseRunData(cardId);
  return () => api.createCreditRequest({ providerId, courseId, username });
};
