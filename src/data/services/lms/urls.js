import { appId } from '../../../constants';
import { StrictDict } from '../../../utils';

import { getAppConfig, getSiteConfig } from '@openedx/frontend-base';

export const getEcommerceUrl = () => getAppConfig(appId).ECOMMERCE_BASE_URL;

const getBaseUrl = () => getSiteConfig().lmsBaseUrl;

export const getApiUrl = () => (`${getSiteConfig().lmsBaseUrl}/api`);

const getInitApiUrl = () => (`${getApiUrl()}/learner_home/init`);

const event = () => `${getBaseUrl()}/event`;
const courseUnenroll = () => `${getBaseUrl()}/change_enrollment`;
const updateEmailSettings = () => `${getApiUrl()}/change_email_settings`;
const entitlementEnrollment = (uuid) => `${getApiUrl()}/entitlements/v1/entitlements/${uuid}/enrollments`;

// if url is null or absolute, return it as is
export const updateUrl = (base, url) => ((url == null || url.startsWith('http://') || url.startsWith('https://')) ? url : `${base}${url}`);

export const baseAppUrl = (url) => updateUrl(getBaseUrl(), url);
export const learningMfeUrl = (url) => updateUrl(getAppConfig(appId).LEARNING_BASE_URL, url);

// static view url
const programsUrl = () => baseAppUrl('/dashboard/programs');

export const creditPurchaseUrl = (courseId) => `${getEcommerceUrl()}/credit/checkout/${courseId}/`;
export const creditRequestUrl = (providerId) => `${getApiUrl()}/credit/v1/providers/${providerId}/request/`;

export default StrictDict({
  getApiUrl,
  baseAppUrl,
  courseUnenroll,
  creditPurchaseUrl,
  creditRequestUrl,
  entitlementEnrollment,
  event,
  getInitApiUrl,
  learningMfeUrl,
  programsUrl,
  updateEmailSettings,
});
