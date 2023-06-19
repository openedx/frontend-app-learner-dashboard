import { MockUseState } from 'testUtils';
import { reduxHooks, apiHooks } from 'hooks';

import * as hooks from './hooks';

jest.mock('hooks', () => ({
  reduxHooks: {
    useCardEnrollmentData: jest.fn(),
  },
  apiHooks: {
    useUpdateEmailSettings: jest.fn(),
  },
}));

const cardId = 'my-test-course-number';
const closeModal = jest.fn();
const updateEmailSettings = jest.fn();
apiHooks.useUpdateEmailSettings.mockReturnValue(updateEmailSettings);

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
      reduxHooks.useCardEnrollmentData.mockReturnValueOnce({ hasOptedOutOfEmail: true });
      out = hooks.useEmailData({ closeModal, cardId });
    });
    afterEach(state.restore);

    it('loads enrollment data based on course number', () => {
      expect(reduxHooks.useCardEnrollmentData).toHaveBeenCalledWith(cardId);
    });

    it('initializes toggle value to cardData.hasOptedOutOfEmail', () => {
      state.expectInitializedWith(state.keys.toggle, true);
      expect(out.isOptedOut).toEqual(true);

      reduxHooks.useCardEnrollmentData.mockReturnValueOnce({ hasOptedOutOfEmail: false });
      out = hooks.useEmailData({ closeModal, cardId });
      state.expectInitializedWith(state.keys.toggle, false);
      expect(out.isOptedOut).toEqual(false);
    });
    it('initializes email settings hok with cardId', () => {
      expect(apiHooks.useUpdateEmailSettings).toHaveBeenCalledWith(cardId);
    });
    describe('onToggle - returned callback', () => {
      it('sets toggle state value to opposite current value', () => {
        out.onToggle();
        expect(state.setState.toggle).toHaveBeenCalledWith(!out.isOptedOut);
      });
    });
    describe('save', () => {
      it('calls updateEmailSettings', () => {
        out.save();
        expect(updateEmailSettings).toHaveBeenCalledWith(!out.isOptedOut);
      });
      it('calls closeModal', () => {
        out.save();
        expect(closeModal).toHaveBeenCalled();
      });
    });
  });
});
