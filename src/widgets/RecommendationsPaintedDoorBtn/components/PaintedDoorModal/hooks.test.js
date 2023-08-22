import { MockUseState } from 'testUtils';

import * as hooks from './hooks';

const state = new MockUseState(hooks);

const {
  usePaintedDoorModal,
} = hooks;

describe('LearnerDashboardHeader hooks', () => {
  describe('useRecommendationsModal', () => {
    test('default state', () => {
      state.mock();
      const out = usePaintedDoorModal();
      state.expectInitializedWith(state.keys.isModalOpen, false);
      out.toggleModal();
      expect(state.values.isModalOpen).toEqual(true);
    });
  });
});
