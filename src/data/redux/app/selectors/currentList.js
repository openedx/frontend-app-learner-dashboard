import { StrictDict } from 'utils';
import { FilterKeys, SortKeys } from 'data/constants/app';

import simpleSelectors from './simpleSelectors';
import * as module from './currentList';

export const sortFn = (transform, { reverse }) => (v1, v2) => {
  const [a, b] = [v1, v2].map(transform);
  if (a === b) { return 0; }
  return ((a > b) ? 1 : -1) * (reverse ? -1 : 1);
};

export const courseFilters = StrictDict({
  [FilterKeys.notEnrolled]: (course) => !course.enrollment.isEnrolled,
  [FilterKeys.done]: (course) => course.courseRun !== null && course.courseRun.isArchived,
  [FilterKeys.upgraded]: (course) => course.enrollment.isVerified,
  [FilterKeys.inProgress]: (course) => course.enrollment.hasStarted,
  [FilterKeys.notStarted]: (course) => !course.enrollment.hasStarted,
});

export const transforms = StrictDict({
  [SortKeys.enrolled]: ({ enrollment }) => new Date(enrollment.lastEnrolled),
  [SortKeys.title]: ({ course }) => course.courseName.toLowerCase(),
});

export const courseFilterFn = filters => (filters.length
  ? course => filters.reduce((match, filter) => match && courseFilters[filter](course), true)
  : () => true);

export const currentList = (allCourses, {
  sortBy,
  filters,
}) => allCourses
  .filter(module.courseFilterFn(filters))
  .sort(module.sortFn(transforms[sortBy], { reverse: sortBy === SortKeys.enrolled }));

export const visibleList = (state, {
  sortBy,
  filters,
  pageSize,
}) => {
  const courses = Object.values(simpleSelectors.courseData(state));
  const list = module.currentList(courses, { sortBy, filters });
  const pageNumber = simpleSelectors.pageNumber(state);

  if (pageSize === 0) {
    return {
      visible: list,
      numPages: 1,
    };
  }
  return {
    visible: list.slice((pageNumber - 1) * pageSize, pageNumber * pageSize),
    numPages: Math.ceil(list.length / pageSize),
  };
};

export default visibleList;
