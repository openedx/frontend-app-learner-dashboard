import {
  appId, courseOutlineRole, courseProgressRole, coursesRole, coursewareRole,
} from '../../../constants';
import { StrictDict } from '../../../utils';

import {
  getAppConfig, getBasename, getSiteConfig, resolveRouteByRole,
} from '@openedx/frontend-base';

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

// The path, in this site, of the route an app provides for a course `role`: null when no app
// does, or when the route needs more than the course ID.
const courseRoutePath = (role, courseId) => {
  if (!courseId) {
    return null;
  }
  try {
    const route = resolveRouteByRole(role, { courseId });
    return route?.isInternal ? route.url : null;
  } catch {
    return null;
  }
};

const parseUrl = (url) => {
  try {
    return new URL(baseAppUrl(url));
  } catch {
    return null;
  }
};

const comparablePath = (path) => {
  const collapsed = path.replace(/\/+/g, '/').replace(/\/$/, '');
  try {
    return decodeURIComponent(collapsed);
  } catch {
    return collapsed;
  }
};

// `path` (a path in this site) when the LMS's `url` already leads there, so that react-router can
// follow it without a page load.  Otherwise null: the LMS may point a course somewhere else on
// purpose.
const inSitePath = (url, path) => {
  const target = path && url ? parseUrl(url) : null;
  const leadsToPath = target
    && target.origin === global.location.origin
    && comparablePath(target.pathname) === comparablePath(`${getBasename() ?? ''}/${path}`);
  return leadsToPath ? `${path}${target.search}${target.hash}` : null;
};

/**
 * Returns the URL of a course's home page: the path of the course outline route when an app in
 * the running site provides it and the LMS's `homeUrl` leads there, so navigation stays within
 * the SPA, or otherwise `homeUrl` as the LMS reports it.
 */
export const courseHomeUrl = (courseId, homeUrl) => (
  inSitePath(homeUrl, courseRoutePath(courseOutlineRole, courseId)) ?? homeUrl
);

/**
 * Returns the URL of a course's progress page, the same way as `courseHomeUrl`, except that the
 * LMS's `progressUrl` is made absolute.
 */
export const courseProgressUrl = (courseId, progressUrl) => (
  inSitePath(progressUrl, courseRoutePath(courseProgressRole, courseId)) ?? baseAppUrl(progressUrl)
);

/**
 * Returns the URL to resume a course at.  The LMS reports a `jump_to` URL of its own, which
 * redirects to the courseware at the learner's last completed block.  When an app in the running
 * site provides the courseware route, link to the course there instead, so navigation stays
 * within the SPA: with no unit in the path, the courseware resumes from that same block.  Any
 * other `resumeUrl` is returned as the LMS reports it, made absolute.
 */
export const courseResumeUrl = (courseId, resumeUrl) => {
  const path = courseRoutePath(coursewareRole, courseId);
  const target = path && resumeUrl ? parseUrl(resumeUrl) : null;
  const isLmsJumpTo = target
    && target.origin === new URL(getBaseUrl()).origin
    && comparablePath(target.pathname).startsWith(`/courses/${courseId}/jump_to/`);
  return isLmsJumpTo ? path : baseAppUrl(resumeUrl);
};

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
  courseHomeUrl,
  courseProgressUrl,
  courseResumeUrl,
  coursesUrl,
  creditPurchaseUrl,
  creditRequestUrl,
  entitlementEnrollment,
  event,
  getInitApiUrl,
  programsUrl,
  updateEmailSettings,
});
