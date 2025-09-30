import PropTypes from 'prop-types';

import { Card, ProgressBar } from '@openedx/paragon';

import useCardProgressData from './hooks';
import './index.scss';

export const CourseCardProgress = ({ cardId }) => {
  const {
    shouldRender,
    progress,
    loading,
    variant,
    progressLabel,
    loadingLabel,
  } = useCardProgressData({ cardId });

  if (!shouldRender) {
    return null;
  }

  return (
    <Card.Section className="pt-0 pb-2" data-testid="CourseCardProgress">
      <div className="course-progress-section">
        <div className="progress-header">
          <span className="progress-label">
            {progressLabel}
            {loading && <span className="loading-indicator">({loadingLabel})</span>}
          </span>
          <span className="progress-percentage">{progress}%</span>
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