import React from 'react';

import { hooks as appHooks } from 'data/redux';
import { RequestKeys } from 'data/constants/requests';
import EmptyCourse from 'containers/EmptyCourse';
import EnterpriseDashboardModal from 'containers/EnterpriseDashboardModal';
import SelectSessionModal from 'containers/SelectSessionModal';

import LoadingView from './LoadingView';
import LoadedView from './LoadedView';
import hooks from './hooks';

import './index.scss';

export const Dashboard = () => {
  hooks.useInitializeDashboard();
  const { pageTitle } = hooks.useDashboardMessages();
  const hasCourses = appHooks.useHasCourses();
  const hasAvailableDashboards = appHooks.useHasAvailableDashboards();
  const initIsPending = appHooks.useIsPendingRequest(RequestKeys.initialize);
  const showSelectSessionModal = appHooks.useShowSelectSessionModal();
  return (
    <div id="dashboard-container" className="d-flex flex-column p-2 pt-3">
      <h1 className="sr-only">{pageTitle}</h1>
      {!initIsPending && (
        <>
          {hasAvailableDashboards && <EnterpriseDashboardModal />}
          {(hasCourses && showSelectSessionModal) && <SelectSessionModal />}
        </>
      )}
      <div id="dashboard-content">
        {initIsPending && (<LoadingView />)}
        {(!initIsPending && hasCourses) && (<LoadedView />)}
        {(!initIsPending && !hasCourses) && (<EmptyCourse />)}
      </div>
    </div>
  );
};

export default Dashboard;
