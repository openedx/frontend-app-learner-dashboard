import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient, getAuthenticatedUser } from '@edx/frontend-platform/auth';
import { logError, logInfo } from '@edx/frontend-platform/logging';
import messages from './messages';

export const noticesUrl = `${getConfig().LMS_BASE_URL}/notices/api/v1/unacknowledged`;

// Export the error message for backward compatibility with tests
export const error404Message = messages.error404Message.defaultMessage;

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
