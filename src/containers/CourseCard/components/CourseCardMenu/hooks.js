import React from 'react';
import { StrictDict } from 'utils';
import * as module from './hooks';

export const state = StrictDict({
  isUnenrollConfirmVisible: (val) => React.useState(val), // eslint-disable-line
  isEmailSettingsVisible: (val) => React.useState(val), // eslint-disable-line
});

export const useUnenrollData = () => {
  const [isVisible, setIsVisible] = module.state.isUnenrollConfirmVisible(false);
  return {
    show: () => setIsVisible(true),
    hide: () => setIsVisible(false),
    isVisible,
  };
};

export const useEmailSettings = () => {
  const [isVisible, setIsVisible] = module.state.isEmailSettingsVisible(false);
  return {
    show: () => setIsVisible(true),
    hide: () => setIsVisible(false),
    isVisible,
  };
};
