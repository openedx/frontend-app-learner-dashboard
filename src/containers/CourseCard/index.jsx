import React from 'react';
import PropTypes from 'prop-types';

// import PropTypes from 'prop-types';
import { Card } from '@edx/paragon';

import useCardData from './hooks';

import RelatedProgramsBadge from './components/RelatedProgramsBadge';
import CourseCardMenu from './components/CourseCardMenu';
import {
  CourseBanner,
  CertificateBanner,
  EntitlementBanner,
} from './components/Banners';
import CourseCardActions from './components/CourseCardActions';
import messages from './messages';
import CourseCardDetails from './components/CourseCardDetails';

export const CourseCard = ({ cardId }) => {
  const {
    isEnrolled,
    title,
    bannerUrl,
    formatMessage,
  } = useCardData({ cardId });
  return (
    <div className="mb-4.5 course-card" data-testid="CourseCard">
      <Card orientation="horizontal">
        <Card.ImageCap
          src={bannerUrl}
          srcAlt={formatMessage(messages.bannerAlt)}
        />
        <Card.Body>
          <Card.Header
            title={<span data-testid="CourseCardTitle">{title}</span>}
            actions={<CourseCardMenu cardId={cardId} />}
          />
          <Card.Section>
            <CourseCardDetails cardId={cardId} />
          </Card.Section>
          <Card.Footer
            orientation="vertical"
            textElement={<RelatedProgramsBadge cardId={cardId} />}
          >
            <CourseCardActions cardId={cardId} />
          </Card.Footer>
        </Card.Body>
      </Card>
      <div className="course-card-banners" data-testid="CourseCardBanners">
        <CourseBanner cardId={cardId} />
        <EntitlementBanner cardId={cardId} />
        {isEnrolled && <CertificateBanner cardId={cardId} />}
      </div>
    </div>
  );
};

CourseCard.propTypes = {
  cardId: PropTypes.string.isRequired,
};

CourseCard.defaultProps = {};

export default CourseCard;
