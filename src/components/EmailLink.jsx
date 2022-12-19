import React from 'react';
import PropTypes from 'prop-types';

import { MailtoLink } from '@edx/paragon';

export const EmailLink = ({ address }) => {
  if (!address) {
    return null;
  }
  return (
    <MailtoLink to={address}>{address}</MailtoLink>
  );
};
EmailLink.defaultProps = { address: null };
EmailLink.propTypes = { address: PropTypes.string };

export default EmailLink;
