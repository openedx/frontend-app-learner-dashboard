import React from 'react';
import { Button } from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import messages from '../messages';
import { COLLAPSED_NAVBAR, EXPANDED_NAVBAR } from '../constants';

export const NavbarButton = ({ placement, handleClick }) => {
  const { formatMessage } = useIntl();

  return (
    <Button
      as="a"
      className={classNames({
        'p-4': placement === EXPANDED_NAVBAR,
      })}
      variant="inverse-primary"
      onClick={handleClick}
    >
      {formatMessage(messages.recommendedForYou)}
    </Button>
  );
};

NavbarButton.propTypes = {
  placement: PropTypes.oneOf([COLLAPSED_NAVBAR, EXPANDED_NAVBAR]).isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default NavbarButton;
