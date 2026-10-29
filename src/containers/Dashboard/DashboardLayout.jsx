import React from 'react';
import PropTypes from 'prop-types';

import { Container, Col, Row } from '@openedx/paragon';

import WidgetSidebarSlot from '../../slots/WidgetSidebarSlot';

import hooks from './hooks';

export const columnConfig = {
  main: {
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

  const mainColumnProps = sidebarShowing
    ? columnConfig.main.withSidebar
    : columnConfig.main.noSidebar;

  return (
    <Container fluid size="xl">
      <Row>
        <Col {...mainColumnProps} className="main-column">
          {children}
        </Col>
        <Col {...columnConfig.sidebar} className={['sidebar-column', !isCollapsed && 'not-collapsed']}>
          <WidgetSidebarSlot />
        </Col>
      </Row>
    </Container>
  );
};
DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DashboardLayout;
