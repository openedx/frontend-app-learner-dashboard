import React from 'react';
import messages from './messages';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { Button } from '@edx/paragon'

import './index.scss';

export const EmptyCourse = () => (
  <div className='empty-course'>
    <img src='empty-course.svg' />
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
);

export default EmptyCourse;
