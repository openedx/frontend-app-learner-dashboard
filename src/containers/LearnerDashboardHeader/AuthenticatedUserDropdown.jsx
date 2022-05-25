import React from 'react';
import PropTypes from 'prop-types';

import { getConfig } from '@edx/frontend-platform';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { Dropdown, Icon } from '@edx/paragon';
import { Person } from '@edx/paragon/icons';

import messages from './messages';

export const AuthenticatedUserDropdown = ({ intl, username }) => (
  <>
    <Dropdown className="user-dropdown">
      <Dropdown.Toggle invertColors variant="primary">
        <Icon src={Person} />
        <span data-hj-suppress className="d-none d-md-inline">
          {username}
        </span>
      </Dropdown.Toggle>
      <Dropdown.Menu className="dropdown-menu-right">
        <Dropdown.Item href={`${getConfig().LMS_BASE_URL}/dashboard`}>
          {intl.formatMessage(messages.dashboard)}
        </Dropdown.Item>{' '}
        <Dropdown.Item href={`${getConfig().LMS_BASE_URL}/u/${username}`}>
          {intl.formatMessage(messages.profile)}
        </Dropdown.Item>
        <Dropdown.Item href={`${getConfig().LMS_BASE_URL}/account/settings`}>
          {intl.formatMessage(messages.account)}
        </Dropdown.Item>
        {getConfig().ORDER_HISTORY_URL && (
          <Dropdown.Item href={getConfig().ORDER_HISTORY_URL}>
            {intl.formatMessage(messages.orderHistory)}
          </Dropdown.Item>
        )}
        <Dropdown.Item href={getConfig().SUPPORT_URL}>
          {intl.formatMessage(messages.help)}
        </Dropdown.Item>
        <Dropdown.Item href={getConfig().LOGOUT_URL}>
          {intl.formatMessage(messages.signOut)}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </>
);

AuthenticatedUserDropdown.propTypes = {
  intl: intlShape.isRequired,
  username: PropTypes.string.isRequired,
};

export default injectIntl(AuthenticatedUserDropdown);
