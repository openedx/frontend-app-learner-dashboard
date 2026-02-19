import track from 'tracking';
import { useCourseData, useCourseTrackingEvent } from 'hooks';
import { useState } from 'react';
import { StrictDict } from 'utils';
import { useInitializeLearnerHome } from 'data/hooks';

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
  const trackCourseEvent = useCourseTrackingEvent(
    track.course.courseOptionsDropdownClicked,
    cardId,
  );
  return (isOpen) => {
    if (isOpen) { trackCourseEvent(); }
  };
};

export const useCardSocialSettingsData = (cardId) => {
  const { data: learnerHomeData } = useInitializeLearnerHome();
  const courseData = useCourseData(cardId);
  const socialShareSettings = learnerHomeData?.socialShareSettings;
  const { socialShareUrl } = courseData?.course || {};
  const defaultSettings = { isEnabled: false, shareUrl: '' };

  if (!socialShareSettings) {
    return { facebook: defaultSettings, twitter: defaultSettings };
  }
  const { facebook, twitter } = socialShareSettings;
  const loadSettings = (target) => ({
    isEnabled: target.isEnabled,
    shareUrl: `${socialShareUrl}?${target.utmParams}`,
  });
  return { facebook: loadSettings(facebook), twitter: loadSettings(twitter) };
};

export const useOptionVisibility = (cardId) => {
  const courseData = useCourseData(cardId);
  const isEmailEnabled = courseData?.enrollment?.isEmailEnabled ?? false;
  const isEnrolled = courseData?.enrollment?.isEnrolled ?? false;
  const { twitter, facebook } = useCardSocialSettingsData(cardId);
  const isEarned = courseData?.certificate?.isEarned ?? false;

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
