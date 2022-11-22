import React from 'react';
import PropTypes from 'prop-types';

import { Card } from '@edx/paragon';

import { useIsCollapsed } from '../hooks';
import CourseCardBanners from './CourseCardBanners';
import CourseCardImage from './CourseCardImage';
import CourseCardMenu from './CourseCardMenu';
import CourseCardActions from './CourseCardActions';
import CourseCardDetails from './CourseCardDetails';
import CourseCardTitle from './CourseCardTitle';
import RelatedProgramsBadge from './RelatedProgramsBadge';

export const CourseCardLayout = ({
  cardId,
}) => {
  const isCollapsed = useIsCollapsed();
  const orientation = isCollapsed ? 'vertical' : 'horizontal';
  return (
    <div className="mb-4.5 course-card" data-testid="CourseCard">
      <Card orientation={orientation}>
        <div className="d-flex flex-column w-100">
          <div className="d-flex">
            <CourseCardImage cardId={cardId} />
            <Card.Body>
              <Card.Header
                title={<CourseCardTitle cardId={cardId} />}
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
            <CourseCardContent cardId={cardId} />
          </div>
          <div className="course-card-banners" data-testid="CourseCardBanners">
            <CourseCardBanners cardId={cardId} />
          </div>
        </div>
      </Card>
    </div>
  );
};
CourseCardLayout.propTypes = {
  cardId: PropTypes.string.isRequired,
};

export default CourseCardLayout;
