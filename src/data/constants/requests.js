import { StrictDict } from 'utils';

export const RequestStates = StrictDict({
  inactive: 'inactive',
  pending: 'pending',
  completed: 'completed',
  failed: 'failed',
});

export const RequestKeys = StrictDict({
  initialize: 'initialize',
  refreshList: 'refreshList',
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
