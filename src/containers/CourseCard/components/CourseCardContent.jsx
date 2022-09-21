import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from '@edx/frontend-platform/i18n';

// import PropTypes from 'prop-types';
import { Card } from '@edx/paragon';

import { hooks as appHooks } from 'data/redux';

import RelatedProgramsBadge from './RelatedProgramsBadge';
import CourseCardMenu from './CourseCardMenu';

import messages from '../messages';
import CourseCardActions from './CourseCardActions';
import CourseCardDetails from './CourseCardDetails';

export const CourseCardContent = ({ cardId, orientation }) => {
  const { formatMessage } = useIntl();
  const { courseName, bannerImgSrc } = appHooks.useCardCourseData(cardId);
  return (
    <>
      <Card.ImageCap
        src={bannerImgSrc}
        srcAlt={formatMessage(messages.bannerAlt)}
      />
      <Card.Body>
        <Card.Header
          title={<span data-testid="CourseCardTitle">{courseName}</span>}
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
