import { MockUseState } from 'testUtils';
import { reduxHooks } from 'hooks';
import track from 'tracking';

import * as hooks from './hooks';

jest.mock('hooks', () => ({
  reduxHooks: {
    useTrackCourseEvent: jest.fn(),
    useCardCourseData: jest.fn(),
    useCardEnrollmentData: jest.fn(),
    useCardSocialSettingsData: jest.fn(),
    useMasqueradeData: jest.fn(),
    useCardCertificateData: jest.fn(),
  },
}));

const trackCourseEvent = jest.fn();
reduxHooks.useTrackCourseEvent.mockReturnValue(trackCourseEvent);
const state = new MockUseState(hooks);

const defaultSocialShare = {
  facebook: {
    isEnabled: true,
    shareUrl: 'facebook-share-url',
    socialBrand: 'facebook-social-brand',
  },
  twitter: {
    isEnabled: true,
    shareUrl: 'twitter-share-url',
    socialBrand: 'twitter-social-brand',
  },
};
const cardId = 'test-card-id';
let out;

describe('CourseCardMenu hooks', () => {
  describe('state values', () => {
    state.testGetter(state.keys.isUnenrollConfirmVisible);
    state.testGetter(state.keys.isEmailSettingsVisible);
  });

  describe('useUnenrollData', () => {
    beforeEach(() => {
      state.mock();
      out = hooks.useUnenrollData();
    });
    afterEach(state.restore);

    test('default state', () => {
      expect(out.isVisible).toEqual(state.stateVals.isUnenrollConfirmVisible);
    });

    test('show', () => {
      out.show();
      state.expectSetStateCalledWith(state.keys.isUnenrollConfirmVisible, true);
    });

    test('hide', () => {
      out.hide();
      state.expectSetStateCalledWith(state.keys.isUnenrollConfirmVisible, false);
    });
  });

  describe('useEmailSettings', () => {
    beforeEach(() => {
      state.mock();
      out = hooks.useEmailSettings();
    });
    afterEach(state.restore);

    test('default state', () => {
      expect(out.isVisible).toEqual(state.stateVals.isEmailSettingsVisible);
    });

    test('show', () => {
      out.show();
      state.expectSetStateCalledWith(state.keys.isEmailSettingsVisible, true);
    });

    test('hide', () => {
      out.hide();
      state.expectSetStateCalledWith(state.keys.isEmailSettingsVisible, false);
    });
  });

  describe('useHandleToggleDropdown', () => {
    beforeEach(() => {
      out = hooks.useHandleToggleDropdown(cardId);
    });
    describe('behavior', () => {
      it('initializes course event tracker with event name and card ID', () => {
        expect(reduxHooks.useTrackCourseEvent).toHaveBeenCalledWith(
          track.course.courseOptionsDropdownClicked,
          cardId,
        );
      });
    });
    describe('returned method', () => {
      it('calls trackCourseEvent iff true is passed', () => {
        out(false);
        expect(trackCourseEvent).not.toHaveBeenCalled();
        out(true);
        expect(trackCourseEvent).toHaveBeenCalled();
      });
    });
  });

  describe('useCourseCardMenu', () => {
    const mockUseCourseCardMenu = ({
      courseName,
      isEnrolled,
      isEmailEnabled,
      isMasquerading,
      facebook,
      twitter,
      isEarned,
    } = {}) => {
      reduxHooks.useCardCourseData.mockReturnValueOnce({ courseName });
      reduxHooks.useCardSocialSettingsData.mockReturnValueOnce({
        facebook: {
          ...defaultSocialShare.facebook,
          ...facebook,
        },
        twitter: {
          ...defaultSocialShare.twitter,
          ...twitter,
        },
      });
      reduxHooks.useCardEnrollmentData.mockReturnValueOnce({
        isEnrolled,
        isEmailEnabled,
      });
      reduxHooks.useMasqueradeData.mockReturnValueOnce({ isMasquerading });
      reduxHooks.useCardCertificateData.mockReturnValueOnce({ isEarned });
    };
    afterEach(() => jest.resetAllMocks());
    describe('showUnenrollItem', () => {
      test('return true', () => {
        mockUseCourseCardMenu({ isEnrolled: true, isEarned: false });
        out = hooks.useCourseCardMenu(cardId);
        expect(out.showUnenrollItem).toBeTruthy();
      });

      test('return false', () => {
        mockUseCourseCardMenu({ isEnrolled: true, isEarned: true });
        out = hooks.useCourseCardMenu(cardId);
        expect(out.showUnenrollItem).toBeFalsy();

        mockUseCourseCardMenu({ isEnrolled: false, isEarned: false });
        out = hooks.useCourseCardMenu(cardId);
        expect(out.showUnenrollItem).toBeFalsy();

        mockUseCourseCardMenu({ isEnrolled: false, isEarned: true });
        out = hooks.useCourseCardMenu(cardId);
        expect(out.showUnenrollItem).toBeFalsy();
      });
    });

    describe('showDropdown', () => {
      test('return false iif everything is false', () => {
        mockUseCourseCardMenu({
          isEnrolled: false,
          isEarned: false,
          isEmailEnabled: false,
          facebook: { isEnabled: false },
          twitter: { isEnabled: false },
        });
        out = hooks.useCourseCardMenu(cardId);
        expect(out.showDropdown).toBeFalsy();
      });

      test('return true iif at least one is true', () => {
        mockUseCourseCardMenu({
          isEnrolled: true,
          isEarned: false,
          isEmailEnabled: false,
          facebook: { isEnabled: false },
          twitter: { isEnabled: false },
        });
        out = hooks.useCourseCardMenu(cardId);
        expect(out.showDropdown).toBeTruthy();
      });
    });

    test('return correct values', () => {
      const expected = {
        courseName: 'abitrary-course-name',
        isMasquerading: 'abitrary-masquerading-value',
        isEmailEnabled: 'abitrary-email-enabled-value',
        facebook: { isEnabled: 'abitrary-facebook-value' },
        twitter: { isEnabled: 'abitrary-twitter-value' },
      };
      mockUseCourseCardMenu(expected);
      out = hooks.useCourseCardMenu(cardId);
      expect(out.courseName).toEqual(expected.courseName);
      expect(out.isMasquerading).toEqual(expected.isMasquerading);
      expect(out.isEmailEnabled).toEqual(expected.isEmailEnabled);
      expect(out.facebook.isEnabled).toEqual(expected.facebook.isEnabled);
      expect(out.twitter.isEnabled).toEqual(expected.twitter.isEnabled);
    });

    test('handleSocialShareClick', () => {
      mockUseCourseCardMenu();

      out = hooks.useCourseCardMenu(cardId);
      expect(reduxHooks.useTrackCourseEvent).toHaveBeenCalledTimes(2);
      expect(reduxHooks.useTrackCourseEvent).toHaveBeenCalledWith(
        track.socialShare,
        cardId,
        'facebook',
      );
      expect(reduxHooks.useTrackCourseEvent).toHaveBeenCalledWith(
        track.socialShare,
        cardId,
        'twitter',
      );
    });
  });
});
