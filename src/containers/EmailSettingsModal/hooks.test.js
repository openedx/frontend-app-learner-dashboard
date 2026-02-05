import { MockUseState } from 'testUtils';
import { useCourseData } from 'hooks';
import { useUpdateEmailSettings } from 'data/react-query/apiHooks';

import * as hooks from './hooks';

jest.mock('data/react-query/apiHooks', () => ({
  useUpdateEmailSettings: jest.fn(),
}));

jest.mock('hooks', () => ({
  useCourseData: jest.fn(() => ({
    enrollment: {},
  })),
}));

const cardId = 'my-test-course-number';
const closeModal = jest.fn();
const updateEmailSettings = jest.fn();
useUpdateEmailSettings.mockReturnValue({ mutate: updateEmailSettings });

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
      useCourseData.mockReturnValue({ enrollment: { hasOptedOutOfEmail: true } });
      out = hooks.useEmailData({ closeModal, cardId });
    });
    afterEach(state.restore);

    it('loads enrollment data based on course number', () => {
      expect(useCourseData).toHaveBeenCalledWith(cardId);
    });

    it('initializes toggle value to cardData.hasOptedOutOfEmail', () => {
      state.expectInitializedWith(state.keys.toggle, true);
      expect(out.isOptedOut).toEqual(true);

      useCourseData.mockReturnValueOnce({ enrollment: { hasOptedOutOfEmail: false } });
      out = hooks.useEmailData({ closeModal, cardId });
      state.expectInitializedWith(state.keys.toggle, false);
      expect(out.isOptedOut).toEqual(false);
    });
    it('initializes email settings hook with cardId', () => {
      expect(useUpdateEmailSettings).toHaveBeenCalled();
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
        expect(updateEmailSettings).toHaveBeenCalledWith(cardId, !out.isOptedOut);
      });
      it('calls closeModal', () => {
        out.save();
        expect(closeModal).toHaveBeenCalled();
      });
    });
  });
});
