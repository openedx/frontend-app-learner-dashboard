import React from 'react';
import PropTypes from 'prop-types';

import { useIntl } from '@edx/frontend-platform/i18n';
import {
  Badge,
  Card,
  // Hyperlink,
  Icon,
} from '@edx/paragon';
import { Program } from '@edx/paragon/icons';

import messages from './messages';
import './index.scss';

export const whiteFontWrapper = (node) => (<span className="text-white">{node}</span>);

export const ProgramCard = ({ data }) => {
  const { formatMessage } = useIntl();
  const numCoursesMessage = formatMessage(
    messages.courses,
    { numCourses: data.numberOfCourses },
  );
  const durationMessage = formatMessage(
    messages.duration,
    { numWeeks: data.estimatedNumberOfWeeks },
  );
  return (
    <Card
      className="program-card d-inline-block bg-primary-500 text-white pb-3.5"
      style={{ width: '18rem', color: 'white' }}
    >
      <Card.ImageCap
        className="program-card-banner"
        src={data.bannerUrl}
        srcAlt={formatMessage(messages.bannerAlt)}
        logoSrc={data.logoUrl}
        logoAlt={formatMessage(messages.logoAlt)}
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
          {numCoursesMessage} • {durationMessage}
        </div>
      </div>
    </Card>
  );
};
ProgramCard.propTypes = {
  data: PropTypes.shape({
    estimatedNumberOfWeeks: PropTypes.number,
    numberOfCourses: PropTypes.number,
    bannerUrl: PropTypes.string,
    logoUrl: PropTypes.string,
    title: PropTypes.string,
    provider: PropTypes.string,
    programType: PropTypes.string,
    programUrl: PropTypes.string,
    programTypeUrl: PropTypes.string,
  }).isRequired,
};

export default ProgramCard;
