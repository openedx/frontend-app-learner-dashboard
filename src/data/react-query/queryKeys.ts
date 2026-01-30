export const lernerDashboardQueryKeys = {
  all: ['learner-dashboard'] as const,
  initialize: (masqueradedUser?: string | null) => [...lernerDashboardQueryKeys.all, 'initialize', masqueradedUser] as const,
  masqueradingState: () => [...lernerDashboardQueryKeys.all, 'masqueradingState'] as const,
  unenrollFromCourse: () => [...lernerDashboardQueryKeys.all, 'unenrollFromCourse'] as const,
  updateEntitlementEnrollment: () => [...lernerDashboardQueryKeys.all, 'updateEntitlementEnrollment'] as const,
  deleteEntitlementEnrollment: () => [...lernerDashboardQueryKeys.all, 'deleteEntitlementEnrollment'] as const,
  updateEmailSettings: () => [...lernerDashboardQueryKeys.all, 'updateEmailSettings'] as const,
  logShare: () => [...lernerDashboardQueryKeys.all, 'logShare'] as const,
  createCreditRequest: () => [...lernerDashboardQueryKeys.all, 'createCreditRequest'] as const,
  sendConfirmEmail: (sendEmailUrl: string) => [...lernerDashboardQueryKeys.all, 'sendConfirmEmail', sendEmailUrl] as const,
};
