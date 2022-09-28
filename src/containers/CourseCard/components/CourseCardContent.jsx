import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from '@edx/frontend-platform/i18n';

// import PropTypes from 'prop-types';
import { Card } from '@edx/paragon';

import { hooks as appHooks } from 'data/redux';

import RelatedProgramsBadge from './RelatedProgramsBadge';
import CourseCardMenu from './CourseCardMenu';
import CourseCardActions from './CourseCardActions';
import CourseCardDetails from './CourseCardDetails';

import messages from '../messages';

export const CourseCardContent = ({ cardId, orientation }) => {
  const { formatMessage } = useIntl();
  const { courseName, bannerImgSrc } = appHooks.useCardCourseData(cardId);
  const { homeUrl } = appHooks.useCardCourseRunData(cardId);
  return (
    <>
      <a className="pgn__card-wrapper-image-cap horizontal" href={homeUrl}>
        <img
          className="pgn__card-image-cap"
          src={bannerImgSrc}
          alt={formatMessage(messages.bannerAlt)}
        />
      </a>
      <Card.Body>
        <Card.Header
          title={(
            <a href={homeUrl} data-testid="CourseCardTitle">
              {courseName}
            </a>
          )}
          actions={<CourseCardMenu cardId={cardId} />}
        />
        <Card.Section className="pt-0">
          <CourseCardDetails cardId={cardId} />
        </Card.Section>
        {orientation === 'vertical'
          ? (
            <>
              <RelatedProgramsBadge cardId={cardId} />
              <Card.Footer orientation="horizontal">
                <CourseCardActions cardId={cardId} />
              </Card.Footer>
            </>
          ) : (
            <Card.Footer
              orientation="vertical"
              textElement={<RelatedProgramsBadge cardId={cardId} />}
            >
              <CourseCardActions cardId={cardId} />
            </Card.Footer>
          )}
      </Card.Body>
    </>
  );
};

CourseCardContent.propTypes = {
  cardId: PropTypes.string.isRequired,
  orientation: PropTypes.string.isRequired,
};

CourseCardContent.defaultProps = {};

export default CourseCardContent;
