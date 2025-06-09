import { defineMessages } from '@openedx/frontend-base';

const messages = defineMessages({
  loadingSR: {
    id: 'learner-dash.loadingSR',
    description: 'Page loading screen-reader text',
    defaultMessage: 'Loading...',
  },
  errorMessage: {
    id: 'learner-dash.error-page-message',
    defaultMessage: 'If you experience repeated failures, please email support at {supportEmail}',
    description: 'Error page message',
  },
  pageTitle: {
    id: 'learner-dash.title',
    description: 'Page title: Learner Home',
    defaultMessage: 'Learner Home',
  },
});

export default messages;
