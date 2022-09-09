import React, { useContext } from 'react';

import { useIntl } from '@edx/frontend-platform/i18n';
import { AppContext } from '@edx/frontend-platform/react';
import { Program } from '@edx/paragon/icons';
import { Button } from '@edx/paragon';

import AuthenticatedUserDropdown from './AuthenticatedUserDropdown';

import GreetingBanner from './GreetingBanner';
import ConfirmEmailBanner from './ConfirmEmailBanner';
import { useIsCollapsed } from './hooks';
import messages from './messages';
import './index.scss';

export const UserMenu = () => {
  const { authenticatedUser } = useContext(AppContext);
  return authenticatedUser ? (<AuthenticatedUserDropdown username={authenticatedUser.username} />) : null;
};

export const LearnerDashboardHeader = () => {
  const { formatMessage } = useIntl();
  const isCollapsed = useIsCollapsed();

  return (
    <>
      <ConfirmEmailBanner />
      <div className="flex-column bg-primary">
        <header className="learner-dashboard-header">
          <div className="d-flex">
            {isCollapsed && (<div className="my-auto ml-1"><UserMenu /></div>)}
            {(!isCollapsed) && (
              <Button variant="inverse-tertiary" iconBefore={Program}>
                {formatMessage(messages.switchToProgram)}
              </Button>
            )}
            <div className="flex-grow-1">
              {isCollapsed && <GreetingBanner size="small" />}
            </div>
            {!isCollapsed && (<UserMenu />)}
          </div>
        </header>
        {!isCollapsed && <GreetingBanner size="large" />}
      </div>
    </>
  );
};

LearnerDashboardHeader.propTypes = {
};

export default LearnerDashboardHeader;
