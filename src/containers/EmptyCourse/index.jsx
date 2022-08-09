import React from 'react';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import {
  Button,
  Image,
} from '@edx/paragon';

import emptyCourseSVG from 'assets/empty-course.svg';

import SuggestedCourses from './SuggestedCourses';
import messages from './messages';
import './index.scss';

export const EmptyCourse = () => (
  <div className="p-3">
    <div className="empty-course-hero">
      <Image src={emptyCourseSVG} alt="empty course banner" />
      <h1>
        <FormattedMessage {...messages.lookingForChallengePrompt} />
      </h1>
      <p>
        <FormattedMessage {...messages.exploreCoursesPrompt} />
      </p>
      <Button variant="brand">
        <FormattedMessage {...messages.exploreCoursesButton} />
      </Button>
    </div>
    <SuggestedCourses />
  </div>
);

export default EmptyCourse;
