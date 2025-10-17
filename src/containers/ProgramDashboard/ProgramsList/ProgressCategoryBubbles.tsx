import React from 'react';
import { Bubble, Stack } from '@openedx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';
import messages from './messages';

import { Progress } from '../data/types';

const ProgressCategoryBubbles: React.FC<Progress> = ({ notStarted, inProgress, completed }) => {
  const { formatMessage } = useIntl();
  return (
    <Stack direction="horizontal" gap={2} className="flex-wrap">
      <Stack direction="vertical" className="align-items-center" gap={1}>
        <Bubble className="bg-gray-500" data-testid="remaining-count">
          {notStarted}
        </Bubble>
        <div>
          {formatMessage(messages.progressCategoryBubblesRemaining)}
        </div>
      </Stack>

      <Stack direction="vertical" className="align-items-center" gap={1}>
        <Bubble data-testid="in-progress-count">
          {inProgress}
        </Bubble>
        <div>
          {formatMessage(messages.progressCategoryBubblesInProgress)}
        </div>
      </Stack>

      <Stack direction="vertical" className="align-items-center" gap={1}>
        <Bubble className="bg-success-500" data-testid="completed-count">
          {completed}
        </Bubble>
        <div>
          {formatMessage(messages.progressCategoryBubblesSuccess)}
        </div>
      </Stack>
    </Stack>
  );
};

export default ProgressCategoryBubbles;
