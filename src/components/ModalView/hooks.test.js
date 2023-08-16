import { MockUseState } from 'testUtils';

import * as hooks from './hooks';

const state = new MockUseState(hooks);

const {
  useRecommendationsModal,
} = hooks;

describe('LearnerDashboardHeader hooks', () => {
  describe('useRecommendationsModal', () => {
    test('default state', () => {
      state.mock();
      const out = useRecommendationsModal();
      state.expectInitializedWith(state.keys.isRecommendationsModalOpen, false);
      out.toggleRecommendationsModal();
      expect(state.values.isRecommendationsModalOpen).toEqual(true);
    });
  });
});
