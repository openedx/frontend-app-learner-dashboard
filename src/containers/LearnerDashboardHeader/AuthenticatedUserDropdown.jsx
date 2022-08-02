import React from 'react';
import PropTypes from 'prop-types';

import { getConfig } from '@edx/frontend-platform';
import { useIntl } from '@edx/frontend-platform/i18n';
import { Dropdown, Icon } from '@edx/paragon';
import { Person } from '@edx/paragon/icons';

import messages from './messages';
import EnterpriseDashboard from './EnterpriseDashboard';

export const AuthenticatedUserDropdown = ({ username }) => {
  const { formatMessage } = useIntl();
  return (
    <>
      <Dropdown className="user-dropdown">
        <Dropdown.Toggle id="user" variant="primary">
          <Icon src={Person} />
          <span data-hj-suppress className="d-none d-md-inline">
            {username}
          </span>
        </Dropdown.Toggle>
        <Dropdown.Menu className="dropdown-menu-right">
          <EnterpriseDashboard />
          <Dropdown.Item href={`${getConfig().LMS_BASE_URL}/u/${username}`}>
            {formatMessage(messages.profile)}
          </Dropdown.Item>
          <Dropdown.Item href={`${getConfig().LMS_BASE_URL}/account/settings`}>
            {formatMessage(messages.account)}
          </Dropdown.Item>
          {getConfig().ORDER_HISTORY_URL && (
            <Dropdown.Item href={getConfig().ORDER_HISTORY_URL}>
              {formatMessage(messages.orderHistory)}
            </Dropdown.Item>
          )}
          <Dropdown.Item href={getConfig().SUPPORT_URL}>
            {formatMessage(messages.help)}
          </Dropdown.Item>
          <Dropdown.Item href={getConfig().LOGOUT_URL}>
            {formatMessage(messages.signOut)}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

AuthenticatedUserDropdown.propTypes = {
  username: PropTypes.string.isRequired,
};

export default AuthenticatedUserDropdown;
