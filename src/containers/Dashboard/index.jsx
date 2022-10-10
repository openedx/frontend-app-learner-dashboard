import React from 'react';
import { useDispatch } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import {
  Container,
  Col,
  Row,
  Icon,
} from '@edx/paragon';
import { SpinnerSimple } from '@edx/paragon/icons';

import {
  thunkActions,
  hooks as appHooks,
} from 'data/redux';
import { RequestKeys } from 'data/constants/requests';

import CourseList from 'containers/CourseList';
import WidgetSidebar from 'containers/WidgetSidebar';
import RecommendationsPanel from 'containers/RecommendationsPanel';
import EmptyCourse from 'containers/EmptyCourse';
import SelectSessionModal from 'containers/SelectSessionModal';
import EnterpriseDashboardModal from 'containers/EnterpriseDashboardModal';

import './index.scss';

export const Dashboard = () => {
  const dispatch = useDispatch();
  React.useEffect(
    () => {
      dispatch(thunkActions.app.initialize());
      dispatch(thunkActions.app.recommendedCourses());
    },
    [dispatch],
  );

  const hasCourses = appHooks.useHasCourses();
  const hasAvailableDashboards = appHooks.useHasAvailableDashboards();
  const showSelectSessionModal = appHooks.useShowSelectSessionModal();
  const initIsPending = appHooks.useIsPendingRequest(RequestKeys.initialize);
  const isDesktop = useMediaQuery({ minWidth: '1200px' });
  const courses = appHooks.useRecommendedCoursesData();
  const isPending = appHooks.useIsPendingRequest(RequestKeys.recommendedCourses);
  const isFeatureEnabled = true;

  const exploreCourses = () => (
    <Col md={12} xl={4} className="p-0 pr-4 pl-1">
      <WidgetSidebar />
    </Col>
  );

  const coursesPanel = () => (
    <Col
      xs={{ span: 12, offset: 0 }}
      sm={{ span: 8, offset: 2 }}
      md={{ span: 12, offset: 0 }}
      lg={{ span: 10, offset: 1 }}
      xl={{ span: 4, offset: 0 }}
      className={`p-0 pr-4 pl-1 bg-light-200 ${isDesktop ? 'courses-panel' : ''}`}
    >
      <RecommendationsPanel courses={courses} />
    </Col>
  );

  const loadingState = () => (
    <Col md={12} xl={4} className="p-0 pr-4 pl-1">
      <div
        className="d-flex justify-content-center align-items-center bg-light-200"
        style={{ height: '125px' }}
      >
        <Icon src={SpinnerSimple} className="fa-spin" style={{ height: '48px', width: '48px', opacity: 0.5 }} />
      </div>
    </Col>
  );

  return (
    <div id="dashboard-container" className="d-flex flex-column p-2">
      {hasAvailableDashboards && <EnterpriseDashboardModal />}
      {initIsPending || (!initIsPending && hasCourses) ? (
        <Container fluid size="xl">
          <Row>
            <Col
              xs={{ span: 12, offset: 0 }}
              sm={{ span: 8, offset: 2 }}
              md={{ span: 12, offset: 0 }}
              lg={{ span: 10, offset: 1 }}
              xl={{ span: 8, offset: 0 }}
              className="p-0 px-4"
            >
              {showSelectSessionModal && (<SelectSessionModal />)}
              <CourseList />
            </Col>
            {isPending && loadingState()}
            {!isPending && !isFeatureEnabled && exploreCourses()}
            {!isPending && isFeatureEnabled && coursesPanel()}
          </Row>
        </Container>
      ) : (<EmptyCourse />)}
    </div>
  );
};

export default Dashboard;
