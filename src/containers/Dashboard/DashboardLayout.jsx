import React from 'react';
import PropTypes from 'prop-types';

import { Container, Col, Row } from '@edx/paragon';

import RecommendationsFooter from 'containers/WidgetContainers/RecommendationsFooter';
import { useShowRecommendationsFooter } from 'widgets/ProductRecommendations/hooks';
import hooks from './hooks';

export const columnConfig = {
  courseList: (showFooter) => {
    if (showFooter) {
      return {
        lg: { span: 12, offset: 0 },
        xl: { span: 12, offset: 0 },
      };
    }
    return {
      lg: { span: 12, offset: 0 },
      xl: { span: 8, offset: 0 },
    };
  },
  sidebar: {
    lg: { span: 12, offset: 0 },
    xl: { span: 4, offset: 0 },
  },
};

export const DashboardLayout = ({ children, sidebar }) => {
  const isCollapsed = hooks.useIsDashboardCollapsed();
  const showRecommendationsFooter = useShowRecommendationsFooter();

  return (
    <Container fluid size="xl">
      <Row>
        <Col {...columnConfig.courseList(showRecommendationsFooter)} className="course-list-column">
          {children}
        </Col>
        <Col {...columnConfig.sidebar} className="sidebar-column">
          {!isCollapsed && (<h2 className="course-list-title">&nbsp;</h2>)}
          {sidebar}
        </Col>
      </Row>
      <Row>
        <Col>
          <RecommendationsFooter />
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
