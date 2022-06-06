import React from 'react';
import { StrictDict } from 'utils';
import * as module from './hooks';

export const state = StrictDict({
  isUnenrollConfirmVisible: (val) => React.useState(val),
  isEmailSettingsVisible: (val) => React.useState(val),
});

export const unenrollModalHooks = () => {
  const [isVisible, setIsVisible] = module.state.isUnenrollConfirmVisible(false);
  return {
    show: () => setIsVisible(true),
    hide: () => setIsVisible(false),
    isVisible,
  };
};

export const emailSettingsModalHooks = () => {
  const [isVisible, setIsVisible] = module.state.isEmailSettingsVisible(false);
  return {
    show: () => setIsVisible(true),
    hide: () => setIsVisible(false),
    isVisible,
  };
};

export const menuHooks = () => {
  const unenrollModal = module.unenrollModalHooks();
  const emailSettingsModal = module.emailSettingsModalHooks();
  return {
    emailSettingsModal,
    unenrollModal,
  };
};

export default menuHooks;
