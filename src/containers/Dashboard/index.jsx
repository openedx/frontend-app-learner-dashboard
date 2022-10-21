import React from 'react';
import {
  Container,
  Col,
  Row,
  Spinner,
} from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';

import {
  hooks as appHooks,
} from 'data/redux';
import { RequestKeys } from 'data/constants/requests';

import CourseList from 'containers/CourseList';
import WidgetSidebar from 'containers/WidgetSidebar';
import EmptyCourse from 'containers/EmptyCourse';
import SelectSessionModal from 'containers/SelectSessionModal';
import EnterpriseDashboardModal from 'containers/EnterpriseDashboardModal';

import appMessages from 'messages';
import hooks from './hooks';

import './index.scss';

export const Dashboard = () => {
  hooks.useInitializeDashboard();
  const isCollapsed = hooks.useIsDashboardCollapsed();
  const { formatMessage } = useIntl();

  const hasCourses = appHooks.useHasCourses();
  const hasAvailableDashboards = appHooks.useHasAvailableDashboards();
  const showSelectSessionModal = appHooks.useShowSelectSessionModal();
  const initIsPending = appHooks.useIsPendingRequest(RequestKeys.initialize);

  return (
    <div id="dashboard-container" className="d-flex flex-column p-2 pt-3">
      <h1 className="sr-only">{formatMessage(appMessages.pageTitle)}</h1>
      {hasAvailableDashboards && <EnterpriseDashboardModal />}
      {initIsPending && (
        <div className="course-list-loading">
          <Spinner
            animation="border"
            className="mie-3"
            screenReaderText={formatMessage(appMessages.loadingSR)}
          />
        </div>
      )}
      {(!initIsPending && hasCourses) && (
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
              {!isCollapsed && (
                <h2 className="mb-3 display-block">&nbsp;</h2>
              )}
              <WidgetSidebar />
            </Col>
          </Row>
        </Container>
      )}
      {(!initIsPending && !hasCourses) && (<EmptyCourse />)}
    </div>
  );
};

export default Dashboard;
