import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import { Container, Col, Row } from '@edx/paragon';

import WidgetFooter from 'containers/WidgetContainers/WidgetFooter';
import hooks from './hooks';

export const columnConfig = {
  courseList: {
    lg: { span: 12, offset: 0 },
    xl: { span: 8, offset: 0 },
  },
  sidebar: {
    lg: { span: 12, offset: 0 },
    xl: { span: 4, offset: 0 },
  },
};

export const DashboardLayout = ({ children, sidebar }) => {
  const isCollapsed = hooks.useIsDashboardCollapsed();
  const courseListColumn = useRef(null);

  return (
    <Container fluid size="xl">
      <Row>
        <Col
          ref={courseListColumn}
          {...columnConfig.courseList}
          className="course-list-column"
        >
          {children}
        </Col>
        <Col {...columnConfig.sidebar} className="sidebar-column">
          {!isCollapsed && (<h2 className="course-list-title">&nbsp;</h2>)}
          {sidebar}
        </Col>
      </Row>
      <Row>
        <Col>
          <WidgetFooter courseListColumn={courseListColumn} />
        </Col>
      </Row>
    </Container>
  );
};
DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
  sidebar: PropTypes.node.isRequired,
};

export default DashboardLayout;
