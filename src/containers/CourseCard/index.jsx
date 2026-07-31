import React from 'react';
import PropTypes from 'prop-types';

import { Card } from '@openedx/paragon';

import CourseCardBanners from './components/CourseCardBanners';
import CourseCardImage from './components/CourseCardImage';
import CourseCardMenu from './components/CourseCardMenu';
import CourseCardActions from './components/CourseCardActions';
import CourseCardDetails from './components/CourseCardDetails';
import CourseCardMeta from './components/CourseCardMeta';
import CourseCardTitle from './components/CourseCardTitle';

import './CourseCard.scss';

export const CourseCard = ({
  cardId,
}) => (
  <div className="mb-4.5 course-card" id={cardId} data-testid="CourseCard">
    <Card orientation="vertical">
      <CourseCardImage cardId={cardId} orientation="vertical" />
      <Card.Body>
        <Card.Header title={<CourseCardTitle cardId={cardId} />} />
        <Card.Section className="pt-0">
          <CourseCardMeta cardId={cardId} />
          <CourseCardDetails cardId={cardId} />
        </Card.Section>
        <Card.Footer orientation="horizontal">
          <CourseCardActions cardId={cardId} />
          <CourseCardMenu cardId={cardId} />
        </Card.Footer>
      </Card.Body>
      <CourseCardBanners cardId={cardId} />
    </Card>
  </div>
);
CourseCard.propTypes = {
  cardId: PropTypes.string.isRequired,
};

export default CourseCard;
