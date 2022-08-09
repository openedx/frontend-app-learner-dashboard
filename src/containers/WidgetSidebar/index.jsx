import React from 'react';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { Hyperlink, Card } from '@edx/paragon';

import moreCoursesSVG from 'assets/more-courses-sidewidget.svg';

import messages from './messages';

import './index.scss';

export const WidgetSidebar = () => (
  <div className="widget-sidebar">
    <div className="d-flex">

      {/* <img src='more-courses-sidewidget.svg' />
      <div>
        <h3>
          <FormattedMessage {...messages.lookingForChallengePrompt} />
        </h3>
        <Hyperlink variant='brand' destination='#'>
          <FormattedMessage {...messages.findCoursesButton} />
        </Hyperlink>
      </div> */}

      <Card orientation="horizontal" className="mb-4">
        <Card.ImageCap
          src={moreCoursesSVG}
          srcAlt="course side widget"
        />
        <Card.Body>
          <h3>
            <FormattedMessage {...messages.lookingForChallengePrompt} />
          </h3>
          <Hyperlink variant="brand" destination="#">
            <FormattedMessage {...messages.findCoursesButton} />
          </Hyperlink>
        </Card.Body>
      </Card>
    </div>
  </div>
);

export default WidgetSidebar;
