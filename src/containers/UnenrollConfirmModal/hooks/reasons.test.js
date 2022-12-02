import { keyStore } from 'utils';
import { thunkActions, hooks as appHooks } from 'data/redux';
import { useValueCallback } from 'hooks';
import { MockUseState } from 'testUtils';
import track from 'tracking';

import * as hooks from './reasons';

jest.mock('data/redux', () => ({
  thunkActions: {
    app: {
      refreshList: jest.fn((args) => ({ refreshList: args })),
      unenrollFromCourse: jest.fn((...args) => ({ unenrollFromCourse: args })),
    },
  },
  hooks: {
    useCardEntitlementData: jest.fn(),
    useTrackCourseEvent: jest.fn(),
  },
}));

jest.mock('hooks', () => ({
  useValueCallback: jest.fn((cb, prereqs) => ({ useValueCallback: { cb, prereqs } })),
}));

const state = new MockUseState(hooks);
const testValue = 'test-value';
const testValue2 = 'test-value2';
const moduleKeys = keyStore(hooks);
let out;

describe('UnenrollConfirmModal reasons hooks', () => {
  const dispatch = jest.fn();
  const cardId = 'test-card-id';

  const createUseUnenrollReasons = () => hooks.useUnenrollReasons({ dispatch, cardId });

  describe('state fields', () => {
    state.testGetter(state.keys.customOption);
    state.testGetter(state.keys.isSkipped);
    state.testGetter(state.keys.isSubmitted);
    state.testGetter(state.keys.selectedReason);
  });
  describe('useTrackUnenrollReasons', () => {
    it('returns trackCourseEvent for unenroll with submitted reason and isEntitlement', () => {
      appHooks.useCardEntitlementData.mockReturnValue({ isEntitlement: false });
      const args = { cardId, submittedReason: testValue };
      expect(hooks.useTrackUnenrollReasons(args)).toEqual(appHooks.useTrackCourseEvent(
        track.engagement.unenrollReason,
        args.cardId,
        args.submittedReason,
        false,
      ));
    });
  });
  describe('useUnenrollReasons', () => {
    const trackReasonsEvent = jest.fn((e) => ({ trackReasonsEvent: e }));
    let useTrackUnenrollReasons;
    beforeEach(() => {
      state.mock();
      appHooks.useCardEntitlementData.mockReturnValue({ isEntitlement: false });
      useTrackUnenrollReasons = jest.spyOn(hooks, moduleKeys.useTrackUnenrollReasons)
        .mockImplementation(() => trackReasonsEvent);
      out = createUseUnenrollReasons();
    });
    afterEach(() => {
      state.restore();
    });
    describe('customOption', () => {
      test('customOption.value returns custom option', () => {
        state.mockVal(state.keys.customOption, testValue);
        expect(createUseUnenrollReasons().customOption.value).toEqual(testValue);
      });
      test('customOption.onChange returns valueCallback for setCustomOption', () => {
        expect(out.customOption.onChange).toEqual(useValueCallback(state.setState.customOption));
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
      expect(dispatch).toHaveBeenCalledWith(thunkActions.app.unenrollFromCourse(cardId));
    });
    describe('handleSubmit', () => {
      it('tracks reason event and dispatches unenroll thunk action', () => {
        state.mockVal(state.keys.selectedReason, testValue);
        out = createUseUnenrollReasons();
        expect(useTrackUnenrollReasons).toHaveBeenCalledWith({
          cardId,
          submittedReason: testValue,
        });
        expect(trackReasonsEvent).not.toHaveBeenCalled();
        const event = { test: 'event' };
        out.handleSubmit(event);
        expect(trackReasonsEvent).toHaveBeenCalledWith(event);
        expect(dispatch).toHaveBeenCalledWith(thunkActions.app.unenrollFromCourse(cardId));
      });
    });
    test('isSkipped returns state value', () => {
      state.mockVal(state.keys.isSkipped, testValue);
      expect(createUseUnenrollReasons().isSkipped).toEqual(testValue);
    });
    test('isSubmitted returns state value', () => {
      state.mockVal(state.keys.isSubmitted, testValue);
      expect(createUseUnenrollReasons().isSubmitted).toEqual(testValue);
    });
    test('selectedOption returns valueCallback for setSelectedReason', () => {
      expect(out.selectOption).toEqual(useValueCallback(state.setState.selectedReason));
    });
    describe('submittedReason', () => {
      it('returns the selected reason unless custom is selcted, then shows custom option', () => {
        state.mockVal(state.keys.selectedReason, testValue);
        state.mockVal(state.keys.customOption, testValue2);
        out = createUseUnenrollReasons();
        expect(out.submittedReason).toEqual(testValue);
        state.mockVal(state.keys.selectedReason, 'custom');
        state.mockVal(state.keys.customOption, testValue2);
        out = createUseUnenrollReasons();
        expect(out.submittedReason).toEqual(testValue2);

      });
    });
  });
});
