import React from 'react';
import PropTypes from 'prop-types';

import { useIntl } from '@edx/frontend-platform/i18n';
import { Card, Hyperlink, Icon } from '@edx/paragon';
import { ArrowForward } from '@edx/paragon/icons';

import { hooks } from 'data/redux';
import moreCoursesSVG from 'assets/more-courses-sidewidget.svg';

import messages from './messages';
import './index.scss';

export const arrowIcon = (<Icon className="mx-1" src={ArrowForward} />);

export const LookingForChallengeWidget = ({
  courseSearchClickTracker,
}) => {
  const { courseSearchUrl } = hooks.usePlatformSettingsData();
  const { formatMessage } = useIntl();
  return (
    <Card orientation="horizontal" id="looking-for-challenge-widget">
      <Card.ImageCap
        src={moreCoursesSVG}
        srcAlt="course side widget"
      />
      <Card.Body className="m-auto pr-2">
        <h4>
          {formatMessage(messages.lookingForChallengePrompt)}
        </h4>
        <h5>
          <Hyperlink
            variant="brand"
            destination={courseSearchUrl}
            onClick={courseSearchClickTracker}
            className="d-flex align-items-center"
          >
            {formatMessage(messages.findCoursesButton, { arrow: arrowIcon })}
          </Hyperlink>
        </h5>
      </Card.Body>
    </Card>
  );
};

LookingForChallengeWidget.propTypes = {
  courseSearchClickTracker: PropTypes.func.isRequired,
};

export default LookingForChallengeWidget;
