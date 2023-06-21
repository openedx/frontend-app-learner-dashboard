import React from 'react';
import PropTypes from 'prop-types';

import { getConfig } from '@edx/frontend-platform';
import { useIntl } from '@edx/frontend-platform/i18n';
import { AppContext } from '@edx/frontend-platform/react';

import { Button, Badge } from '@edx/paragon';

import urls from 'data/services/lms/urls';
import { reduxHooks } from 'hooks';

import { findCoursesNavDropdownClicked } from '../hooks';

import messages from '../messages';

export const CollapseMenuBody = ({ isOpen }) => {
  const { formatMessage } = useIntl();
  const { authenticatedUser } = React.useContext(AppContext);

  const dashboard = reduxHooks.useEnterpriseDashboardData();
  const { courseSearchUrl } = reduxHooks.usePlatformSettingsData();

  const exploreCoursesClick = findCoursesNavDropdownClicked(urls.baseAppUrl(courseSearchUrl));

  return (
    isOpen && (
      <div className="d-flex flex-column shadow-sm nav-small-menu">
        <Button as="a" href="/" variant="inverse-primary">
          {formatMessage(messages.course)}
        </Button>
        <Button as="a" href={urls.programsUrl} variant="inverse-primary">
          {formatMessage(messages.program)}
        </Button>
        <Button
          as="a"
          href={urls.baseAppUrl(courseSearchUrl)}
          variant="inverse-primary"
          onClick={exploreCoursesClick}
        >
          {formatMessage(messages.discoverNew)}
        </Button>
        <Button as="a" href={getConfig().SUPPORT_URL} variant="inverse-primary">
          {formatMessage(messages.help)}
        </Button>
        {authenticatedUser && (
          <>
            {!!dashboard && (
              <Button as="a" href={dashboard.url} variant="inverse-primary">
                {formatMessage(messages.dashboard)}
              </Button>
            )}
            {!dashboard && getConfig().CAREER_LINK_URL && (
              <Button href={`${getConfig().CAREER_LINK_URL}`}>
                {formatMessage(messages.career)}
                <Badge className="px-2 mx-2" variant="warning">
                  {formatMessage(messages.newAlert)}
                </Badge>
              </Button>
            )}
            <Button
              as="a"
              href={`${getConfig().LMS_BASE_URL}/u/${
                authenticatedUser.username
              }`}
              variant="inverse-primary"
            >
              {formatMessage(messages.profile)}
            </Button>
            <Button
              as="a"
              href={`${getConfig().LMS_BASE_URL}/account/settings`}
              variant="inverse-primary"
            >
              {formatMessage(messages.account)}
            </Button>
            {getConfig().ORDER_HISTORY_URL && (
              <Button
                as="a"
                variant="inverse-primary"
                href={getConfig().ORDER_HISTORY_URL}
              >
                {formatMessage(messages.ordersAndSubscriptions)}
              </Button>
            )}
            <Button
              as="a"
              href={getConfig().LOGOUT_URL}
              variant="inverse-primary"
            >
              {formatMessage(messages.signOut)}
            </Button>
          </>
        )}
      </div>
    )
  );
};

CollapseMenuBody.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};

export default CollapseMenuBody;
