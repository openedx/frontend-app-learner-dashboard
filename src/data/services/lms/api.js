import eventKeys from 'data/services/segment/constants';
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
export const initializeList = ({ user } = {}) => get(
  stringifyUrl(urls.init, { [apiKeys.user]: user }),
);

export const updateEntitlementEnrollment = ({ uuid, courseId }) => post(
  urls.entitlementEnrollment(uuid),
  { [apiKeys.courseRunId]: courseId },
);

export const deleteEntitlementEnrollment = ({ uuid, isRefundable }) => client().delete(
  stringifyUrl(urls.entitlementEnrollment(uuid), { [apiKeys.isRefund]: isRefundable }),
);

export const updateEmailSettings = ({ courseId, enable }) => post(
  urls.updateEmailSettings,
  { [apiKeys.courseId]: courseId, ...(enable && enableEmailsAction) },
);

export const unenrollFromCourse = ({ courseId }) => post(
  urls.courseUnenroll,
  { [apiKeys.courseId]: courseId, ...unenrollmentAction },
);

export const logEvent = ({ eventKey, data, courseId }) => post(urls.event, {
  data,
  courserun_key: courseId,
  event_type: eventKey,
  page: window.location.href,
  event: JSON.stringify(data),
});

export const logUpgrade = ({ courseId }) => logEvent({
  eventKey: eventKeys.upgradeButtonClickedEnrollment,
  courseId,
  data: { location: 'learner-dashboard' },
});

export const logShare = ({ courseId, site }) => logEvent({
  eventKey: eventKeys.shareClicked,
  courseId,
  data: {
    course_id: courseId,
    social_media_site: site,
    location: 'dashboard',
  },
});

export default {
  initializeList,
  unenrollFromCourse,
  updateEmailSettings,
  updateEntitlementEnrollment,
  deleteEntitlementEnrollment,
  logUpgrade,
  logShare,
};
