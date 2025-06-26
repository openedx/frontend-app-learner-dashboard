import track from 'tracking';
import { reduxHooks } from 'hooks';
import { useState } from 'react';
import { StrictDict } from 'utils';

export const state = StrictDict({
  isUnenrollConfirmVisible: (val) => useState(val), // eslint-disable-line
  isEmailSettingsVisible: (val) => useState(val), // eslint-disable-line
});

export const useUnenrollData = () => {
  const [isVisible, setIsVisible] = state.isUnenrollConfirmVisible(false);
  return {
    show: () => setIsVisible(true),
    hide: () => setIsVisible(false),
    isVisible,
  };
};

export const useEmailSettings = () => {
  const [isVisible, setIsVisible] = state.isEmailSettingsVisible(false);
  return {
    show: () => setIsVisible(true),
    hide: () => setIsVisible(false),
    isVisible,
  };
};

export const useHandleToggleDropdown = (cardId) => {
  const trackCourseEvent = reduxHooks.useTrackCourseEvent(
    track.course.courseOptionsDropdownClicked,
    cardId,
  );
  return (isOpen) => {
    if (isOpen) { trackCourseEvent(); }
  };
};

export const useOptionVisibility = (cardId) => {
  const { isEnrolled, isEmailEnabled } = reduxHooks.useCardEnrollmentData(cardId);
  const { twitter, facebook } = reduxHooks.useCardSocialSettingsData(cardId);
  const { isEarned } = reduxHooks.useCardCertificateData(cardId);

  const shouldShowUnenrollItem = isEnrolled && !isEarned;
  const shouldShowDropdown = (
    shouldShowUnenrollItem
    || isEmailEnabled
    || facebook.isEnabled
    || twitter.isEnabled
  );

  return {
    shouldShowUnenrollItem,
    shouldShowDropdown,
  };
};
