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

export const useCourseCardMenu = (cardId) => {
  const { courseName } = reduxHooks.useCardCourseData(cardId);
  const { isEnrolled, isEmailEnabled } = reduxHooks.useCardEnrollmentData(cardId);
  const { twitter, facebook } = reduxHooks.useCardSocialSettingsData(cardId);
  const { isMasquerading } = reduxHooks.useMasqueradeData();
  const { isEarned } = reduxHooks.useCardCertificateData(cardId);
  const handleTwitterShare = reduxHooks.useTrackCourseEvent(
    track.socialShare,
    cardId,
    'twitter',
  );
  const handleFacebookShare = reduxHooks.useTrackCourseEvent(
    track.socialShare,
    cardId,
    'facebook',
  );

  const showUnenrollItem = isEnrolled && !isEarned;
  const showDropdown = showUnenrollItem || isEmailEnabled || facebook.isEnabled || twitter.isEnabled;

  return {
    courseName,
    isMasquerading,
    isEmailEnabled,
    showUnenrollItem,
    showDropdown,
    facebook,
    twitter,
    handleTwitterShare,
    handleFacebookShare,
  };
};
