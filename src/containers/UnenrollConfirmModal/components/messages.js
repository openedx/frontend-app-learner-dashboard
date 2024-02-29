/* eslint-disable quotes */
import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  confirmHeader: {
    id: 'learner-dash.unenrollConfirm.confirm.header',
    description: 'Header for confirm unenroll modal',
    defaultMessage: 'Unenroll from course?',
  },
  confirmCancel: {
    id: 'learner-dash.unenrollConfirm.confirm.cancel',
    description: 'Cancel action for confirm unenroll modal',
    defaultMessage: 'Never mind',
  },
  confirmUnenroll: {
    id: 'learner-dash.unenrollConfirm.confirm.unenroll',
    description: 'Confirm action for confirm unenroll modal',
    defaultMessage: 'Unenroll',
  },
  reasonHeading: {
    id: 'learner-dash.unenrollConfirm.confirm.reason.heading',
    description: 'Heading for unenroll reason modal',
    defaultMessage: `What's your main reason for unenrolling?`,
  },
  reasonSkip: {
    id: 'learner-dash.unenrollConfirm.confirm.reason.skip',
    description: 'Skip action for unenroll reason modal',
    defaultMessage: 'Skip survey',
  },
  reasonSubmit: {
    id: 'learner-dash.unenrollConfirm.confirm.reason.submit',
    description: 'Submit action for unenroll reason modal',
    defaultMessage: 'Submit reason',
  },
  finishHeading: {
    id: 'learner-dash.unenrollConfirm.confirm.finish.heading',
    description: 'Heading for unenroll finish modal',
    defaultMessage: 'You are unenrolled',
  },
  finishThanksText: {
    id: 'learner-dash.unenrollConfirm.confirm.finish.thanks-text',
    description: 'Thank you message on unenroll modal for providing a reason',
    defaultMessage: 'Thank you for sharing your reason for unenrolling.  ',
  },
  finishText: {
    id: 'learner-dash.unenrollConfirm.confirm.finish.text',
    description: 'Text for unenroll finish modal',
    defaultMessage: 'This course will be removed from your dashboard.',
  },
  finishReturn: {
    id: 'learner-dash.unenrollConfirm.confirm.finish.return',
    description: 'Return action for unenroll finish modal',
    defaultMessage: 'Return to dashboard',
  },
});

export default messages;
