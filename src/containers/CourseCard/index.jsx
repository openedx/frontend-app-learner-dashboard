import React from 'react';
import PropTypes from 'prop-types';

import { Card } from '@openedx/paragon';

import { useIsCollapsed } from './hooks';
import CourseCardBanners from './components/CourseCardBanners';
import CourseCardImage from './components/CourseCardImage';
import CourseHeaderActions from './components/CourseHeaderActions';
import CourseCardActions from './components/CourseCardActions';
import CourseCardDetails from './components/CourseCardDetails';
import CourseCardTitle from './components/CourseCardTitle';

import './CourseCard.scss';
import { CourseCardPathways } from './components/CourseCardPathways';
import { useIsPathwayPilotUIEnabled } from '@src/hooks';

export const CourseCard = ({
  cardId,
}) => {
  const isCollapsed = useIsCollapsed();
  const orientation = isCollapsed ? 'vertical' : 'horizontal';
  return (
    <div className="mb-4.5 course-card" id={cardId} data-testid="CourseCard">
      <Card orientation={orientation}>
        <div className="d-flex flex-column w-100">
          {useIsPathwayPilotUIEnabled() && (
            <CourseCardPathways cardId={cardId} />
          )}
          <div {...(!isCollapsed && { className: 'd-flex' })}>
            <CourseCardImage cardId={cardId} orientation="horizontal" />
            <Card.Body>
              <Card.Header
                title={<CourseCardTitle cardId={cardId} />}
                actions={<CourseHeaderActions cardId={cardId} />}
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
