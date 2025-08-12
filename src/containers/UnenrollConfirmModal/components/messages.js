/* eslint-disable quotes */
import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  confirmHeader: {
    id: 'learner-dash.unenrollConfirm.confirm.header',
    description: 'Header for confirm unenroll modal',
    defaultMessage: 'Confirm Unenrollment',
  },
  confirmText: {
    id: 'learner-dash.unenrollConfirm.confirm.text',
    description: 'Text for confirm unenroll modal',
    defaultMessage: 'Are you sure you want to unenroll from the course {courseTitle} ?',
  },
  confirmCancel: {
    id: 'learner-dash.unenrollConfirm.confirm.cancel',
    description: 'Cancel action for confirm unenroll modal',
    defaultMessage: 'Cancel',
  },
  confirmUnenroll: {
    id: 'learner-dash.unenrollConfirm.confirm.unenroll',
    description: 'Confirm action for confirm unenroll modal',
    defaultMessage: 'Unenroll',
  },
  reasonHeading: {
    id: 'learner-dash.unenrollConfirm.confirm.reason.heading',
    description: 'Heading for unenroll reason modal',
    defaultMessage: 'Why are you unenrolling?',
  },
  reasonSkip: {
    id: 'learner-dash.unenrollConfirm.confirm.reason.skip',
    description: 'Skip action for unenroll reason modal',
    defaultMessage: 'Skip survey',
  },
  reasonSubmit: {
    id: 'learner-dash.unenrollConfirm.confirm.reason.submit',
    description: 'Submit action for unenroll reason modal',
    defaultMessage: 'Unenroll',
  },
  finishHeading: {
    id: 'learner-dash.unenrollConfirm.confirm.finish.heading',
    description: 'Heading for unenroll finish modal',
    defaultMessage: 'Unenrollment Successful',
  },
  finishText: {
    id: 'learner-dash.unenrollConfirm.confirm.finish.text',
    description: 'Text for unenroll finish modal',
    defaultMessage: 'You have been unenrolled from the course {courseTitle}',
  },
  finishReturn: {
    id: 'learner-dash.unenrollConfirm.confirm.finish.return',
    description: 'Return action for unenroll finish modal',
    defaultMessage: 'Ok',
  },
});

export default messages;
