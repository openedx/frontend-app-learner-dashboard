import { useQueryClient, useMutation } from '@tanstack/react-query';
import { logError } from '@openedx/frontend-base';
import {
  createCreditRequest,
  deleteEntitlementEnrollment,
  sendConfirmEmail,
  unenrollFromCourse,
  updateEmailSettings,
  updateEntitlementEnrollment,
} from '@src/data/services/lms/api';
import { learnerDashboardQueryKeys } from './queryKeys';

interface UpdateEntitlementProps {
  uuid: string,
  courseId: string,
}

interface DeleteEntitlementParams {
  uuid: string,
  isRefundable: boolean,
}

interface UpdateEmailSettingsParams {
  courseId: string,
  enable: boolean,
}

interface CreditParams {
  providerId: string,
  courseId: string,
  username: string,
}

const useUnenrollFromCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: learnerDashboardQueryKeys.unenrollFromCourse(),
    mutationFn: ({ courseId }: { courseId: string }) => unenrollFromCourse({ courseId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: learnerDashboardQueryKeys.initializeBase() });
    },
    onError: (error, variables) => {
      logError(`Failed to unenroll from course ${variables.courseId}:`, error);
    },
  });
};

const useUpdateEntitlementEnrollment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: learnerDashboardQueryKeys.updateEntitlementEnrollment(),
    mutationFn: ({ uuid, courseId }: UpdateEntitlementProps) => updateEntitlementEnrollment({ uuid, courseId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: learnerDashboardQueryKeys.initializeBase() });
    },
    onError: (error, variables) => {
      logError(`Failed to update entitlement enrollment for UUID ${variables.uuid}:`, error);
    },
  });
};

const useDeleteEntitlementEnrollment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: learnerDashboardQueryKeys.deleteEntitlementEnrollment(),
    mutationFn: (params: DeleteEntitlementParams) => deleteEntitlementEnrollment(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: learnerDashboardQueryKeys.initializeBase() });
    },
    onError: (error, variables) => {
      logError(`Failed to delete entitlement enrollment for UUID ${variables.uuid}:`, error);
    },
  });
};

const useUpdateEmailSettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: learnerDashboardQueryKeys.updateEmailSettings(),
    mutationFn: ({ courseId, enable }: UpdateEmailSettingsParams) => updateEmailSettings({ courseId, enable }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: learnerDashboardQueryKeys.initializeBase() });
    },
    onError: (error, variables) => {
      logError(`Failed to update email settings for course ${variables.courseId}:`, error);
    },
  });
};

const useCreateCreditRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: learnerDashboardQueryKeys.createCreditRequest(),
    mutationFn: (props: CreditParams) => createCreditRequest(props),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: learnerDashboardQueryKeys.initializeBase() });
    },
    onError: (error, variables) => {
      logError(`Failed to create credit request for course ${variables.courseId} with provider ${variables.providerId}:`, error);
    },
  });
};

const useSendConfirmEmail = (sendEmailUrl: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: learnerDashboardQueryKeys.sendConfirmEmail(sendEmailUrl),
    mutationFn: () => sendConfirmEmail(sendEmailUrl),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: learnerDashboardQueryKeys.initializeBase() });
    },
    onError: (error) => {
      logError('Failed to send confirmation email:', error);
    },
  });
};

export {
  useUnenrollFromCourse,
  useUpdateEntitlementEnrollment,
  useDeleteEntitlementEnrollment,
  useUpdateEmailSettings,
  useCreateCreditRequest,
  useSendConfirmEmail,
};
