import React from 'react';
import { useIntl } from '@openedx/frontend-base';

import track from '../../tracking';
import { linkNames } from '../../tracking/constants';
import { StrictDict } from '../../utils';

import getLearnerHeaderMenu from './LearnerDashboardMenu';

export const state = StrictDict({
  isOpen: (val) => React.useState(val), // eslint-disable-line
});

export const findCoursesNavClicked = (href) => track.findCourses.findCoursesClicked(href, {
  linkName: linkNames.learnerHomeNavExplore,
});

export const useLearnerDashboardHeaderMenu = ({
  courseSearchUrl, authenticatedUser, exploreCoursesClick,
}) => {
  const { formatMessage } = useIntl();
  return getLearnerHeaderMenu(formatMessage, courseSearchUrl, authenticatedUser, exploreCoursesClick);
};

export default {
  findCoursesNavClicked,
  useLearnerDashboardHeaderMenu,
};
