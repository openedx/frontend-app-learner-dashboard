import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

// import PropTypes from 'prop-types';
import { Card } from '@edx/paragon';

import { useIsCollapsed } from './hooks';
import CourseCardContent from './components/CourseCardContent';
import CourseCardBanners from './components/CourseCardBanners';

import './CourseCard.scss';

export const CourseCard = ({
  cardId,
}) => {
  const isCollapsed = useIsCollapsed();
  const orientation = isCollapsed ? 'vertical' : 'horizontal';
  return (
    <div className="mb-4.5 course-card" data-testid="CourseCard">
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
