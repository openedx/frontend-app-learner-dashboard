import { MockUseState } from 'testUtils';

import * as hooks from './hooks';

const state = new MockUseState(hooks);

const {
  usePaintedDoorModal,
} = hooks;

describe('LearnerDashboardHeader hooks', () => {
  describe('state fields', () => {
    state.testGetter(state.keys.isModalOpen);
  });
  describe('useRecommendationsModal', () => {
    beforeEach(() => {
      state.mock();
    });
    it('initializes isModalOpen with false', () => {
      usePaintedDoorModal();
      state.expectInitializedWith(state.keys.isModalOpen, false);
    });
    test('change isModalOpen value on toggle', () => {
      const out = usePaintedDoorModal();
      state.expectInitializedWith(state.keys.isModalOpen, false);
      out.toggleModal();
      expect(state.values.isModalOpen).toEqual(true);
    });
  });
});
