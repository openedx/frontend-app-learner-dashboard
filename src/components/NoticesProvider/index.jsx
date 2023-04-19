import React from 'react';
import PropTypes from 'prop-types';

import useNoticesWrapperData from './hooks';

/**
 * This component uses the platform-plugin-notices plugin to function.
 * If the user has an unacknowledged notice, they will be rerouted off
 * course home and onto a full-screen notice page. If the plugin is not
 * installed, or there are no notices, we just passthrough this component.
 */
const NoticesWrapper = ({ children }) => {
  const { isRedirected } = useNoticesWrapperData();
  return (
    <div>
      {isRedirected === true ? null : children}
    </div>
  );
};

NoticesWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NoticesWrapper;
