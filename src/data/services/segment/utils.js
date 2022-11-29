/* eslint-disable import/prefer-default-export */
import { sendTrackEvent } from '@edx/frontend-platform/analytics';
import { appName } from 'tracking/constants';

export const LINK_TIMEOUT = 300;

export const createEventTracker = (name, options = {}) => () => sendTrackEvent(
  name,
  { ...options, app_name: appName },
);

export const createLinkTracker = (tracker, href) => (e) => {
  e.preventDefault();
  tracker();
  return setTimeout(() => { global.location.href = href; }, LINK_TIMEOUT);
};
