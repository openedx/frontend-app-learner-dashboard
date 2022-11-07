import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from '@edx/frontend-platform/i18n';

// import PropTypes from 'prop-types';
import { Card, Badge } from '@edx/paragon';

import { hooks as appHooks } from 'data/redux';

import verifiedRibbon from 'assets/verified-ribbon.png';
import RelatedProgramsBadge from './RelatedProgramsBadge';
import CourseCardMenu from './CourseCardMenu';
import CourseCardActions from './CourseCardActions';
import CourseCardDetails from './CourseCardDetails';

import messages from '../messages';

export const CourseCardContent = ({ cardId, orientation }) => {
  const { formatMessage } = useIntl();
  const { courseName, bannerImgSrc } = appHooks.useCardCourseData(cardId);
  const { homeUrl } = appHooks.useCardCourseRunData(cardId);
  const { isVerified } = appHooks.useCardEnrollmentData(cardId);
  return (
    <>
      <a className={`pgn__card-wrapper-image-cap overflow-visible ${orientation}`} href={homeUrl}>
        <img
          className="pgn__card-image-cap"
          src={bannerImgSrc}
          alt={formatMessage(messages.bannerAlt)}
        />
        {
          isVerified && (
            <span className="course-card-verify-ribbon-container" title={formatMessage(messages.verifiedHoverDescription)}>
              <Badge as="div" variant="success" className="w-100">{formatMessage(messages.verifiedBanner)}</Badge>
              <img src={verifiedRibbon} alt={formatMessage(messages.verifiedBannerRibbonAlt)} />
            </span>
          )
        }
      </a>
      <Card.Body>
        <Card.Header
          title={(
            <h3>
              <a
                href={homeUrl}
                className="course-card-title"
                data-testid="CourseCardTitle"
              >
                {courseName}
              </a>
            </h3>
          )}
          actions={<CourseCardMenu cardId={cardId} />}
        />
        <Card.Section className="pt-0">
          <CourseCardDetails cardId={cardId} />
        </Card.Section>
        <Card.Footer orientation={orientation}>
          <RelatedProgramsBadge cardId={cardId} />
          <CourseCardActions cardId={cardId} />
        </Card.Footer>
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
