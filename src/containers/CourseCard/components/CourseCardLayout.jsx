import React from 'react';
import PropTypes from 'prop-types';

import { Card } from '@edx/paragon';

import { useIsCollapsed } from '../hooks';
import CourseCardBanners from './CourseCardBanners';
import CourseCardContent from './CourseCardContent';

export const CourseCardLayout = ({
  cardId,
}) => {
  const isCollapsed = useIsCollapsed();
  return (
    <div className="mb-4.5 course-card" data-testid="CourseCard">
      <Card orientation={isCollapsed ? 'vertical' : 'horizontal'}>
        <div className="d-flex flex-column w-100">
          <div className="d-flex">
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
