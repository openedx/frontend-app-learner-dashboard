import React from 'react';
import { useDispatch } from 'react-redux';
import { Container, Col, Row } from '@edx/paragon';

import {
  thunkActions,
  hooks as appHooks,
} from 'data/redux';
import { RequestKeys } from 'data/constants/requests';

import CourseList from 'containers/CourseList';
import WidgetSidebar from 'containers/WidgetSidebar';
import EmptyCourse from 'containers/EmptyCourse';
import SelectSessionModal from 'containers/SelectSessionModal';
import EnterpriseDashboardModal from 'containers/EnterpriseDashboardModal';

import './index.scss';

export const Dashboard = () => {
  const dispatch = useDispatch();
  React.useEffect(
    () => { dispatch(thunkActions.app.initialize()); },
    [dispatch],
  );

  const hasCourses = appHooks.useHasCourses();
  const hasAvailableDashboards = appHooks.useHasAvailableDashboards();
  const showSelectSessionModal = appHooks.useShowSelectSessionModal();
  const initIsPending = appHooks.useIsPendingRequest(RequestKeys.initialize);

  return (
    <div id="dashboard-container" className="d-flex flex-column p-2 mt-3">
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
            <Col md={12} xl={4} className="p-0 pr-4 pl-1">
              <WidgetSidebar />
            </Col>
          </Row>
        </Container>
      ) : (<EmptyCourse />)}
    </div>
  );
};

export default Dashboard;
