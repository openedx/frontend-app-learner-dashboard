import { useCourseData, useCourseTrackingEvent } from 'hooks';
import { useInitializeLearnerHome } from 'data/react-query/apiHooks';
import track from 'tracking';
import { MockUseState } from 'testUtils';

import * as hooks from './hooks';

jest.mock('data/react-query/apiHooks', () => ({
  useInitializeLearnerHome: jest.fn(),
}));

jest.mock('hooks', () => ({
  useCourseData: jest.fn(),
  useCourseTrackingEvent: jest.fn(),
}));

const trackCourseEvent = jest.fn();
useCourseTrackingEvent.mockReturnValue(trackCourseEvent);
const cardId = 'test-card-id';
let out;

const state = new MockUseState(hooks);

describe('CourseCardMenu hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    state.mock();
  });
  describe('useUnenrollData', () => {
    beforeEach(() => {
      out = hooks.useUnenrollData();
    });
    describe('behavior', () => {
      it('initializes isUnenrollConfirmVisible state to false', () => {
        state.expectInitializedWith(state.keys.isUnenrollConfirmVisible, false);
      });
    });
    describe('output', () => {
      test('show sets state value to true', () => {
        out.show();
        expect(state.setState.isUnenrollConfirmVisible).toHaveBeenCalledWith(true);
      });
      test('hide sets state value to false', () => {
        out.hide();
        expect(state.setState.isUnenrollConfirmVisible).toHaveBeenCalledWith(false);
      });
    });
  });

  describe('useEmailSettings', () => {
    beforeEach(() => {
      out = hooks.useEmailSettings();
    });
    describe('behavior', () => {
      it('initializes isEmailSettingsVisible state to false', () => {
        state.expectInitializedWith(state.keys.isEmailSettingsVisible, false);
      });
    });
    describe('output', () => {
      test('show sets state value to true', () => {
        out.show();
        expect(state.setState.isEmailSettingsVisible).toHaveBeenCalledWith(true);
      });
      test('hide sets state value to false', () => {
        out.hide();
        expect(state.setState.isEmailSettingsVisible).toHaveBeenCalledWith(false);
      });
    });
  });

  describe('useHandleToggleDropdown', () => {
    beforeEach(() => { out = hooks.useHandleToggleDropdown(cardId); });
    describe('behavior', () => {
      it('initializes course event tracker with event name and card ID', () => {
        expect(useCourseTrackingEvent).toHaveBeenCalledWith(
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

  describe('useOptionVisibility', () => {
    const mockHooks = (returnVals = {}) => {
      useInitializeLearnerHome.mockReturnValue({
        data: {
          socialShareSettings: {
            facebook: { isEnabled: !!returnVals.facebook?.isEnabled },
            twitter: { isEnabled: !!returnVals.twitter?.isEnabled },
          },
        },
      });
      useCourseData.mockReturnValue({
        enrollment: {
          isEnrolled: !!returnVals.isEnrolled,
          isEmailEnabled: !!returnVals.isEmailEnabled,
        },
        certificate: {
          isEarned: !!returnVals.isEarned,
        },
      });
    };
    describe('shouldShowUnenrollItem', () => {
      it('returns true if enrolled and not earned', () => {
        mockHooks({ isEnrolled: true });
        expect(hooks.useOptionVisibility(cardId).shouldShowUnenrollItem).toEqual(true);
      });
      it('returns false if not enrolled', () => {
        mockHooks();
        expect(hooks.useOptionVisibility(cardId).shouldShowUnenrollItem).toEqual(false);
      });
      it('returns false if enrolled but also earned', () => {
        mockHooks({ isEarned: true });
        expect(hooks.useOptionVisibility(cardId).shouldShowUnenrollItem).toEqual(false);
      });
    });

    describe('shouldShowDropdown', () => {
      it('returns false if not enrolled and both email and socials are disabled', () => {
        mockHooks();
        expect(hooks.useOptionVisibility(cardId).shouldShowDropdown).toEqual(false);
      });
      it('returns false if enrolled but already earned, and both email and socials are disabled', () => {
        mockHooks({ isEnrolled: true, isEarned: true });
        expect(hooks.useOptionVisibility(cardId).shouldShowDropdown).toEqual(false);
      });
      it('returns true if either social is enabled', () => {
        mockHooks({ facebook: { isEnabled: true } });
        expect(hooks.useOptionVisibility(cardId).shouldShowDropdown).toEqual(true);
        mockHooks({ twitter: { isEnabled: true } });
        expect(hooks.useOptionVisibility(cardId).shouldShowDropdown).toEqual(true);
      });
      it('returns true if email is enabled', () => {
        mockHooks({ isEmailEnabled: true });
        expect(hooks.useOptionVisibility(cardId).shouldShowDropdown).toEqual(true);
      });
      it('returns true if enrolled and not earned', () => {
        mockHooks({ isEnrolled: true });
        expect(hooks.useOptionVisibility(cardId).shouldShowDropdown).toEqual(true);
      });
    });
  });
});
