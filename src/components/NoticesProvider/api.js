import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient, getAuthenticatedUser } from '@edx/frontend-platform/auth';
import { logError, logInfo } from '@edx/frontend-platform/logging';

export const noticesUrl = `${getConfig().LMS_BASE_URL}/notices/api/v1/unacknowledged`;
export const error404Message = 'This probably happened because the notices plugin is not installed on platform.';

export const getNotices = ({ onLoad }) => {
  const authenticatedUser = getAuthenticatedUser();

  const handleError = async (e) => {
    // Error probably means that notices is not installed, which is fine.
    const { customAttributes: { httpErrorStatus } } = e;
    if (httpErrorStatus === 404) {
      logInfo(`${e}. ${error404Message}`);
    } else {
      logError(e);
    }
  };
  if (authenticatedUser) {
    return getAuthenticatedHttpClient().get(noticesUrl, {}).then(onLoad).catch(handleError);
  }
  return null;
};

export default { getNotices };
