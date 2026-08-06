export const learnerDashboardQueryKeys = {
  all: ['learner-dashboard'] as const,
  initialize: (masqueradedUser?: string | null) => [...learnerDashboardQueryKeys.all, 'initialize', masqueradedUser] as const,
  unenrollFromCourse: () => [...learnerDashboardQueryKeys.all, 'unenrollFromCourse'] as const,
  updateEntitlementEnrollment: () => [...learnerDashboardQueryKeys.all, 'updateEntitlementEnrollment'] as const,
  deleteEntitlementEnrollment: () => [...learnerDashboardQueryKeys.all, 'deleteEntitlementEnrollment'] as const,
  updateEmailSettings: () => [...learnerDashboardQueryKeys.all, 'updateEmailSettings'] as const,
  createCreditRequest: () => [...learnerDashboardQueryKeys.all, 'createCreditRequest'] as const,
  sendConfirmEmail: (sendEmailUrl: string) => [...learnerDashboardQueryKeys.all, 'sendConfirmEmail', sendEmailUrl] as const,
  courseCompletion: () => [...learnerDashboardQueryKeys.all, 'courseCompletion'] as const,
  courseAssignmentsCardInfo: (courseIds: string[]) => [
    ...learnerDashboardQueryKeys.all,
    'courseAssignmentsCardInfo',
    [...courseIds].sort().join(','),
  ] as const,
  announcements: () => [...learnerDashboardQueryKeys.all, 'announcements'] as const,
  markAnnouncementRead: () => [...learnerDashboardQueryKeys.all, 'markAnnouncementRead'] as const,
};
