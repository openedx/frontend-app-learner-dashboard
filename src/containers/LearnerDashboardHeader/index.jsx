import React, { useContext } from 'react';

import { useIntl } from '@edx/frontend-platform/i18n';
import { AppContext } from '@edx/frontend-platform/react';
import { Program } from '@edx/paragon/icons';
import { Button, Image } from '@edx/paragon';

import topBanner from 'assets/top_stripe.svg';
import MasqueradeBar from 'containers/MasqueradeBar';
import urls from 'data/services/lms/urls';

import AuthenticatedUserDropdown from './AuthenticatedUserDropdown';
import GreetingBanner from './GreetingBanner';
import ConfirmEmailBanner from './ConfirmEmailBanner';

import { useIsCollapsed } from './hooks';
import messages from './messages';
import './index.scss';

const { programsUrl } = urls;

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
        {!(isCollapsed) && (
          <Image className="d-block w-100" src={topBanner} />
        )}
        <header className="learner-dashboard-header">
          <div className="d-flex">
            {(!isCollapsed) && (
              <Button as="a" href={programsUrl} variant="inverse-tertiary" iconBefore={Program}>
                {formatMessage(messages.switchToProgram)}
              </Button>
            )}
            <div className="flex-grow-1">
              {isCollapsed && <GreetingBanner size="small" />}
            </div>
            {isCollapsed
              ? (<div className="my-auto ml-1"><UserMenu /></div>)
              : (<UserMenu />)}
          </div>
        </header>
        {!isCollapsed && <GreetingBanner size="large" />}
      </div>
      <MasqueradeBar />
    </>
  );
};

LearnerDashboardHeader.propTypes = {
};

export default LearnerDashboardHeader;
