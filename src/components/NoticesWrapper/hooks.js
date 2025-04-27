import React from 'react';
import { getAppConfig } from '@openedx/frontend-base';
import { useIntl } from 'react-intl';

import { StrictDict } from '../../utils';
import { getNotices } from './api';
import * as module from './hooks';
import messages from './messages';

/**
 * This component uses the platform-plugin-notices plugin to function.
 * If the user has an unacknowledged notice, they will be rerouted off
 * course home and onto a full-screen notice page. If the plugin is not
 * installed, or there are no notices, we just passthrough this component.
 */
export const state = StrictDict({
  isRedirected: (val) => React.useState(val), // eslint-disable-line
});

export const useNoticesWrapperData = () => {
  const [isRedirected, setIsRedirected] = module.state.isRedirected();
  const { formatMessage } = useIntl();

  React.useEffect(() => {
    if (getAppConfig('openedxLearnerDashboard').ENABLE_NOTICES) {
      getNotices({
        onLoad: (data) => {
          if (data?.data?.results?.length > 0) {
            setIsRedirected(true);
            window.location.replace(`${data.data.results[0]}?next=${window.location.href}`);
          }
        },
        notFoundMessage: formatMessage(messages.error404Message),
      });
    }
  }, [setIsRedirected, formatMessage]);
  return { isRedirected };
};

export default useNoticesWrapperData;
