import React from 'react';
import PropTypes from 'prop-types';

// import PropTypes from 'prop-types';
import { Card } from '@edx/paragon';

import { isMobileSize } from 'data/responsive';

import CourseCardContent from './components/CourseCardContent';
import CourseCardBanners from './components/CourseCardBanners';

import './CourseCard.scss';

export const CourseCard = ({
  cardId,
}) => {
  const isCollapsed = isMobileSize();
  const orientation = isCollapsed ? 'vertical' : 'horizontal';
  return (
    <div className="mb-4.5 course-card" id={cardId} data-testid="CourseCard">
      <Card orientation={orientation}>
        <div className="d-flex flex-column w-100">
          <div {...(!isCollapsed && { className: 'd-flex' })}>
            <CourseCardContent cardId={cardId} orientation={orientation} />
          </div>
          <div className="course-card-banners" data-testid="CourseCardBanners">
            <CourseCardBanners cardId={cardId} />
          </div>
        </div>
      </Card>
    </div>
  );
};
CourseCard.propTypes = {
  cardId: PropTypes.string.isRequired,
};

export default CourseCard;
