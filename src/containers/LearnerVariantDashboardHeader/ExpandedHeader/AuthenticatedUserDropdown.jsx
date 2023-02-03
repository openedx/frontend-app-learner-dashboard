import React from 'react';

import { getConfig } from '@edx/frontend-platform';
import { useIntl } from '@edx/frontend-platform/i18n';
import { AppContext } from '@edx/frontend-platform/react';
import { AvatarButton, Dropdown } from '@edx/paragon';

import { reduxHooks } from 'hooks';

import messages from '../messages';

export const AuthenticatedUserDropdown = () => {
  const { formatMessage } = useIntl();
  const { authenticatedUser } = React.useContext(AppContext);
  const dashboard = reduxHooks.useEnterpriseDashboardData();

  return (
    authenticatedUser && (
      <Dropdown className="user-dropdown pr4">
        <Dropdown.Toggle
          as={AvatarButton}
          src={authenticatedUser.profileImage}
          id="user"
          variant="light"
          className="p-4"
        >
          <span data-hj-suppress className="d-md-inline">
            {authenticatedUser.username}
          </span>
        </Dropdown.Toggle>
        <Dropdown.Menu className="dropdown-menu-right">
          <Dropdown.Header>SWITCH DASHBOARD</Dropdown.Header>
          <Dropdown.Item as="a" href="/edx-dashboard" className="active">
            Personal
          </Dropdown.Item>
          {!!dashboard && (
            <Dropdown.Item as="a" href={dashboard.url} key={dashboard.label}>
              {dashboard.label} {formatMessage(messages.dashboard)}
            </Dropdown.Item>
          )}
          <Dropdown.Divider />
          <Dropdown.Item href={`${getConfig().LMS_BASE_URL}/u/${authenticatedUser.username}`}>
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
          {/* <Dropdown.Item href={getConfig().SUPPORT_URL}>
          {formatMessage(messages.help)}
        </Dropdown.Item> */}
          <Dropdown.Divider />
          <Dropdown.Item href={getConfig().LOGOUT_URL}>
            {formatMessage(messages.signOut)}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    )
  );
};

AuthenticatedUserDropdown.propTypes = {};

export default AuthenticatedUserDropdown;
