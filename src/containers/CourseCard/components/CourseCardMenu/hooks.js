import React from 'react';
import { StrictDict } from 'utils';

import track from 'tracking';
import { reduxHooks } from 'hooks';

import * as module from './hooks';

export const state = StrictDict({
  isUnenrollConfirmVisible: (val) => React.useState(val), // eslint-disable-line
  isEmailSettingsVisible: (val) => React.useState(val), // eslint-disable-line
});

export const useUnenrollData = () => {
  const [isVisible, setIsVisible] = module.state.isUnenrollConfirmVisible(false);
  return {
    show: () => setIsVisible(true),
    hide: () => setIsVisible(false),
    isVisible,
  };
};

export const useEmailSettings = () => {
  const [isVisible, setIsVisible] = module.state.isEmailSettingsVisible(false);
  return {
    show: () => setIsVisible(true),
    hide: () => setIsVisible(false),
    isVisible,
  };
};

export const useHandleToggleDropdown = (cardId) => {
  const eventName = track.course.courseOptionsDropdownClicked;
  const trackCourseEvent = reduxHooks.useTrackCourseEvent(eventName, cardId);
  return (isOpen) => {
    if (isOpen) { trackCourseEvent(); }
  };
};
