import React from 'react';
import classNames from 'classnames';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { Button, Image } from '@edx/paragon';
import { Search } from '@edx/paragon/icons';

import emptyCourseSVG from 'assets/empty-course.svg';

import { hooks as appHooks } from 'data/redux';
import messages from './messages';

import './index.scss';

export const NoCoursesView = () => {
  const { courseSearchUrl } = appHooks.usePlatformSettingsData();
  return (
    <div
      className={classNames(
        'd-flex align-items-center justify-content-center empty-course-hero',
      )}
    >
      <Image src={emptyCourseSVG} alt="empty course banner" />
      <h1>
        <FormattedMessage {...messages.lookingForChallengePrompt} />
      </h1>
      <p>
        <FormattedMessage {...messages.exploreCoursesPrompt} />
      </p>
      <Button
        variant="brand"
        as="a"
        href={courseSearchUrl}
        iconBefore={Search}
      >
        <FormattedMessage {...messages.exploreCoursesButton} />
      </Button>
    </div>
  );
};

export default NoCoursesView;
