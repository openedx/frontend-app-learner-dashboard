import {
  client,
  get,
  post,
  stringifyUrl,
} from './utils';
import {
  apiKeys,
  unenrollmentAction,
  enableEmailsAction,
} from './constants';
import urls from './urls';

/*********************************************************************************
 * GET Actions
 *********************************************************************************/
const initializeList = ({ user } = {}) => get(stringifyUrl(
  urls.init,
  { [apiKeys.user]: user },
));

const updateEntitlementEnrollment = ({ uuid, courseId }) => post(stringifyUrl(
  urls.entitlementEnrollment(uuid),
  { [apiKeys.courseRunId]: courseId },
));

const deleteEntitlementEnrollment = ({ uuid }) => client().delete(stringifyUrl(
  urls.entitlementEnrollment(uuid),
  { [apiKeys.courseRunId]: null },
));

const updateEmailSettings = ({ courseId, enable }) => post(
  stringifyUrl(urls.updateEmailSettings),
  { [apiKeys.courseId]: courseId, ...(enable && enableEmailsAction) },
);

const unenrollFromCourse = ({ courseId }) => post(stringifyUrl(urls.courseUnenroll), {
  [apiKeys.courseId]: courseId,
  ...unenrollmentAction,
});

export default {
  initializeList,
  unenrollFromCourse,
  updateEmailSettings,
  updateEntitlementEnrollment,
  deleteEntitlementEnrollment,
};
