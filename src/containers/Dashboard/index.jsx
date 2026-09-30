import React, { useMemo } from 'react';

import { FormattedMessage } from '@openedx/frontend-base';
import { useSelectSessionModal } from '@src/data/context';
import { useInitializeLearnerHome } from '@src/data/hooks';
import { useIsPathwayPilotUIEnabled } from '@src/hooks';
import SelectSessionModal from '../../containers/SelectSessionModal';
import CoursesPanel from '../../containers/CoursesPanel';
import DashboardModalSlot from '../../slots/DashboardModalSlot';

import LoadingView from './LoadingView';
import DashboardLayout from './DashboardLayout';
import hooks from './hooks';
import './index.scss';
import messages from './messages';

export const Dashboard = () => {
  const { data, isPending } = useInitializeLearnerHome();
  const { pageTitle } = hooks.useDashboardMessages();
  const { selectSessionModal } = useSelectSessionModal();
  const showSelectSessionModal = selectSessionModal.cardId !== null;

  const hasCourses = useMemo(() => data?.courses?.length > 0, [data]);

  return (
    <div id="learnerdashboardroot">
      <main>
        <div id="dashboard-container" className="d-flex flex-column p-2 pt-0">
          <h1 className="sr-only">{pageTitle}</h1>
          {!isPending && (
            <>
              <DashboardModalSlot />
              {(hasCourses && showSelectSessionModal) && <SelectSessionModal />}
            </>
          )}
          <div id="dashboard-content" data-testid="dashboard-content">
            {isPending
              ? (<LoadingView />)
              : (
                <DashboardLayout>
                  {useIsPathwayPilotUIEnabled() && (
                    <h2 className="dashboard-title">
                      <FormattedMessage {...messages.dashboardTitle} />
                    </h2>
                  )}
                  <CoursesPanel />
                </DashboardLayout>
              )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
