import React from 'react';

import { getConfig } from '@edx/frontend-platform';
import { useIntl } from '@edx/frontend-platform/i18n';
import { Button } from '@edx/paragon';

import urls from 'data/services/lms/urls';
import { reduxHooks } from 'hooks';

import AuthenticatedUserDropdown from './AuthenticatedUserDropdown';

import { useIsCollapsed, findCoursesNavClicked } from '../hooks';
import messages from '../messages';
import BrandLogo from '../BrandLogo';

export const ExpandedHeader = () => {
  const { formatMessage } = useIntl();
  const { courseSearchUrl } = reduxHooks.usePlatformSettingsData();
  const isCollapsed = useIsCollapsed();

  const exploreCoursesClick = findCoursesNavClicked(urls.baseAppUrl(courseSearchUrl));

  return (
    !isCollapsed && (
    <header className="d-flex shadow-sm align-items-center learner-variant-header pl-4">
      <div className="flex-grow-1 d-flex align-items-center">
        <BrandLogo />

        <Button
          as="a"
          href="/"
          variant="inverse-primary"
          className="p-4 course-link"
        >
          {formatMessage(messages.course)}
        </Button>
        <Button
          as="a"
          href={urls.programsUrl}
          variant="inverse-primary"
          className="p-4"
        >
          {formatMessage(messages.program)}
        </Button>
        <Button
          as="a"
          href={urls.baseAppUrl(courseSearchUrl)}
          variant="inverse-primary"
          className="p-4"
          onClick={exploreCoursesClick}
        >
          {formatMessage(messages.discoverNew)}
        </Button>
        <span className="flex-grow-1" />
        <Button
          as="a"
          href={getConfig().SUPPORT_URL}
          variant="inverse-primary"
          className="p-4"
        >
          {formatMessage(messages.help)}
        </Button>
      </div>

      <AuthenticatedUserDropdown />
    </header>
    )
  );
};

ExpandedHeader.propTypes = {};

export default ExpandedHeader;
