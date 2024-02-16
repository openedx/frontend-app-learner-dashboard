/* eslint-disable quotes */
import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  changeOrLeaveHeader: {
    id: 'learner-dash.selectSession.changeOrLeaveHeader',
    description: 'Header for session that allow leave option',
    defaultMessage: 'Change or leave session?',
  },
  selectSessionHeader: {
    id: 'learner-dash.selectSession.selectSessionHeader',
    description: 'Header for unfulfilled entitlement',
    defaultMessage: 'Select a session',
  },
  changeOrLeaveHint: {
    id: 'learner-dash.selectSession.changeOrLeaveHint',
    description: 'Hint for session that allow leave option',
    defaultMessage: 'When you change to a different session any course progress or grades from your current session will be lost.',
  },
  selectSessionHint: {
    id: 'learner-dash.selectSession.selectSessionHint',
    description: 'Hint for session that does not allow leave option',
    defaultMessage: 'Remember, if you change your mind you have 2 weeks to unenroll and select a different session.',
  },
  leaveSessionOption: {
    id: 'learner-dash.selectSession.leaveSessionOption',
    description: 'Radio option for leave session',
    defaultMessage: 'Leave session',
  },
  nevermind: {
    id: 'learner-dash.selectSession.nevermind',
    description: 'Cancel action for select session modal',
    defaultMessage: 'Never mind',
  },
  confirmSession: {
    id: 'learner-dash.selectSession.confirmSession',
    description: 'Confirm action for select session modal',
    defaultMessage: 'Confirm Session',
  },
});

export default messages;
