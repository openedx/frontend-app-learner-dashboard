import { StrictDict } from 'utils';
import { configuration } from 'config';

const baseUrl = `${configuration.LMS_BASE_URL}`;

const api = `${baseUrl}/api`;

// const init = `${api}learner_home/mock/init`; // mock endpoint for testing
const init = `${api}/learner_home/init`;

const courseUnenroll = `${baseUrl}/change_enrollment`;
const updateEmailSettings = `${api}/change_email_settings`;
const entitlementEnrollment = (uuid) => `${api}/entitlements/v1/entitlements/${uuid}/enrollments`;

const isAbsoluteUrl = (url) => url.startsWith('http://') || url.startsWith('https://');

export const baseAppUrl = (url) => (isAbsoluteUrl(url) ? url : baseUrl + url);
export const learningMfeUrl = (url) => (isAbsoluteUrl(url) ? url : configuration.LEARNING_MICROFRONTEND_URL + url);

// static view url
const programsUrl = baseAppUrl('/dashboard/programs');

export default StrictDict({
  api,
  init,
  courseUnenroll,
  updateEmailSettings,
  entitlementEnrollment,
  baseAppUrl,
  learningMfeUrl,
  programsUrl,
});
