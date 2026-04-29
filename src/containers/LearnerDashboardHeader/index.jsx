import React from 'react';
import { Helmet } from 'react-helmet';

import { getConfig } from '@edx/frontend-platform';
import { useIntl } from '@edx/frontend-platform/i18n';
import MasqueradeBar from 'containers/MasqueradeBar';
import { AppContext } from '@edx/frontend-platform/react';
import Header from '@edx/frontend-component-header';
import { useInitializeLearnerHome } from 'data/hooks';
import urls from 'data/services/lms/urls';

import { useLocation } from 'react-router-dom';
import { useDashboardMessages } from 'containers/Dashboard/hooks';
import ConfirmEmailBanner from './ConfirmEmailBanner';
import appMessages from '../../messages';
import { useLearnerDashboardHeaderMenu, findCoursesNavClicked } from './hooks';
import './index.scss';

export const LearnerDashboardHeader = () => {
  const { authenticatedUser } = React.useContext(AppContext);
  const { formatMessage } = useIntl();
  const { pageTitle } = useDashboardMessages();
  const location = useLocation();
  const { pathname } = location;
  const { data: learnerData } = useInitializeLearnerHome();
  const courseSearchUrl = learnerData?.platformSettings?.courseSearchUrl || '';

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
      <Helmet>
        <title>{formatMessage(appMessages.pageTitle)}</title>
        <link rel="shortcut icon" href={getConfig().FAVICON_URL} type="image/x-icon" />
      </Helmet>
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
