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
  xs: { span: 12, offset: 0 },
  sm: { span: 8, offset: 2 },
  md: { span: 12, offset: 0 },
  lg: { span: 10, offset: 1 },
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
        <Col {...columnConfig.courseList} className="p-0 px-4">
          <CourseList />
        </Col>
        <Col
          {...columnConfig.sidebar}
          className={classNames(
            'p-0',
            { 'pl-1 pr-3': !isCollapsed },
          )}
        >
          {!isCollapsed && (<h2 className="mb-4.5 display-block">&nbsp;</h2>)}
          {isRecommendationsPending && (<RecommendationsLoadingView />)}
          {!isRecommendationsPending && !hasRecommendedCourses && <WidgetSidebar />}
          {
            !isRecommendationsPending
            && hasRecommendedCourses
            && (
              <RecommendationsPanel courses={recommendedCourses.courses} />)
          }
        </Col>
      </Row>
    </Container>
  );
};

export default LoadedView;
