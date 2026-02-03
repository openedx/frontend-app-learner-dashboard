import { FilterKeys, ListPageSize, SortKeys } from 'data/constants/app';
import StrictDict from './StrictDict';

const cardId = (val) => `card-${val}`;
const today = Date.now();

const transformCourseData = (courses) => courses.reduce(
  (obj, curr, index) => {
    const out = { ...curr, cardId: cardId(index) };
    if (out.enrollment?.lastEnrolled === null) {
      out.enrollment.lastEnrolled = today;
    }
    return { ...obj, [cardId(index)]: out };
  },
  {},
);

const getTransformedCourseDataObject = (courses) => transformCourseData(courses);

const getTransformedCourseDataList = (courses) => Object.values(transformCourseData(courses));

const getVisibleList = (courses: any[], filters: string[], sortBy: string, pageNumber: number) => {
  const courseFilters = StrictDict({
    [FilterKeys.notEnrolled]: (course) => !course.enrollment.isEnrolled,
    [FilterKeys.done]: (course) => course.courseRun !== null && course.courseRun.isArchived,
    [FilterKeys.upgraded]: (course) => course.enrollment.isVerified,
    [FilterKeys.inProgress]: (course) => course.enrollment.hasStarted,
    [FilterKeys.notStarted]: (course) => !course.enrollment.hasStarted,
  });

  const transforms = StrictDict({
    [SortKeys.enrolled]: ({ enrollment }) => new Date(enrollment?.lastEnrolled),
    [SortKeys.title]: ({ course }) => course.courseName.toLowerCase(),
  });

  const courseFilterFn = filtersList => (filtersList.length
    ? course => filtersList.reduce((match, filter) => match && courseFilters[filter](course), true)
    : () => true);

  const sortFn = (transform, { reverse }) => (v1, v2) => {
    const [a, b] = [v1, v2].map(transform);
    if (a === b) { return 0; }
    return (((a as any) > (b as any)) ? 1 : -1) * (reverse ? -1 : 1);
  };

  const list = courses
    .filter(courseFilterFn(filters))
    .sort(sortFn(transforms[sortBy], { reverse: sortBy === SortKeys.enrolled }));

  const querySearch = new URLSearchParams(window.location.search);
  const disablePagination = querySearch.get('disable_pagination');
  const pageSize = Number(disablePagination) === 1 ? 0 : ListPageSize;

  if (pageSize === 0) {
    return {
      visibleList: list,
      numPages: 1,
    };
  }
  const result = {
    visibleList: list.slice((pageNumber - 1) * pageSize, pageNumber * pageSize),
    numPages: Math.ceil(list.length / pageSize),
  };
  return result;
};

export { getVisibleList, getTransformedCourseDataList, getTransformedCourseDataObject };
