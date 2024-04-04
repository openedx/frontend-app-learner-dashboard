import React from 'react';

import { useIntl } from '@edx/frontend-platform/i18n';
import { Card, Hyperlink, Icon } from '@openedx/paragon';
import { ArrowForward } from '@openedx/paragon/icons';

import { reduxHooks } from 'hooks';
import moreCoursesSVG from 'assets/more-courses-sidewidget.svg';
import { baseAppUrl } from 'data/services/lms/urls';

import track from '../RecommendationsPanel/track';
import messages from './messages';
import './index.scss';

export const arrowIcon = (<Icon className="mx-1" src={ArrowForward} />);

export const LookingForChallengeWidget = () => {
  const { formatMessage } = useIntl();
  const { courseSearchUrl } = reduxHooks.usePlatformSettingsData();
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
            destination={baseAppUrl(courseSearchUrl)}
            onClick={track.findCoursesWidgetClicked(baseAppUrl(courseSearchUrl))}
            className="d-flex align-items-center"
          >
            {formatMessage(messages.findCoursesButton, { arrow: arrowIcon })}
          </Hyperlink>
        </h5>
      </Card.Body>
    </Card>
  );
};

LookingForChallengeWidget.propTypes = {};

export default LookingForChallengeWidget;
