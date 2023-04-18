import { StrictDict } from 'utils';

import { getConfig } from '@edx/frontend-platform';

export const ecommerceUrl = `${getConfig.ECOMMERCE_BASE_URL}`;

const getBaseUrl = () => (`${getConfig().LMS_BASE_URL}`);

export const getApi = () => (`${getConfig().LMS_BASE_URL}/api`);

// const getInitApi = `${getApi()}learner_home/mock/init`; // mock endpoint for testing
const getInitApi = () => (`${getApi()}/learner_home/init`);

const event = `${getBaseUrl()}/event`;
const courseUnenroll = `${getBaseUrl()}/change_enrollment`;
const updateEmailSettings = `${getApi()}/change_email_settings`;
const entitlementEnrollment = (uuid) => `${getApi()}/entitlements/v1/entitlements/${uuid}/enrollments`;

// if url is null or absolute, return it as is
const updateUrl = (base, url) => ((url == null || url.startsWith('http://') || url.startsWith('https://')) ? url : `${base}${url}`);

export const baseAppUrl = (url) => updateUrl(getBaseUrl(), url);
export const learningMfeUrl = (url) => updateUrl(getConfig().LEARNING_BASE_URL, url);

// static view url
const programsUrl = baseAppUrl('/dashboard/programs');

export const creditPurchaseUrl = (courseId) => `${getConfig().ECOMMERCE_PUBLIC_URL_ROOT}/credit/checkout/${courseId}/`;
export const creditRequestUrl = (providerId) => `${getApi()}/credit/v1/providers/${providerId}/request/`;

export default StrictDict({
  getApi,
  baseAppUrl,
  courseUnenroll,
  creditPurchaseUrl,
  creditRequestUrl,
  entitlementEnrollment,
  event,
  getInitApi,
  learningMfeUrl,
  programsUrl,
  updateEmailSettings,
});
