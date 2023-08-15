import { useKeyedState, StrictDict } from '@edx/react-unit-test-utils';

import track from 'tracking';
import { reduxHooks } from 'hooks';

export const stateKeys = StrictDict({
  isUnenrollConfirmVisible: 'isUnenrollConfirmVisible',
  isEmailSettingsVisible: 'isEmailSettingsVisible',
});

export const useUnenrollData = () => {
  const [isVisible, setIsVisible] = useKeyedState(stateKeys.isUnenrollConfirmVisible, false);
  return {
    show: () => setIsVisible(true),
    hide: () => setIsVisible(false),
    isVisible,
  };
};

export const useEmailSettings = () => {
  const [isVisible, setIsVisible] = useKeyedState(stateKeys.isEmailSettingsVisible, false);
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
