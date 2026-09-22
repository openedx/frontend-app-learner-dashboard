import { appId, coursesRole } from '../../../constants';
import { StrictDict } from '../../../utils';

import { getAppConfig, getSiteConfig, resolveRouteByRole } from '@openedx/frontend-base';

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

// static view url
const programsUrl = () => baseAppUrl('/dashboard/programs');

/**
 * Returns the URL for browsing courses: the courses route if an app in the running site
 * provides one, so navigation stays within the SPA, or otherwise the course search URL the
 * LMS reports (`courseSearchUrl`), made absolute.
 */
export const coursesUrl = (courseSearchUrl) => (
  resolveRouteByRole(coursesRole)?.url ?? baseAppUrl(courseSearchUrl)
);

/**
 * Returns the credit purchase URL for a course, or `null` when the site
 * configures neither CREDIT_PURCHASE_URL nor ECOMMERCE_BASE_URL.
 */
export const creditPurchaseUrl = (courseId) => {
  const config = getAppConfig(appId);
  if (config.CREDIT_PURCHASE_URL) {
    return `${config.CREDIT_PURCHASE_URL}/${courseId}/`;
  }
  return config.ECOMMERCE_BASE_URL
    ? `${config.ECOMMERCE_BASE_URL}/credit/checkout/${courseId}/`
    : null;
};
export const creditRequestUrl = (providerId) => `${getApiUrl()}/credit/v1/providers/${providerId}/request/`;

export default StrictDict({
  getApiUrl,
  baseAppUrl,
  courseUnenroll,
  coursesUrl,
  creditPurchaseUrl,
  creditRequestUrl,
  entitlementEnrollment,
  event,
  getInitApiUrl,
  programsUrl,
  updateEmailSettings,
});
