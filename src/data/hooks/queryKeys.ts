export const learnerDashboardQueryKeys = {
  all: ['learner-dashboard'] as const,
  initialize: (masqueradedUser?: string | null) => [...learnerDashboardQueryKeys.all, 'initialize', masqueradedUser] as const,
  unenrollFromCourse: () => [...learnerDashboardQueryKeys.all, 'unenrollFromCourse'] as const,
  updateEntitlementEnrollment: () => [...learnerDashboardQueryKeys.all, 'updateEntitlementEnrollment'] as const,
  deleteEntitlementEnrollment: () => [...learnerDashboardQueryKeys.all, 'deleteEntitlementEnrollment'] as const,
  updateEmailSettings: () => [...learnerDashboardQueryKeys.all, 'updateEmailSettings'] as const,
  logShare: () => [...learnerDashboardQueryKeys.all, 'logShare'] as const,
  createCreditRequest: () => [...learnerDashboardQueryKeys.all, 'createCreditRequest'] as const,
  sendConfirmEmail: (sendEmailUrl: string) => [...learnerDashboardQueryKeys.all, 'sendConfirmEmail', sendEmailUrl] as const,
};
