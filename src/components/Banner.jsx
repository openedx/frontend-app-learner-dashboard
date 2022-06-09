import React from 'react';
import PropTypes from 'prop-types';

import { Alert } from '@edx/paragon';
import { Info } from '@edx/paragon/icons';

export const Banner = ({ children, variant, icon }) => (
  <Alert variant={variant} className="mb-0" icon={icon}>
    {children}
  </Alert>
);
Banner.defaultProps = {
  icon: Info,
  variant: 'info',
};
Banner.propTypes = {
  variant: PropTypes.string,
  icon: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default Banner;
