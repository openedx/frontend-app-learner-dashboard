import React from 'react';
import { useIntl } from 'react-intl';

import {
  Badge,
  Card,
  Hyperlink,
  Icon,
} from '@edx/paragon';
import { Program } from '@edx/paragon/icons';

import shapes from 'data/services/lms/shapes';
import './index.scss';

export const whiteFontWrapper = (node) => (<span className="text-white">{node}</span>);

export const messages = {
  courses: {
    id: 'learnerDashboard.programCard.courses',
    defaultMessage: '{numCourses} Courses',
    description: 'Number of courses in a program, displayed at the bottom of program card',
  },
};

export const ProgramCard = ({ data }) => {
  const { formatMessage } = useIntl();
  const numCoursesMessage = formatMessage(messages.courses, { numCourses: data.numberOfCourses });
  return (
    <Card
      className="program-card d-inline-block bg-primary-500 text-white pb-3.5"
      style={{ width: '18rem', color: 'white' }}
    >
      <Card.ImageCap
        className="program-card-banner"
        src={data.bannerUrl}
        srcAlt="Program banner"
        logoSrc={data.logoUrl}
        logoAlt="Provider logo"
      />
      <Card.Header
        title={whiteFontWrapper(data.title)}
        subtitle={whiteFontWrapper(data.provider)}
      />
      <div className="ml-4">
        <Badge variant="light" className="program-type-badge">
          <Icon src={Program} className="d-inline-block" /> {data.programType}
        </Badge>
        <div className="program-summary mt-2">
          {numCoursesMessage} • {data.estimatedDuration}
        </div>
      </div>
    </Card>
  );
};
ProgramCard.propTypes = {
  data: shapes.programCard.isRequired,
};

export default ProgramCard;
