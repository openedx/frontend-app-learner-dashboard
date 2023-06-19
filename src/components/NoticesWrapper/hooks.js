import React from 'react';
import { getConfig } from '@edx/frontend-platform';

import { StrictDict } from 'utils';
import { getNotices } from './api';
import * as module from './hooks';

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
  React.useEffect(() => {
    if (getConfig().ENABLE_NOTICES) {
      getNotices({
        onLoad: (data) => {
          if (data?.data?.results?.length > 0) {
            setIsRedirected(true);
            window.location.replace(`${data.data.results[0]}?next=${window.location.href}`);
          }
        },
      });
    }
  }, [setIsRedirected]);
  return { isRedirected };
};

export default useNoticesWrapperData;
