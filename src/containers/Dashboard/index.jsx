import React from 'react';

import { reduxHooks } from 'hooks';
import { RequestKeys } from 'data/constants/requests';
import EnterpriseDashboardModal from 'containers/EnterpriseDashboardModal';
import SelectSessionModal from 'containers/SelectSessionModal';
import CourseList from 'containers/CourseList';

import LoadedSidebar from 'containers/WidgetContainers/LoadedSidebar';
import NoCoursesSidebar from 'containers/WidgetContainers/NoCoursesSidebar';

import LoadingView from './LoadingView';
import DashboardLayout from './DashboardLayout';
import hooks from './hooks';
import './index.scss';
import ProductRecommendations from '../../widgets/ProductRecommendations';

export const Dashboard = () => {
  hooks.useInitializeDashboard();
  const { pageTitle } = hooks.useDashboardMessages();
  const hasCourses = reduxHooks.useHasCourses();
  const hasAvailableDashboards = reduxHooks.useHasAvailableDashboards();
  const initIsPending = reduxHooks.useRequestIsPending(RequestKeys.initialize);
  const showSelectSessionModal = reduxHooks.useShowSelectSessionModal();

  // Hard coded to not show until experiment set-up logic is implemented
  const showProductRecommendations = !initIsPending && !hasAvailableDashboards && hasCourses && true;

  return (
    <div id="dashboard-container" className="d-flex flex-column p-2 pt-0">
      <h1 className="sr-only">{pageTitle}</h1>
      {!initIsPending && (
        <>
          {hasAvailableDashboards && <EnterpriseDashboardModal />}
          {(hasCourses && showSelectSessionModal) && <SelectSessionModal />}
        </>
      )}
      <div id="dashboard-content">
        {initIsPending
          ? (<LoadingView />)
          : (
            <DashboardLayout sidebar={hasCourses ? <LoadedSidebar /> : <NoCoursesSidebar />}>
              <CourseList />
            </DashboardLayout>
          )}
      </div>
      {showProductRecommendations && <ProductRecommendations />}
    </div>
  );
};

export default Dashboard;
