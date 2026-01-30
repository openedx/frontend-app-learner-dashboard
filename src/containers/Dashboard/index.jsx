import React, { useMemo } from 'react';

import { useSelectSessionModal } from 'data/context/SelectSessionProvider';
import { useInitializeLearnerHome } from 'data/react-query/apiHooks';
import SelectSessionModal from 'containers/SelectSessionModal';
import CoursesPanel from 'containers/CoursesPanel';
import DashboardModalSlot from 'plugin-slots/DashboardModalSlot';

import LoadingView from './LoadingView';
import DashboardLayout from './DashboardLayout';
import hooks from './hooks';
import './index.scss';

export const Dashboard = () => {
  const { data, isFetching } = useInitializeLearnerHome();
  const { pageTitle } = hooks.useDashboardMessages();
  const { selectSessionModal } = useSelectSessionModal();
  const showSelectSessionModal = selectSessionModal.cardId !== null;

  const hasCourses = useMemo(() => data?.courses?.length > 0, [data]);

  return (
    <div id="dashboard-container" className="d-flex flex-column p-2 pt-0">
      <h1 className="sr-only">{pageTitle}</h1>
      {!isFetching && (
        <>
          <DashboardModalSlot />
          {(hasCourses && showSelectSessionModal) && <SelectSessionModal />}
        </>
      )}
      <div id="dashboard-content" data-testid="dashboard-content">
        {isFetching
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
