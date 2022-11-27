import React from 'react';
import { StrictDict } from 'utils';

import { getCookie, setCookie } from '../../utils/cookies';
import { configuration } from '../../config';

import * as module from './hooks';

export const state = StrictDict({
  hideWidget: (val) => React.useState(val), // eslint-disable-line
});

export const useDismissPanel = () => {
  const dismissCookieName = configuration.INTERVIEW_WIDGET_DISMISS_COOKIE_NAME;
  const [hideWidget, setHideWidget] = module.state.hideWidget(
    !!getCookie(dismissCookieName) || !configuration.INTERVIEW_WIDGET_SIGNUP_URL,
  );

  const handleDismiss = () => {
    setHideWidget(true);
    setCookie(dismissCookieName, true, 365);
  };

  return {
    hideWidget,
    handleDismiss,
  };
};

export default useDismissPanel;
