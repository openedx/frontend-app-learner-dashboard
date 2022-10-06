import { StrictDict } from 'utils';
import { FilterKeys, SortKeys } from 'data/constants/app';

import simpleSelectors from './simpleSelectors';
import * as module from './currentList';

export const sortFn = (a, b, isAscending) => ((a === b)
  ? 0
  : 1 * ((a > b) ? 1 : -1) * (isAscending ? 1 : -1));

export const dateSort = (a, b, isAscending) => (
  module.sortFn(new Date(a), new Date(b), isAscending)
);

export const alphSort = (a, b, isAscending) => (
  module.sortFn(a.toLowerCase(), b.toLowerCase(), isAscending)
);

export const courseFilters = StrictDict({
  [FilterKeys.notEnrolled]: (course) => !course.enrollment.isEnrolled,
  [FilterKeys.done]: (course) => course.enrollment.hasFinished,
  [FilterKeys.upgraded]: (course) => course.enrollment.isVerified,
  [FilterKeys.inProgress]: (course) => course.enrollment.hasStarted,
  [FilterKeys.notStarted]: (course) => !course.enrollment.hasStarted,
});

export const currentList = (state, {
  sortBy,
  isAscending,
  filters,
  pageSize,
}) => {
  const pageNumber = simpleSelectors.pageNumber(state);
  let list = Object.values(simpleSelectors.courseData(state));
  const hasFilter = filters.reduce((obj, filter) => ({ ...obj, [filter]: true }), {});
  if (filters.length) {
    list = list.filter(course => filters.reduce(
      (match, filter) => match && (!hasFilter[filter] || filter(course)),
      true,
    ));
  }
  if (sortBy === SortKeys.enrolled) {
    list = list.sort((a, b) => module.dateSort(
      a.enrollment.lastEnrolled,
      b.enrollment.lastEnrolled,
      isAscending,
    ));
  } else {
    list = list.sort((a, b) => module.alphSort(
      a.course.courseName,
      b.course.courseName,
      isAscending,
    ));
  }
  return {
    visible: list.slice((pageNumber - 1) * pageSize, pageNumber * pageSize),
    numPages: Math.ceil(list.length / pageSize),
  };
};

export default currentList;
