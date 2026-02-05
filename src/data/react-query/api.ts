import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { apiKeys, enableEmailsAction, unenrollmentAction } from 'data/services/lms/constants';
import urls from 'data/services/lms/urls';
import { stringifyUrl } from 'data/services/lms/utils';
import eventNames from 'tracking/constants';

const initializeList = async (user) => {
  const { data } = await getAuthenticatedHttpClient().get(
    stringifyUrl(urls.getInitApiUrl(), { [apiKeys.user]: user }),
  );
  return data;
};

const unenrollFromCourse = async ({ courseId }) => {
  const url = urls.courseUnenroll();
  const formData = new FormData();
  formData.append(apiKeys.courseId, courseId);
  Object.entries(unenrollmentAction).forEach(([key, value]) => {
    formData.append(key, value);
  });
  const response = await getAuthenticatedHttpClient().post(url, formData);
  return response;
};

const updateEntitlementEnrollment = async ({ uuid, courseId }) => {
  const url = urls.entitlementEnrollment(uuid);
  const content = { [apiKeys.courseRunId]: courseId };
  const response = await getAuthenticatedHttpClient().post(url, content);
  return response;
};

const deleteEntitlementEnrollment = async ({ uuid, isRefundable }) => {
  const url = stringifyUrl(
    urls.entitlementEnrollment(uuid),
    { [apiKeys.isRefund]: isRefundable },
  );
  const response = await getAuthenticatedHttpClient().delete(url);
  return response;
};

const updateEmailSettings = async ({ courseId, enable }) => {
  const url = urls.updateEmailSettings();
  const content = { [apiKeys.courseId]: courseId, ...(enable && enableEmailsAction) };
  const response = await getAuthenticatedHttpClient().post(url, content);
  return response;
};

const logEvent = async ({ eventName, data, courseId }) => {
  const url = urls.event();
  const content = {
    courserun_key: courseId,
    event_type: eventName,
    page: window.location.href,
    event: JSON.stringify(data),
  };
  const response = await getAuthenticatedHttpClient().post(url, content);
  return response;
};

const logShare = async ({ courseId, site }) => {
  const eventData = {
    eventName: eventNames.shareClicked,
    courseId,
    data: {
      course_id: courseId,
      social_media_site: site,
      location: 'dashboard',
    },
  };
  return logEvent(eventData);
};

const createCreditRequest = async ({ providerId, courseId, username }) => {
  const url = urls.creditRequestUrl(providerId);
  const content = { course_key: courseId, username };
  const response = await getAuthenticatedHttpClient().post(url, content);
  return response;
};

const sendConfirmEmail = async (sendEmailUrl: string) => {
  const response = await getAuthenticatedHttpClient().post(sendEmailUrl);
  return response;
};

export {
  initializeList,
  unenrollFromCourse,
  updateEntitlementEnrollment,
  deleteEntitlementEnrollment,
  updateEmailSettings,
  logEvent,
  logShare,
  createCreditRequest,
  sendConfirmEmail,
};
