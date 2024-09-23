import React from 'react';

import CoursesPanel from 'containers/CoursesPanel';
import EnterpriseDashboardModal from 'containers/EnterpriseDashboardModal';
import SelectSessionModal from 'containers/SelectSessionModal';
import { RequestKeys } from 'data/constants/requests';
import { reduxHooks } from 'hooks';

import DashboardLayout from './DashboardLayout';
import hooks from './hooks';
import './index.scss';
import LoadingView from './LoadingView';

export const Dashboard = () => {
  hooks.useInitializeDashboard();
  const { pageTitle } = hooks.useDashboardMessages();
  const hasCourses = reduxHooks.useHasCourses();
  const hasAvailableDashboards = reduxHooks.useHasAvailableDashboards();
  const initIsPending = reduxHooks.useRequestIsPending(RequestKeys.initialize);
  const showSelectSessionModal = reduxHooks.useShowSelectSessionModal();

  return (
    <div id="dashboard-container" className="d-flex flex-column">
      <h1 className="sr-only">{pageTitle}</h1>
      {!initIsPending && (
        <>
          {hasAvailableDashboards && <EnterpriseDashboardModal />}
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
