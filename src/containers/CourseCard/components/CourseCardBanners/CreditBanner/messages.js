import { defineMessages } from '@openedx/frontend-base';

const messages = defineMessages({
  error: {
    id: 'learner-dash.courseCard.banners.credit.error',
    description: 'Error message for credit transaction with support email link',
    defaultMessage: 'An error occurred with this transaction.  For help, contact {supportEmailLink}.',
  },
  errorNoEmail: {
    id: 'learner-dash.courseCard.banners.credit.errorNoEmail',
    description: 'Error message for credit transaction without support email',
    defaultMessage: 'An error occurred with this transaction.',
  },
});

export default messages;
