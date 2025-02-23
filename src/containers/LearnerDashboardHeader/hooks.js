import React from 'react';
import { useWindowSize, breakpoints } from '@openedx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';
import track from 'tracking';
import { StrictDict } from 'utils';
import { linkNames } from 'tracking/constants';

import getLearnerHeaderMenu from './LearnerDashboardMenu';

import * as module from './hooks';

export const state = StrictDict({
  isOpen: (val) => React.useState(val), // eslint-disable-line
});

export const useIsCollapsed = () => {
  const { width } = useWindowSize();
  const isCollapsed = React.useMemo(() => (width <= breakpoints.large.minWidth), [width]);
  return isCollapsed;
};

export const findCoursesNavClicked = (href) => track.findCourses.findCoursesClicked(href, {
  linkName: linkNames.learnerHomeNavExplore,
});

export const findCoursesNavDropdownClicked = (href) => track.findCourses.findCoursesClicked(href, {
  linkName: linkNames.learnerHomeNavDropdownExplore,
});

export const useLearnerDashboardHeaderMenu = ({
  courseSearchUrl, authenticatedUser, exploreCoursesClick,
}) => {
  const { formatMessage } = useIntl();
  return getLearnerHeaderMenu(formatMessage, courseSearchUrl, authenticatedUser, exploreCoursesClick);
};

export const useLearnerDashboardHeaderData = () => {
  const [isOpen, setIsOpen] = module.state.isOpen(false);
  const toggleIsOpen = () => setIsOpen(!isOpen);

  return {
    isOpen,
    toggleIsOpen,
  };
};

export default {
  useIsCollapsed,
  findCoursesNavClicked,
  findCoursesNavDropdownClicked,
  useLearnerDashboardHeaderData,
  useLearnerDashboardHeaderMenu,
};
