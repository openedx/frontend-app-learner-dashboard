import PropTypes from 'prop-types';
import React from 'react';

import { Card } from '@openedx/paragon';

import CourseCardActions from './components/CourseCardActions';
import CourseCardBanners from './components/CourseCardBanners';
import CourseCardDetails from './components/CourseCardDetails';
import CourseCardImage from './components/CourseCardImage';
import CourseCardMenu from './components/CourseCardMenu';
import CourseCardTitle from './components/CourseCardTitle';
import { useIsCollapsed } from './hooks';

import './CourseCard.scss';

export const CourseCard = ({
  cardId,
}) => {
  const isCollapsed = useIsCollapsed();
  const orientation = isCollapsed ? 'vertical' : 'horizontal';
  return (
    <div className="mb-4.5 course-card" id={cardId} data-testid="CourseCard">
      <Card orientation={orientation}>
        <div className="d-flex flex-column w-100">
          <div {...(!isCollapsed && { className: 'd-flex' })}>
            <CourseCardImage cardId={cardId} />
            <Card.Body className="flex-column d-flex">
              <Card.Header
                title={<CourseCardTitle cardId={cardId} />}
                actions={<CourseCardMenu cardId={cardId} />}
              />
              <Card.Section className="pt-auto">
                <CourseCardDetails cardId={cardId} />
              </Card.Section>
              <hr />
              <Card.Footer orientation={orientation}>
                <CourseCardActions cardId={cardId} />
              </Card.Footer>
              <CourseCardBanners cardId={cardId} className=" h-200" />
            </Card.Body>
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
