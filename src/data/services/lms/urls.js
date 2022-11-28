import { StrictDict } from 'utils';
import { configuration } from 'config';

const baseUrl = `${configuration.LMS_BASE_URL}`;

const api = `${baseUrl}/api`;

// const init = `${api}learner_home/mock/init`; // mock endpoint for testing
const init = `${api}/learner_home/init`;

const event = `${baseUrl}/event`;
const courseUnenroll = `${baseUrl}/change_enrollment`;
const updateEmailSettings = `${api}/change_email_settings`;
const entitlementEnrollment = (uuid) => `${api}/entitlements/v1/entitlements/${uuid}/enrollments`;

// if url is null or absolute, return it as is
const updateUrl = (base, url) => ((url == null || url.startsWith('http://') || url.startsWith('https://')) ? url : `${base}${url}`);

export const baseAppUrl = (url) => updateUrl(baseUrl, url);
export const learningMfeUrl = (url) => updateUrl(configuration.LEARNING_BASE_URL, url);

// static view url
const programsUrl = baseAppUrl('/dashboard/programs');

export default StrictDict({
  api,
  baseAppUrl,
  courseUnenroll,
  entitlementEnrollment,
  event,
  init,
  learningMfeUrl,
  programsUrl,
  updateEmailSettings,
});
