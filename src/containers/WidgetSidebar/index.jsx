import React from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';
import { Card, Hyperlink, Icon } from '@edx/paragon';
import { ArrowForward } from '@edx/paragon/icons';

import moreCoursesSVG from 'assets/more-courses-sidewidget.svg';

import messages from './messages';

export const arrowIcon = (<Icon className="mx-1" src={ArrowForward} />);

export const WidgetSidebar = () => {
  const { formatMessage } = useIntl();
  return (
    <div className="widget-sidebar px-2 mt-5 pt-3">
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
            <Hyperlink variant="brand" destination="#" className="d-flex">
              {formatMessage(messages.findCoursesButton, { arrow: arrowIcon })}
            </Hyperlink>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default WidgetSidebar;
