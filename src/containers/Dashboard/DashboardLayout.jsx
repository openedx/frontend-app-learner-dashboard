import {
  Col,
  Container,
  Row,
} from '@openedx/paragon';
import PropTypes from 'prop-types';

import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import banner from '../../assets/banner1.jpg';
import '../../i18n';
import WidgetSidebar from '../WidgetContainers/WidgetSidebar';
import hooks from './hooks';

export const columnConfig = {
  courseList: {
    withSidebar: {
      lg: { span: 12, offset: 0 },
      xl: { span: 9, offset: 0 },
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
  const { isCollapsed, sidebarShowing } = hooks.useDashboardLayoutData();
  const courseListColumnProps = sidebarShowing
    ? columnConfig.courseList.withSidebar
    : columnConfig.courseList.noSidebar;

  // const handleSearch = () => {
  //   const searchText = document.querySelector('.search-input').value;
  //   alert(`Searching for: ${searchText}`);
  //   // Add your search logic here
  // };

  const { t } = useTranslation();

  useEffect(() => {
    // Ensuring language preference is consistent
    if (localStorage.getItem('i18nextLng')?.length > 2) {
      localStorage.setItem('i18nextLng', 'en');
    }
  }, []);

  return (
    <Container fluid className="font-inter">
      {/* Header Section */}
      <Row
        className="banner d-flex justify-content-center align-content-center"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <Col {...courseListColumnProps}>
          <div className="contain-title align-items-left">
            <h1 className="title1">{t('welcome')}</h1>
            <h1 className="title2">{t('onlineCourses')}</h1>
            <p className="small_title">{t('buildSkills')}</p>
            {/* <Form className="search-form d-flex mt-3">
              <FormControl
                type="text"
                placeholder={t('searchPlaceholder')}
                className="search-input"
              />
              <Button
                className="search-button"
                type="button"
                onClick={handleSearch}
              >
                {t('searchButton')}
                <i className="fa fa-search" />
              </Button>
            </Form> */}
          </div>
        </Col>
      </Row>

      {/* Main Content Section */}
      <Row className="flex-column d-flex justify-content-center align-content-center">
        <Col {...courseListColumnProps} className="course-list-column">
          {children}
        </Col>
        {sidebarShowing && (
          <Col {...columnConfig.sidebar} className="sidebar-column">
            {!isCollapsed && <WidgetSidebar />}
          </Col>
        )}
      </Row>
    </Container>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DashboardLayout;
