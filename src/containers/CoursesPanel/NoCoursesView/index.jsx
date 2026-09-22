import React from 'react';
import { getLinkProps, useIntl } from '@openedx/frontend-base';
import { Button, Image } from '@openedx/paragon';
import { Search } from '@openedx/paragon/icons';
import { coursesUrl } from '@src/data/services/lms/urls';

import emptyCourseSVG from '@src/assets/empty-course.svg';
import { useInitializeLearnerHome } from '@src/data/hooks';

import messages from './messages';
import './index.scss';

export const NoCoursesView = () => {
  const { formatMessage } = useIntl();
  const { data: learnerData } = useInitializeLearnerHome();
  const courseSearchUrl = learnerData?.platformSettings?.courseSearchUrl || '';
  return (
    <div
      id="no-courses-content-view"
      className="d-flex align-items-center justify-content-center mb-4.5"
    >
      <Image src={emptyCourseSVG} alt={formatMessage(messages.bannerAlt)} />
      <h3 className="h1">
        {formatMessage(messages.lookingForChallengePrompt)}
      </h3>
      <p>
        {formatMessage(messages.exploreCoursesPrompt)}
      </p>
      <Button
        variant="brand"
        {...getLinkProps(coursesUrl(courseSearchUrl))}
        iconBefore={Search}
      >
        {formatMessage(messages.exploreCoursesButton)}
      </Button>
    </div>
  );
};

export default NoCoursesView;
