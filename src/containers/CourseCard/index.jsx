import React from 'react';
import PropTypes from 'prop-types';

import { Card } from '@openedx/paragon';

import { useIsCollapsed } from '../DashboardCard/hooks';
import CourseCardBanners from './components/CourseCardBanners';
import CourseCardImage from './components/CourseCardImage';
import CourseCardActions from './components/CourseCardActions';
import CourseCardDetails from './components/CourseCardDetails';
import CourseCardTitle from './components/CourseCardTitle';
import { CourseHaderActions } from './components/CourseHeaderActions';

import './CourseCard.scss';
import 'containers/DashboardCard/Card.scss';

export const CourseCard = ({
  cardId,
}) => {
  const isCollapsed = useIsCollapsed();
  const orientation = isCollapsed ? 'vertical' : 'horizontal';
  return (
    <div className="mb-4.5 dashboard-card course-card" id={cardId} data-testid="CourseCard">
      <Card orientation={orientation}>
        <div className="d-flex flex-column w-100">
          <div {...(!isCollapsed && { className: 'd-flex' })}>
            <CourseCardImage cardId={cardId} orientation="horizontal" />
            <Card.Body>
              <Card.Header
                title={<CourseCardTitle cardId={cardId} />}
                actions={<CourseHaderActions cardId={cardId} />}
              />
              <Card.Section className="pt-0">
                <CourseCardDetails cardId={cardId} />
              </Card.Section>
              <Card.Footer orientation={orientation}>
                <CourseCardActions cardId={cardId} />
              </Card.Footer>
            </Card.Body>
          </div>
          <CourseCardBanners cardId={cardId} />
        </div>
      </Card>
    </div>
  );
};
CourseCard.propTypes = {
  cardId: PropTypes.string.isRequired,
};

export default CourseCard;
