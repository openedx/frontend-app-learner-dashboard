import {
  useQuery, useQueryClient, useMutation,
} from '@tanstack/react-query';
import { logError } from '@edx/frontend-platform/logging';
import { useEffect } from 'react';
import { useMasquerade } from 'data/context/MasqueradeProvider';
import { useBackedData } from 'data/context/BackedDataProvider';
import { lernerDashboardQueryKeys } from './queryKeys';
import {
  createCreditRequest,
  deleteEntitlementEnrollment,
  initializeList,
  logShare,
  sendConfirmEmail,
  unenrollFromCourse,
  updateEmailSettings,
  updateEntitlementEnrollment,
} from './api';

const useInitializeLearnerHome = () => {
  const { masqueradeUser } = useMasquerade();
  const { backUpData, setBackUpData } = useBackedData();

  const query = useQuery({
    queryKey: lernerDashboardQueryKeys.initialize(masqueradeUser),
    queryFn: async () => initializeList(masqueradeUser),
    retry: false,
    retryOnMount: !masqueradeUser,
    refetchOnMount: !masqueradeUser,
  });

  useEffect(() => {
    if (!masqueradeUser && query.data) {
      setBackUpData(query.data);
    }
  }, [masqueradeUser, query.data, setBackUpData]);

  const data = masqueradeUser && !query.isError ? query.data : backUpData;

  return { ...query, data };
};

const useUnenrollFromCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: lernerDashboardQueryKeys.unenrollFromCourse(),
    mutationFn: ({ courseId }: { courseId: string }) => unenrollFromCourse({ courseId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: lernerDashboardQueryKeys.initialize() });
    },
    onError: (error, variables) => {
      logError(`Failed to unenroll from course ${variables.courseId}:`, error);
    },
  });
};

const useUpdateEntitlementEnrollment = () => {
  const queryClient = useQueryClient();

  type UpdateEntitlementProps = {
    uuid: string;
    courseId: string;
  };

  return useMutation({
    mutationKey: lernerDashboardQueryKeys.updateEntitlementEnrollment(),
    mutationFn: ({ uuid, courseId }: UpdateEntitlementProps) => updateEntitlementEnrollment({ uuid, courseId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: lernerDashboardQueryKeys.initialize() });
    },
    onError: (error, variables) => {
      logError(`Failed to update entitlement enrollment for UUID ${variables.uuid}:`, error);
    },
  });
};

const useDeleteEntitlementEnrollment = () => {
  const queryClient = useQueryClient();

  type DeleteEntitlParams = {
    uuid: string;
    isRefundable: boolean;
  };

  return useMutation({
    mutationKey: lernerDashboardQueryKeys.deleteEntitlementEnrollment(),
    mutationFn: ({ uuid, isRefundable }: DeleteEntitlParams) => deleteEntitlementEnrollment({ uuid, isRefundable }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: lernerDashboardQueryKeys.initialize() });
    },
    onError: (error, variables) => {
      logError(`Failed to delete entitlement enrollment for UUID ${variables.uuid}:`, error);
    },
  });
};

const useUpdateEmailSettings = () => {
  const queryClient = useQueryClient();
  type UpdateEmailSettingsParams = {
    courseId: string;
    enable: boolean;
  };

  return useMutation({
    mutationKey: lernerDashboardQueryKeys.updateEmailSettings(),
    mutationFn: ({ courseId, enable }: UpdateEmailSettingsParams) => updateEmailSettings({ courseId, enable }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: lernerDashboardQueryKeys.initialize() });
    },
    onError: (error, variables) => {
      logError(`Failed to update email settings for course ${variables.courseId}:`, error);
    },
  });
};

type LogShareParams = {
  courseId: string;
  site: string;
};

const useLogShare = () => useMutation({
  mutationKey: lernerDashboardQueryKeys.logShare(),
  mutationFn: ({ courseId, site }: LogShareParams) => logShare({ courseId, site }),
  onError: (error, variables) => {
    logError(`Failed to log share event for course ${variables.courseId} on ${variables.site}:`, error);
  },
});

const useCreateCreditRequest = () => {
  const queryClient = useQueryClient();
  type CreditParams = {
    providerId: string;
    courseId: string;
    username: string;
  };
  return useMutation({
    mutationKey: lernerDashboardQueryKeys.createCreditRequest(),
    mutationFn: (props: CreditParams) => createCreditRequest(props),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: lernerDashboardQueryKeys.initialize() });
    },
    onError: (error, variables) => {
      logError(`Failed to create credit request for course ${variables.courseId} with provider ${variables.providerId}:`, error);
    },
  });
};

const useSendConfirmEmail = (sendEmailUrl: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: lernerDashboardQueryKeys.sendConfirmEmail(sendEmailUrl),
    mutationFn: () => sendConfirmEmail(sendEmailUrl),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: lernerDashboardQueryKeys.initialize() });
    },
    onError: (error) => {
      logError('Failed to send confirmation email:', error);
    },
  });
};

export {
  useInitializeLearnerHome,
  useUnenrollFromCourse,
  useUpdateEntitlementEnrollment,
  useDeleteEntitlementEnrollment,
  useUpdateEmailSettings,
  useLogShare,
  useCreateCreditRequest,
  useSendConfirmEmail,
};
