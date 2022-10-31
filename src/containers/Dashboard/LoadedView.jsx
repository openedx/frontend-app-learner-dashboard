import React from 'react';
import { Container, Col, Row } from '@edx/paragon';

import CourseList from 'containers/CourseList';
import WidgetSidebar from 'containers/WidgetSidebar';
import hooks from './hooks';

export const columnConfig = {
  courseList: {
    sm: { span: 12, offset: 0 },
    md: { span: 10, offset: 1 },
    lg: { span: 12, offset: 0 },
    xl: { span: 8, offset: 0 },
  },
  sidebar: {
    sm: { span: 12, offset: 0 },
    md: { span: 10, offset: 1 },
    lg: { span: 12, offset: 0 },
    xl: { span: 4, offset: 0 },
  },
};

export const LoadedView = () => {
  const isCollapsed = hooks.useIsDashboardCollapsed();

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
