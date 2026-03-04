const BASE_KEY = ['learner-dashboard'] as const;

export const learnerDashboardQueryKeys = {
  all: BASE_KEY,
  initializeBase: () => [...BASE_KEY, 'initialize'] as const,
  initialize: (masqueradedUser?: string | null) => [...BASE_KEY, 'initialize', masqueradedUser] as const,
};

export const learnerDashboardMutationKeys = {
  unenrollFromCourse: () => [...BASE_KEY, 'unenrollFromCourse'] as const,
  updateEntitlementEnrollment: () => [...BASE_KEY, 'updateEntitlementEnrollment'] as const,
  deleteEntitlementEnrollment: () => [...BASE_KEY, 'deleteEntitlementEnrollment'] as const,
  updateEmailSettings: () => [...BASE_KEY, 'updateEmailSettings'] as const,
  createCreditRequest: () => [...BASE_KEY, 'createCreditRequest'] as const,
  sendConfirmEmail: (sendEmailUrl: string) => [...BASE_KEY, 'sendConfirmEmail', sendEmailUrl] as const,
};
