import { MockUseState } from 'testUtils';
import track from 'tracking';
import {
  apiHooks,
  reduxHooks,
  utilHooks,
} from 'hooks';

import * as hooks from './reasons';

jest.mock('hooks', () => ({
  apiHooks: {
    useUnenrollFromCourse: jest.fn((...args) => ({ unenrollFromCourse: args })),
  },
  reduxHooks: {
    useCardEntitlementData: jest.fn(),
    useTrackCourseEvent: jest.fn(),
  },
  utilHooks: {
    useValueCallback: jest.fn((cb, prereqs) => ({ useValueCallback: { cb, prereqs } })),
  },
}));

const state = new MockUseState(hooks);
const testValue = 'test-value';
const testValue2 = 'test-value2';
const unenrollFromCourse = jest.fn((...args) => ({ unenrollFromCourse: args }));
const trackCourseEvent = jest.fn((e) => ({ courseEvent: e }));
apiHooks.useUnenrollFromCourse.mockReturnValue(unenrollFromCourse);
reduxHooks.useTrackCourseEvent.mockReturnValue(trackCourseEvent);
let out;

const cardId = 'test-card-id';
const loadHook = (isEntitlement = false) => {
  reduxHooks.useCardEntitlementData.mockReturnValue({ isEntitlement });
  out = hooks.useUnenrollReasons({ cardId });
};

describe('UnenrollConfirmModal reasons hooks', () => {
  describe('state fields', () => {
    state.testGetter(state.keys.customOption);
    state.testGetter(state.keys.isSkipped);
    state.testGetter(state.keys.isSubmitted);
    state.testGetter(state.keys.selectedReason);
  });
  describe('useUnenrollReasons', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      state.mock();
      loadHook();
    });
    afterEach(() => {
      state.restore();
    });
    describe('behavior', () => {
      describe('state fields', () => {
        it('initializes selectedReason with null', () => {
          state.expectInitializedWith(state.keys.selectedReason, null);
        });
        it('initializes customOption with empty string', () => {
          state.expectInitializedWith(state.keys.customOption, '');
        });
        it('initializes isSkipped with false', () => {
          state.expectInitializedWith(state.keys.isSkipped, false);
        });
        it('initializes isSubmitted with false', () => {
          state.expectInitializedWith(state.keys.isSubmitted, false);
        });
      });
      describe('useTrackCourseEvent inititalization', () => {
        it('passes custom option if selectedReason is custom', () => {
          state.mockVal(state.keys.selectedReason, 'custom');
          state.mockVal(state.keys.customOption, testValue);
          loadHook();
          expect(reduxHooks.useTrackCourseEvent).toHaveBeenCalledWith(
            track.engagement.unenrollReason,
            cardId,
            testValue,
            false, // isEntitlement
          );
        });
        it('passes selected reason if not custom', () => {
          state.mockVal(state.keys.selectedReason, testValue2);
          state.mockVal(state.keys.customOption, testValue);
          loadHook(true);
          expect(reduxHooks.useTrackCourseEvent).toHaveBeenCalledWith(
            track.engagement.unenrollReason,
            cardId,
            testValue2,
            true, // isEntitlement
          );
        });
      });
      it('initializes card entitlement data with cardId', () => {
        expect(reduxHooks.useCardEntitlementData).toHaveBeenCalledWith(cardId);
      });
      it('initializes unenerollFromCourse event with cardId', () => {
        expect(apiHooks.useUnenrollFromCourse).toHaveBeenCalledWith(cardId);
      });
    });
    describe('output', () => {
      describe('customOption', () => {
        test('customOption.value returns custom option', () => {
          state.mockVal(state.keys.customOption, testValue);
          loadHook();
          expect(out.customOption.value).toEqual(testValue);
        });
        test('customOption.onChange returns valueCallback for setCustomOption', () => {
          expect(out.customOption.onChange).toEqual(
            utilHooks.useValueCallback(state.setState.customOption),
          );
        });
      });
      describe('hasReason', () => {
        it('returns true if an option is selected other than custom', () => {
          state.mockVal(state.keys.selectedReason, testValue);
          loadHook();
          expect(out.hasReason).toEqual(true);
        });
        it('returns true if custom option is selected and provided', () => {
          state.mockVal(state.keys.selectedReason, 'custom');
          state.mockVal(state.keys.customOption, testValue2);
          loadHook();
          expect(out.hasReason).toEqual(true);
        });
        it('returns false if no option is selected', () => {
          state.mockVal(state.keys.selectedReason, null);
          loadHook();
          expect(out.hasReason).toEqual(false);
        });
        it('returns false if custom option is selcted but not provided', () => {
          state.mockVal(state.keys.selectedReason, 'custom');
          state.mockVal(state.keys.customOption, '');
          loadHook();
          expect(out.hasReason).toEqual(false);
        });
      });
      describe('handleClear method', () => {
        it('resets selected and submitted reasons, custom option and isSkipped', () => {
          out.handleClear();
          expect(state.setState.selectedReason).toHaveBeenCalledWith(null);
          expect(state.setState.customOption).toHaveBeenCalledWith('');
          expect(state.setState.isSkipped).toHaveBeenCalledWith(false);
          expect(state.setState.isSubmitted).toHaveBeenCalledWith(false);
        });
      });
      test('handleSkip sets isSkipped and isSubmitted, and unenrolls w/out a reason', () => {
        out.handleSkip();
        expect(state.setState.isSkipped).toHaveBeenCalledWith(true);
        expect(unenrollFromCourse).toHaveBeenCalledWith();
      });
      describe('handleSubmit', () => {
        it('tracks reason event and calls unenroll action', () => {
          state.mockVal(state.keys.selectedReason, testValue);
          loadHook();
          expect(trackCourseEvent).not.toHaveBeenCalled();
          const event = { test: 'event' };
          out.handleSubmit(event);
          expect(trackCourseEvent).toHaveBeenCalledWith(event);
          expect(unenrollFromCourse).toHaveBeenCalledWith();
        });
      });
      test('isSkipped returns state value', () => {
        state.mockVal(state.keys.isSkipped, testValue);
        loadHook();
        expect(out.isSkipped).toEqual(testValue);
      });
      test('isSubmitted returns state value', () => {
        state.mockVal(state.keys.isSubmitted, testValue);
        loadHook();
        expect(out.isSubmitted).toEqual(testValue);
      });
      test('selectedOption returns valueCallback for setSelectedReason', () => {
        expect(out.selectOption).toEqual(
          utilHooks.useValueCallback(state.setState.selectedReason),
        );
      });
      describe('submittedReason', () => {
        it('returns the selected reason unless is custom, then shows custom option', () => {
          state.mockVal(state.keys.selectedReason, testValue);
          state.mockVal(state.keys.customOption, testValue2);
          loadHook();
          expect(out.submittedReason).toEqual(testValue);
          state.mockVal(state.keys.selectedReason, 'custom');
          state.mockVal(state.keys.customOption, testValue2);
          loadHook();
          expect(out.submittedReason).toEqual(testValue2);
        });
      });
    });
  });
});
