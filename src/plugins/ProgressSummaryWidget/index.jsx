import React from 'react';

import { useIntl } from '@edx/frontend-platform/i18n';
import {
  Card, Icon, ProgressBar,
} from '@openedx/paragon';
import { TrendingUp } from '@openedx/paragon/icons';

import useProgressSummaryData from './hooks';
import messages from './messages';
import { formatTimeSpent } from 'utils/timeTracking';
import './index.scss';

export const ProgressSummaryWidget = () => {
  const { formatMessage } = useIntl();
  const {
    total, completed, inProgress, overallProgress, totalTimeSpent,
  } = useProgressSummaryData();

  if (total === 0) {
    return null;
  }

  return (
    <Card id="progress-summary-widget">
      <Card.Header
        title={(
          <span className="d-flex align-items-center">
            <Icon src={TrendingUp} className="mr-2" />
            {formatMessage(messages.title)}
          </span>
        )}
      />
      <Card.Section>
        <div className="progress-summary-overall">
          <div className="d-flex justify-content-between text-slate-500 font-regular text-regular">
            <span>{formatMessage(messages.overallProgress)}</span>
            <span className="text-slate-800" data-testid="overall-progress-value">
              {overallProgress}%
            </span>
          </div>
          <ProgressBar now={overallProgress} className="mt-1 rounded-full" variant="success" />
        </div>
        <div className="progress-summary-stats">
          <div className="progress-summary-stat">
            <div className="progress-summary-stat-value">{inProgress}</div>
            <div className="progress-summary-stat-label">{formatMessage(messages.inProgress)}</div>
          </div>
          <div className="progress-summary-stat">
            <div className="progress-summary-stat-value">{completed}</div>
            <div className="progress-summary-stat-label">{formatMessage(messages.completed)}</div>
          </div>
          <div className="progress-summary-stat">
            <div className="progress-summary-stat-value">{formatTimeSpent(totalTimeSpent)}</div>
            <div className="progress-summary-stat-label">{formatMessage(messages.totalTimeSpent)}</div>
          </div>
        </div>
      </Card.Section>
    </Card>
  );
};

ProgressSummaryWidget.propTypes = {};

export default ProgressSummaryWidget;
