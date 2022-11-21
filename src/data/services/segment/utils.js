/* eslint-disable import/prefer-default-export */
import { sendTrackEvent } from '@edx/frontend-platform/analytics';
import { appName } from './constants';

export const trackEvent = (name, options = {}) => sendTrackEvent(
  name,
  { ...options, app_name: appName },
);
