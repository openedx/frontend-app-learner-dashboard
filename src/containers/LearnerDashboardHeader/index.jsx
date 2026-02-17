import React from 'react';

import MasqueradeBar from 'containers/MasqueradeBar';
import { AppContext } from '@edx/frontend-platform/react';
import Header from '@edx/frontend-component-header';
import { reduxHooks } from 'hooks';
import urls from 'data/services/lms/urls';

import { useLocation } from 'react-router-dom';
import { useDashboardMessages } from 'containers/Dashboard/hooks';
import ConfirmEmailBanner from './ConfirmEmailBanner';

import { useLearnerDashboardHeaderMenu, findCoursesNavClicked } from './hooks';
import './index.scss';

export const LearnerDashboardHeader = () => {
  const { authenticatedUser } = React.useContext(AppContext);
  const { courseSearchUrl } = reduxHooks.usePlatformSettingsData();
  const { pageTitle } = useDashboardMessages();
  const location = useLocation();
  const { pathname } = location;

  const exploreCoursesClick = () => {
    findCoursesNavClicked(urls.baseAppUrl(courseSearchUrl));
  };

  const learnerHomeHeaderMenu = useLearnerDashboardHeaderMenu({
    courseSearchUrl,
    authenticatedUser,
    exploreCoursesClick,
    pathname,
  });

  return (
    <>
      <ConfirmEmailBanner />
      <Header
        mainMenuItems={learnerHomeHeaderMenu.mainMenu}
        secondaryMenuItems={learnerHomeHeaderMenu.secondaryMenu}
        userMenuItems={learnerHomeHeaderMenu.userMenu}
      />
      <h1 className="sr-only">{pageTitle}</h1>
      <MasqueradeBar />
    </>
  );
};

LearnerDashboardHeader.propTypes = {};

export default LearnerDashboardHeader;
