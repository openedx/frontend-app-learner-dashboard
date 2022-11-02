import { StrictDict } from 'utils';

export const apiKeys = StrictDict({
  receiveEmails: 'receive_emails',
  enrollmentAction: 'enrollment_action',
  courseRunId: 'course_run_id',
  courseId: 'course_id',
  user: 'user',
  isRefund: 'is_refund',
});

export const apiValues = StrictDict({
  on: 'on',
  unenroll: 'unenroll',
});

export const unenrollmentAction = { [apiKeys.enrollmentAction]: apiValues.unenroll };
export const enableEmailsAction = { [apiKeys.receiveEmails]: apiValues.on };
