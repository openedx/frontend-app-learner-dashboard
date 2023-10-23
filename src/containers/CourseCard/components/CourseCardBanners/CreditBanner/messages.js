import { StrictDict } from 'utils';

export const messages = StrictDict({
  error: {
    id: 'learner-dash.courseCard.banners.credit.error',
    description: '',
    defaultMessage: 'An error occurred with this transaction.  For help, contact {supportEmailLink}.',
  },
  errorNoEmail: {
    id: 'learner-dash.courseCard.banners.credit.errorNoEmail',
    description: '',
    defaultMessage: 'An error occurred with this transaction.',
  },
});

export default messages;
