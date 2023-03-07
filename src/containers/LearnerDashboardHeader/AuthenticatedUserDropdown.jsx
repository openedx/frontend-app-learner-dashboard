import React from 'react';
import PropTypes from 'prop-types';

import { getConfig } from '@edx/frontend-platform';
import { useIntl } from '@edx/frontend-platform/i18n';
import { AppContext } from '@edx/frontend-platform/react';
import { AvatarButton, Dropdown } from '@edx/paragon';

import urls from 'data/services/lms/urls';
import { reduxHooks } from 'hooks';

import { useIsCollapsed, findCoursesNavDropdownClicked } from './hooks';
import messages from './messages';

export const AuthenticatedUserDropdown = ({ username }) => {
  const { formatMessage } = useIntl();
  const { authenticatedUser } = React.useContext(AppContext);
  const dashboard = reduxHooks.useEnterpriseDashboardData();
  const { courseSearchUrl } = reduxHooks.usePlatformSettingsData();
  const isCollapsed = useIsCollapsed();
  const { profileImage } = authenticatedUser;

  return (
    <Dropdown variant={isCollapsed ? 'light' : 'dark'} className="user-dropdown ml-1">
      <Dropdown.Toggle
        as={AvatarButton}
        src={profileImage}
        id="user"
        variant="primary"
      >
        <span data-hj-suppress className="d-none d-md-inline">
          {username}
        </span>
      </Dropdown.Toggle>
      <Dropdown.Menu className="dropdown-menu-right">
        <Dropdown.Header>SWITCH DASHBOARD</Dropdown.Header>
        <Dropdown.Item as="a" href="/edx-dashboard" className="active">Personal</Dropdown.Item>
        {!!dashboard && (
          <Dropdown.Item
            as="a"
            href={dashboard.url}
            key={dashboard.label}
          >
            {dashboard.label} {formatMessage(messages.dashboard)}
          </Dropdown.Item>
        )}
        <Dropdown.Divider />
        <Dropdown.Item href={urls.profileUrl(username)}>
          {formatMessage(messages.profile)}
        </Dropdown.Item>
        {isCollapsed && (
          <>
            <Dropdown.Item href={urls.programsUrl}>
              {formatMessage(messages.viewPrograms)}
            </Dropdown.Item>
            <Dropdown.Item href={courseSearchUrl} onClick={findCoursesNavDropdownClicked(courseSearchUrl)}>
              {formatMessage(messages.exploreCourses)}
            </Dropdown.Item>
          </>
        )}
        <Dropdown.Item href={urls.accountUrl}>
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
        <Dropdown.Divider />
        <Dropdown.Item href={getConfig().LOGOUT_URL}>
          {formatMessage(messages.signOut)}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

AuthenticatedUserDropdown.propTypes = {
  username: PropTypes.string.isRequired,
};

export default AuthenticatedUserDropdown;
