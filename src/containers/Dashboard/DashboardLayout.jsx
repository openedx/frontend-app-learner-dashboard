import React from 'react';
import PropTypes from 'prop-types';

import {  Col, Row } from '@openedx/paragon';

import WidgetSidebarSlot from 'plugin-slots/WidgetSidebarSlot';

import hooks from './hooks';

export const columnConfig = {
  courseList: {
    withSidebar: {
      lg: { span: 12, offset: 0 },
      xl: { span: 8, offset: 0 },
    },
    noSidebar: {
      lg: { span: 12, offset: 0 },
      xl: { span: 12, offset: 0 },
    },
  },
  sidebar: {
    lg: { span: 12, offset: 0 },
    xl: { span: 4, offset: 0 },
  },
};

export const DashboardLayout = ({ children }) => {
  const {
    isCollapsed,
    sidebarShowing,
  } = hooks.useDashboardLayoutData();

  const courseListColumnProps = sidebarShowing
    ? columnConfig.courseList.withSidebar
    : columnConfig.courseList.noSidebar;

  return (
    <div className="dashboard-layout-container">
      <Row>
        <Col {...courseListColumnProps} className="course-list-column">
          {children}
        </Col>
        <Col {...columnConfig.sidebar} className={['sidebar-column', !isCollapsed && 'not-collapsed']}>
          <div className="sidebar-column-inner d-flex flex-column ml-3">
            <WidgetSidebarSlot />
          </div>
        </Col>
      </Row>
    </div>
  );
};
DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DashboardLayout;
