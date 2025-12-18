import React from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';
import track from 'tracking';
import { StrictDict } from 'utils';
import { linkNames } from 'tracking/constants';

import getLearnerHeaderMenu from './LearnerDashboardMenu';

export const state = StrictDict({
  isOpen: (val) => React.useState(val), // eslint-disable-line
});

export const findCoursesNavClicked = (href) => track.findCourses.findCoursesClicked(href, {
  linkName: linkNames.learnerHomeNavExplore,
});

export const useLearnerDashboardHeaderMenu = ({
  courseSearchUrl, authenticatedUser, exploreCoursesClick, pathname,
}) => {
  const { formatMessage } = useIntl();
  return getLearnerHeaderMenu(formatMessage, courseSearchUrl, authenticatedUser, exploreCoursesClick, pathname);
};

export default {
  findCoursesNavClicked,
  useLearnerDashboardHeaderMenu,
};
