import { StrictDict } from '@src/utils';

export const requestStatuses = StrictDict({
  pending: 'pending',
  approved: 'approved',
  rejected: 'rejected',
});

export default { requestStatuses };
