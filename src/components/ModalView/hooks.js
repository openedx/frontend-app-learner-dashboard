import React from 'react';
import { StrictDict } from 'utils';

import * as module from './hooks';

export const state = StrictDict({
  isRecommendationsModalOpen: (val) => React.useState(val), // eslint-disable-line
});

export const useRecommendationsModal = () => {
  const [isRecommendationsModalOpen, setIsRecommendationsModalOpen] = module.state.isRecommendationsModalOpen(false);
  const toggleRecommendationsModal = () => setIsRecommendationsModalOpen(!isRecommendationsModalOpen);

  return {
    isRecommendationsModalOpen,
    toggleRecommendationsModal,
  };
};
