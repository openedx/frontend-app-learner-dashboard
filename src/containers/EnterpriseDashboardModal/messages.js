import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  enterpriseDialogHeader: {
    id: 'leanerDashboard.enterpriseDialogHeader',
    defaultMessage: 'You have access to the {label} dashboard',
    description: 'title for enterpise dashboard dialog',
  },
  enterpriseDialogBody: {
    id: 'leanerDashboard.enterpriseDialogBody',
    defaultMessage: 'To access the courses available to you through {label}, visit the {label} dashboard now.',
    description: 'Body text for enterpise dashboard dialog',
  },
  enterpriseDialogDismissButton: {
    id: 'leanerDashboard.enterpriseDialogDismissButton',
    defaultMessage: 'Dismiss',
    description: 'Dismiss button to cancel visiting dashboard',
  },
  enterpriseDialogConfirmButton: {
    id: 'leanerDashboard.enterpriseDialogConfirmButton',
    defaultMessage: 'Go to dashboard',
    description: 'Confirm button to go to the dashboard url',
  },
});

export default messages;
