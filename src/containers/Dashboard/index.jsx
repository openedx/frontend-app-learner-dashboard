import { apiHooks, reduxHooks } from '../../hooks';
import SelectSessionModal from '../../containers/SelectSessionModal';
import CoursesPanel from '../../containers/CoursesPanel';
import DashboardModalSlot from '../../slots/DashboardModalSlot';

import LoadingView from './LoadingView';
import DashboardLayout from './DashboardLayout';
import hooks from './hooks';
import './index.scss';

export const Dashboard = () => {
  const { isPending } = apiHooks.useInitializeApp();
  const { pageTitle } = hooks.useDashboardMessages();
  const hasCourses = reduxHooks.useHasCourses();
  const showSelectSessionModal = reduxHooks.useShowSelectSessionModal();

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
