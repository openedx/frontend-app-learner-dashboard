import React from 'react';
import { useDispatch } from 'react-redux';

import {
  thunkActions,
  hooks as appHooks,
} from 'data/redux';

import CourseList from 'containers/CourseList';
import WidgetSidebar from 'containers/WidgetSidebar';
import EmptyCourse from 'containers/EmptyCourse';
import SelectSessionModal from 'containers/SelectSessionModal';
import EnterpriseDashboardModal from 'containers/EnterpriseDashboardModal';

export const Dashboard = () => {
  const dispatch = useDispatch();
  React.useEffect(
    () => { dispatch(thunkActions.app.initialize()); },
    [dispatch],
  );

  const hasCourses = appHooks.useHasCourses();
  const hasAvailableDashboards = appHooks.useHasAvailableDashboards();
  const showSelectSessionModal = appHooks.useShowSelectSessionModal();
  return (
    <div className="d-flex flex-column p-2">
      {hasAvailableDashboards && <EnterpriseDashboardModal />}
      {hasCourses ? (
        <>
          <div className="d-flex" style={{ margin: 'auto' }}>
            <div className="w-100 mw-md mr-4">
              {showSelectSessionModal && (<SelectSessionModal />)}
              <CourseList />
            </div>
            <div id="dashboard-sidebar-container mw-xs">
              <WidgetSidebar />
            </div>
          </div>
        </>
      ) : (
        <EmptyCourse />
      )}
    </div>
  );
};

export default Dashboard;
