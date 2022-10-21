import React from 'react';
import { Container, Col, Row } from '@edx/paragon';

import CourseList from 'containers/CourseList';
import WidgetSidebar from 'containers/WidgetSidebar';
import hooks from './hooks';

export const columnConfig = {
  courseList: {
    xs: { span: 12, offset: 0 },
    sm: { span: 8, offset: 2 },
    md: { span: 12, offset: 0 },
    lg: { span: 10, offset: 1 },
    xl: { span: 8, offset: 0 },
  },
  sidebar: { md: 12, xl: 4 },
};

export const LoadedView = () => {
  const isCollapsed = hooks.useIsDashboardCollapsed();

  return (
    <Container fluid size="xl">
      <Row>
        <Col {...columnConfig.courseList} className="p-0 px-4">
          <CourseList />
        </Col>
        <Col {...columnConfig.sidebar} className="p-0 pr-4 pl-1">
          {!isCollapsed && (<h2 className="mb-3 display-block">&nbsp;</h2>)}
          <WidgetSidebar />
        </Col>
      </Row>
    </Container>
  );
};

export default LoadedView;
