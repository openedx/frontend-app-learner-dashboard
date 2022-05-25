import { StrictDict } from 'utils';

export const RequestStates = StrictDict({
  inactive: 'inactive',
  pending: 'pending',
  completed: 'completed',
  failed: 'failed',
});

export const RequestKeys = StrictDict({
  batchUnlock: 'batchUnlock',
  downloadFiles: 'downloadFiles',
  fetchSubmission: 'fetchSubmission',
  fetchSubmissionStatus: 'fetchSubmissionStatus',
  initialize: 'initialize',
  prefetchNext: 'prefetchNext',
  prefetchPrev: 'prefetchPrev',
  setLock: 'setLock',
  submitGrade: 'submitGrade',
});

export const ErrorCodes = StrictDict({
  missingParam: 'ERR_MISSING_PARAM',
});

export const ErrorStatuses = StrictDict({
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  conflict: 409,
  serverError: 500,
});
