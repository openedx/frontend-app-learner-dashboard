import React from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';
import { Hyperlink, Card } from '@edx/paragon';

import moreCoursesSVG from 'assets/more-courses-sidewidget.svg';

import messages from './messages';

import './index.scss';

export const WidgetSidebar = () => {
  const { formatMessage } = useIntl();
  return (
    <div className="widget-sidebar">
      <div className="d-flex">
        <Card orientation="horizontal">
          <Card.ImageCap
            src={moreCoursesSVG}
            srcAlt="course side widget"
          />
          <Card.Body className="m-auto pr-2">
            <h4>
              {formatMessage(messages.lookingForChallengePrompt)}
            </h4>
            <Hyperlink variant="brand" destination="#">
              {formatMessage(messages.findCoursesButton)}
            </Hyperlink>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default WidgetSidebar;
