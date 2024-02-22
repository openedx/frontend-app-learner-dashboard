/* eslint-disable quotes */
import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  header: {
    id: 'learner-dash.emailSettings.header',
    description: 'Header for email settings modal',
    defaultMessage: 'Receive course emails?',
  },
  emailsOff: {
    id: 'learner-dash.emailSettings.emailsOff',
    description: 'Toggle text for email settings modal when email is disabled',
    defaultMessage: 'Course emails are off',
  },
  emailsOn: {
    id: 'learner-dash.emailSettings.emailsOn',
    description: 'Toggle text for email settings modal when email is enabled',
    defaultMessage: 'Course emails are on',
  },
  description: {
    id: 'learner-dash.emailSettings.description',
    description: 'Description for email settings modal',
    defaultMessage: 'Course emails include important information about your course from instructors.',
  },
  nevermind: {
    id: 'learner-dash.emailSettings.nevermind',
    description: 'Cancel action for email settings modal',
    defaultMessage: 'Never mind',
  },
  save: {
    id: 'learner-dash.emailSettings.save',
    description: 'Save action for email settings modal',
    defaultMessage: 'Save settings',
  },

});

export default messages;
