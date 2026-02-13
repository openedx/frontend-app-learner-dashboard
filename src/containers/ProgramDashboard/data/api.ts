import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { getConfig } from '@edx/frontend-platform';

export async function getProgramsListData() {
  const url = `${getConfig().LMS_BASE_URL}/api/dashboard/v0/programs/`;
  const { data } = await getAuthenticatedHttpClient().get(url);
  return data;
}
