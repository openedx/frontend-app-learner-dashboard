import React, { useMemo } from 'react';

import { useSelectSessionModal } from 'data/context';
import { useInitializeLearnerHome } from 'data/hooks';
import SelectSessionModal from 'containers/SelectSessionModal';
import AssignedCoursesSection from 'containers/CoursesPanel';
import OverdueCoursesSection from 'containers/OverdueCoursesSection';
import DashboardModalSlot from 'plugin-slots/DashboardModalSlot';

import LoadingView from './LoadingView';
import DashboardLayout from './DashboardLayout';
import hooks from './hooks';
import './index.scss';
import { Container } from '@openedx/paragon';

export const Dashboard = () => {
  const { data, isPending } = useInitializeLearnerHome();
  const { pageTitle } = hooks.useDashboardMessages();
  const { selectSessionModal } = useSelectSessionModal();
  const showSelectSessionModal = selectSessionModal.cardId !== null;

  const hasCourses = useMemo(() => data?.courses?.length > 0, [data]);

  return (
    <Container fluid className="dashboard-container ">
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
              <>
                <OverdueCoursesSection />
                <DashboardLayout>
                  <AssignedCoursesSection />
                </DashboardLayout>
              </>
            )}
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;
