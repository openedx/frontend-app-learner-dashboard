import React from 'react';

import MasqueradeBar from '@src/containers/MasqueradeBar';
import { AppContext } from '@edx/frontend-platform/react';
import Header from '@edx/frontend-component-header';
import { reduxHooks } from '@src/hooks';
import urls from '@src/data/services/lms/urls';

import ConfirmEmailBanner from './ConfirmEmailBanner';

import { useLearnerDashboardHeaderMenu, findCoursesNavClicked } from './hooks';

import './index.scss';

export const LearnerDashboardHeader = () => {
  const { authenticatedUser } = React.useContext(AppContext);
  const { courseSearchUrl } = reduxHooks.usePlatformSettingsData();

  const exploreCoursesClick = () => {
    findCoursesNavClicked(urls.baseAppUrl(courseSearchUrl));
  };

  const learnerHomeHeaderMenu = useLearnerDashboardHeaderMenu({
    courseSearchUrl,
    authenticatedUser,
    exploreCoursesClick,
  });

  return (
    <>
      <ConfirmEmailBanner />
      <Header
        mainMenuItems={learnerHomeHeaderMenu.mainMenu}
        secondaryMenuItems={learnerHomeHeaderMenu.secondaryMenu}
        userMenuItems={learnerHomeHeaderMenu.userMenu}
      />
      <MasqueradeBar />
    </>
  );
};

LearnerDashboardHeader.propTypes = {};

export default LearnerDashboardHeader;
