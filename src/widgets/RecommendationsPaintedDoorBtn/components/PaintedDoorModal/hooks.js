import React from 'react';
import { StrictDict } from 'utils';

import * as module from './hooks';

export const state = StrictDict({
  isModalOpen: (val) => React.useState(val), // eslint-disable-line
});

export const usePaintedDoorModal = () => {
  const [isModalOpen, setIsModalOpen] = module.state.isModalOpen(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return {
    isModalOpen,
    toggleModal,
  };
};
