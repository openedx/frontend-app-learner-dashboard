import React from 'react';
import PropTypes from 'prop-types';

import useNoticesProviderData from './hooks';

/**
 * This component uses the platform-plugin-notices plugin to function.
 * If the user has an unacknowledged notice, they will be rerouted off
 * course home and onto a full-screen notice page. If the plugin is not
 * installed, or there are no notices, we just passthrough this component.
 */
const NoticesProvider = ({ children }) => {
  const { isRedirected } = useNoticesProviderData();
  return (
    <div>
      {isRedirected === true ? null : children}
    </div>
  );
};

NoticesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NoticesProvider;
