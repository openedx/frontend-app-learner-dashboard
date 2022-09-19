import { handleEvent } from 'data/services/segment/utils';
import { eventNames } from 'data/services/segment/constants';
import {
  client,
  get,
  post,
  stringifyUrl,
} from './utils';
import urls from './urls';

/*********************************************************************************
 * GET Actions
 *********************************************************************************/
const initializeList = () => get(urls.init).then(({ data }) => data);

const updateEntitlementEnrollment = ({ uuid, courseId }) => post(stringifyUrl(
  urls.entitlementEnrollment(uuid),
  { course_run_id: courseId },
));

const deleteEntitlementEnrollment = ({ uuid }) => client().delete(stringifyUrl(
  urls.entitlementEnrollment(uuid),
  { course_run_id: null },
));

const updateEmailSettings = ({ courseId, enable }) => post(stringifyUrl(
  urls.updateEmailSettings,
  { course_id: courseId, ...(enable && { receive_emails: 'on' }) },
));

const unenrollFromCourse = ({ courseId }) => post(stringifyUrl(
  urls.unenrollFromCourse,
  { course_id: courseId, enrollment_action: 'unenroll' },
));

export default {
  initializeList,
  unenrollFromCourse,
  updateEmailSettings,
  updateEntitlementEnrollment,
  deleteEntitlementEnrollment,
};
