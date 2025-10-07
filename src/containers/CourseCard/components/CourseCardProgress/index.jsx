import PropTypes from 'prop-types';

import { Card, ProgressBar } from '@openedx/paragon';

import useCardProgressData from './hooks';
import './index.scss';

export const CourseCardProgress = ({ cardId }) => {
  const {
    shouldRender,
    progress,
    completeCount,
    totalCount,
    loading,
    variant,
    loadingLabel,
  } = useCardProgressData({ cardId });

  if (!shouldRender) {
    return null;
  }

  const progressLabel = `${completeCount} out of ${totalCount} Units completed (${progress}%)`;

  return (
    <Card.Section className="pt-0 pb-2" data-testid="CourseCardProgress">
      <div className="course-progress-section">
        <div className="progress-header">
          <span className="progress-label">
            {progressLabel}
            {loading && <span className="loading-indicator">({loadingLabel})</span>}
          </span>
        </div>
        <ProgressBar
          now={progress}
          variant={variant}
          className="progress-bar"
          animated={loading}
        />
      </div>
    </Card.Section>
  );
};

CourseCardProgress.propTypes = {
  cardId: PropTypes.string.isRequired,
};

CourseCardProgress.defaultProps = {};

export default CourseCardProgress;
