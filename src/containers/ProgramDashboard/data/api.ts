import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';

export const fetchProgramsListData = async () => {
  const url = `${getConfig().LMS_BASE_URL}/api/dashboard/v0/programs/`;
  const { data } = await getAuthenticatedHttpClient().get(url);
  return data;
};
