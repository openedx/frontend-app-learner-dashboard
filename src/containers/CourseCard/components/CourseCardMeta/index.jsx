import React from 'react';
import PropTypes from 'prop-types';

import { useIntl } from '@edx/frontend-platform/i18n';
import { Icon, ProgressBar } from '@openedx/paragon';
import { Schedule, Star, Videocam } from '@openedx/paragon/icons';

import { useCourseData } from 'hooks';
import useCourseCardMeta from './hooks';
import messages from './messages';

import './index.scss';

export const CourseCardMeta = ({ cardId }) => {
  const { formatMessage } = useIntl();
  const courseData = useCourseData(cardId);
  const description = courseData?.course?.shortDescription;

  const {
    providerDisplayName,
    contentType,
    durationLabel,
    dueDateLabel,
    rating,
    isOverdue,
    daysOverdue,
    hasStarted,
    progressPercent,
  } = useCourseCardMeta(cardId);

  const providerName = providerDisplayName || courseData?.courseProvider?.name;

  return (
    <div className="course-card-meta" data-testid="CourseCardMeta">
      <div className="course-card-meta-byline">
        {providerName && (
          <span className="course-card-meta-provider">
            {formatMessage(messages.byProvider, { providerName })}
          </span>
        )}
        <span className="course-card-meta-rating">
          <Icon src={Star} className="course-card-meta-star-icon" />
          {rating.toFixed(1)}
        </span>
      </div>

      {description && (
        <p className="course-card-meta-description">{description}</p>
      )}

      <div className="course-card-meta-chips">
        <span className="course-card-meta-chip">
          <Icon src={Videocam} className="course-card-meta-chip-icon" />
          {contentType}
        </span>
        <span className="course-card-meta-chip course-card-meta-chip-plain">
          <Icon src={Schedule} className="course-card-meta-chip-icon" />
          {durationLabel}
        </span>
        <span className="course-card-meta-chip course-card-meta-chip-plain">
          <Icon src={Schedule} className="course-card-meta-chip-icon" />
          {dueDateLabel}
        </span>
      </div>

      {hasStarted && (
        <div className="course-card-meta-progress">
          <div className="course-card-meta-progress-label">
            <span>{formatMessage(messages.inProgressLabel)}</span>
            <span>{progressPercent}%</span>
          </div>
          <ProgressBar now={progressPercent} variant="success" className="rounded-full" />
        </div>
      )}

      {isOverdue && (
        <p className="course-card-meta-status-line course-card-meta-status-line--overdue">
          {formatMessage(messages.overdueStatusMessage, { days: daysOverdue })}
        </p>
      )}
    </div>
  );
};

CourseCardMeta.propTypes = {
  cardId: PropTypes.string.isRequired,
};

export default CourseCardMeta;
