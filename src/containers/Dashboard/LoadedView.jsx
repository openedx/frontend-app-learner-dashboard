import React from 'react';
import classNames from 'classnames';
import {
  Container,
  Col,
  Row,
} from '@edx/paragon';

import { hooks as appHooks } from 'data/redux';
import { RequestKeys } from 'data/constants/requests';
import CourseList from 'containers/CourseList';
import RecommendationsPanel, { LoadingView as RecommendationsLoadingView } from 'containers/RecommendationsPanel';
import WidgetSidebar from 'containers/WidgetSidebar';
import hooks from './hooks';

const commonColumnConfig = {
  sm: { span: 12, offset: 0 },
  md: { span: 10, offset: 1 },
  lg: { span: 12, offset: 0 },
};

export const columnConfig = {
  courseList: {
    ...commonColumnConfig,
    xl: { span: 8, offset: 0 },
  },
  sidebar: {
    ...commonColumnConfig,
    xl: { span: 4, offset: 0 },
  },
};

export const LoadedView = () => {
  const isCollapsed = hooks.useIsDashboardCollapsed();
  const recommendedCourses = appHooks.useRecommendedCoursesData();
  const hasRecommendedCourses = recommendedCourses.courses.length > 0;
  const isRecommendationsPending = appHooks.useRequestIsPending(RequestKeys.recommendedCourses);

  return (
    <Container fluid size="xl">
      <Row>
        <Col {...columnConfig.courseList} className="course-list-column">
          <CourseList />
        </Col>
        <Col {...columnConfig.sidebar} className="sidebar-column">
          {!isCollapsed && (<h2 className="course-list-title">&nbsp;</h2>)}
          <WidgetSidebar />
        </Col>
      </Row>
    </Container>
  );
};

export default LoadedView;
