import React from 'react';
import PropTypes from 'prop-types';
import { getLinkProps } from '@openedx/frontend-base';
import { Button } from '@openedx/paragon';

import useIsCollapsed from './hooks';

export const ActionButton = ({ href, ...props }) => {
  const isSmall = useIsCollapsed();
  // A path in this site becomes a react-router link, so the navigation stays in the client.  A
  // disabled button stays a plain anchor: those are the ones Paragon blocks clicks on.
  const linkProps = href && !props.disabled ? getLinkProps(href) : { href };
  return (
    <Button
      {...props}
      {...linkProps}
      {...isSmall && { size: 'sm' }}
    />
  );
};

ActionButton.propTypes = {
  href: PropTypes.string,
  disabled: PropTypes.bool,
};

ActionButton.defaultProps = {
  href: undefined,
  disabled: false,
};

export default ActionButton;
