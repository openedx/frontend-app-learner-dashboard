import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  error404Message: {
    id: 'learner-dash.notices.error404Message',
    defaultMessage: 'This probably happened because the notices plugin is not installed on platform.',
    description: 'Error message when notices API returns 404',
  },
});

export default messages;
