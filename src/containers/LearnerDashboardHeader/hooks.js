import React from 'react';
import { useWindowSize, breakpoints } from '@openedx/paragon';
import track from 'tracking';
import { StrictDict } from 'utils';
import { linkNames } from 'tracking/constants';

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
};
