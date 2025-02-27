import React from 'react';

import { reduxHooks } from 'hooks';
import { RequestKeys } from 'data/constants/requests';
import SelectSessionModal from 'containers/SelectSessionModal';
import CoursesPanel from 'containers/CoursesPanel';
import DashboardModalSlot from 'plugin-slots/DashboardModalSlot';

import LoadingView from './LoadingView';
import DashboardLayout from './DashboardLayout';
import hooks from './hooks';
import './index.scss';

export const Dashboard = () => {
  hooks.useInitializeDashboard();
  const { pageTitle } = hooks.useDashboardMessages();
  const hasCourses = reduxHooks.useHasCourses();
  const initIsPending = reduxHooks.useRequestIsPending(RequestKeys.initialize);
  const showSelectSessionModal = reduxHooks.useShowSelectSessionModal();

  return (
    <div id="dashboard-container" className="d-flex flex-column p-2 pt-0">
      <h1 className="sr-only">{pageTitle}</h1>
      {!initIsPending && (
        <>
          <DashboardModalSlot />
          {(hasCourses && showSelectSessionModal) && <SelectSessionModal />}
        </>
      )}
      <div id="dashboard-content" data-testid="dashboard-content">
        {initIsPending
          ? (<LoadingView />)
          : (
            <DashboardLayout>
              <CoursesPanel />
            </DashboardLayout>
          )}
      </div>
    </div>
  );
};

export default Dashboard;
