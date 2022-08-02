import React, { useContext } from 'react';

import { useIntl } from '@edx/frontend-platform/i18n';
import { AppContext } from '@edx/frontend-platform/react';
import { Program } from '@edx/paragon/icons';
import { Button } from '@edx/paragon';

import AuthenticatedUserDropdown from './AuthenticatedUserDropdown';
import GreetingBanner from './GreetingBanner';
import messages from './messages';
import ConfirmEmailBanner from './ConfirmEmailBanner';

export const LearnerDashboardHeader = () => {
  const { authenticatedUser } = useContext(AppContext);
  const { formatMessage } = useIntl();
  return (
    <div className="d-flex flex-column bg-primary">
      <ConfirmEmailBanner />
      <header className="learner-dashboard-header">
        <div className="d-flex">
          <Button variant="inverse-tertiary" iconBefore={Program}>
            {formatMessage(messages.switchToProgram)}
          </Button>
          <div className="flex-grow-1" />
          {authenticatedUser && (
            <AuthenticatedUserDropdown username={authenticatedUser.username} />
          )}
        </div>
      </header>
      <GreetingBanner />
    </div>
  );
};

LearnerDashboardHeader.propTypes = {
};

export default LearnerDashboardHeader;
