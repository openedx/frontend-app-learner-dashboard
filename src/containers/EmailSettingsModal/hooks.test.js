import { MockUseState } from 'testUtils';
import { hooks as appHooks, thunkActions } from 'data/redux';

import * as hooks from './hooks';

jest.mock('data/redux', () => ({
  hooks: {
    useCardEnrollmentData: jest.fn(),
  },
  thunkActions: {
    app: {
      updateEmailSettings: jest.fn(),
    },
  },
}));

const cardId = 'my-test-course-number';
const closeModal = jest.fn();
const dispatch = jest.fn();

const state = new MockUseState(hooks);

describe('EmailSettingsModal hooks', () => {
  let out;
  describe('state values', () => {
    state.testGetter(state.keys.toggle);
  });
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('useEmailData', () => {
    beforeEach(() => {
      state.mock();
      appHooks.useCardEnrollmentData.mockReturnValueOnce({ isEmailEnabled: true });
      out = hooks.useEmailData({ closeModal, cardId, dispatch });
    });
    afterEach(state.restore);

    test('loads enrollment data based on course number', () => {
      expect(appHooks.useCardEnrollmentData).toHaveBeenCalledWith(cardId);
    });

    test('initializes toggle value to cardData.isEmailEnabled', () => {
      state.expectInitializedWith(state.keys.toggle, true);
      expect(out.toggleValue).toEqual(true);

      appHooks.useCardEnrollmentData.mockReturnValueOnce({ isEmailEnabled: false });
      out = hooks.useEmailData({ closeModal, cardId });
      state.expectInitializedWith(state.keys.toggle, false);
      expect(out.toggleValue).toEqual(false);
    });
    describe('onToggle - returned callback', () => {
      it('is based on toggle state value', () => {
        expect(out.onToggle.useCallback.prereqs).toEqual([state.setState.toggle, out.toggleValue]);
      });
      it('sets toggle state value to opposite current value', () => {
        out.onToggle.useCallback.cb();
        expect(state.setState.toggle).toHaveBeenCalledWith(!out.toggleValue);
      });
    });
    describe('save', () => {
      it('calls dispatch with thunkActions.app.updateEmailSettings', () => {
        out.save.useCallback.cb();
        expect(thunkActions.app.updateEmailSettings).toHaveBeenCalledWith(cardId, out.toggleValue);
        expect(dispatch).toHaveBeenCalledWith(thunkActions.app.updateEmailSettings(cardId, out.toggleValue));
      });
      it('calls closeModal', () => {
        out.save.useCallback.cb();
        expect(closeModal).toHaveBeenCalled();
      });
    });
  });
});
