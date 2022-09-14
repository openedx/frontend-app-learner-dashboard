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

export default {
  initializeList,
  updateEntitlementEnrollment,
  deleteEntitlementEnrollment,
};
