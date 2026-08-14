import { FilterKeys, ListPageSize, SortKeys } from 'data/constants/app';
import StrictDict from './StrictDict';
import { PathwayData } from 'hooks/usePathwayData';
import { FilterCategory } from 'data/context/FiltersProvider';

interface TransformedPathwayData extends PathwayData {
  cardId: string;
}

interface VisibleItem {
  cardId: string;
  lastEnrolled: Date;
  title: string;
  itemType: 'course' | 'pathway';
}

const courseCardId = (val) => `card-${val}`;
const pathwayCardId = (val) => `p-card-${val}`;
const today = Date.now();

const transformCourseData = (courses) => courses.reduce(
  (obj, curr, index) => {
    const out = { ...curr, cardId: courseCardId(index) };
    if (out.enrollment?.lastEnrolled === null) {
      out.enrollment.lastEnrolled = today;
    }
    return { ...obj, [courseCardId(index)]: out };
  },
  {},
);

const transformPathwayData = (
  pathways: PathwayData[],
): Record<string, TransformedPathwayData> => pathways.reduce(
  (obj: Record<string, TransformedPathwayData>, curr, index) => {
    const out = { ...curr, cardId: pathwayCardId(index) };
    if (out.enrollment?.lastEnrolled === null) {
      out.enrollment.lastEnrolled = today;
    }
    return { ...obj, [pathwayCardId(index)]: out };
  },
  {},
);

const getTransformedCourseDataObject = (courses) => transformCourseData(courses);

const getTransformedCourseDataList = (courses) => Object.values(transformCourseData(courses));

const getTransformedPathwayDataObject = (pathways) => transformPathwayData(pathways);

const getTransformedPathwayDataList = (pathways) => Object.values(transformPathwayData(pathways));

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

const getVisibleCourses = (courses: any[], filters: string[]) => {
  const courseFilters = StrictDict({
    [FilterKeys.notEnrolled]: (course) => !course.enrollment.isEnrolled,
    [FilterKeys.done]: (course) => course.courseRun !== null && course.courseRun.isArchived,
    [FilterKeys.upgraded]: (course) => course.enrollment.isVerified,
    [FilterKeys.inProgress]: (course) => course.enrollment.hasStarted,
    [FilterKeys.notStarted]: (course) => !course.enrollment.hasStarted,
  });

  const courseFilterFn = filtersList => (filtersList.length
    ? course => filtersList.reduce((match, filter) => match && courseFilters[filter](course), true)
    : () => true);

  return courses.filter(courseFilterFn(filters));
};

const getVisiblePathways = (pathways: TransformedPathwayData[], filters: string[], categories: FilterCategory[]) => {
  const pathwayFilters = StrictDict({
    [FilterKeys.notEnrolled]: (pathway: PathwayData) => !pathway.enrollment.isEnrolled,
    [FilterKeys.done]: (pathway: PathwayData) => pathway.pathwayRun !== null && pathway.pathwayRun.isArchived,
    [FilterKeys.upgraded]: (pathway: PathwayData) => pathway.enrollment.isVerified,
    [FilterKeys.inProgress]: (pathway: PathwayData) => pathway.enrollment.hasStarted,
    [FilterKeys.notStarted]: (pathway: PathwayData) => !pathway.enrollment.hasStarted,
  });

  const pathwayFilterFn = filtersList => (filtersList.length
    ? pathway => filtersList.reduce((match, filter) => match && pathwayFilters[filter](pathway), true)
    : () => true);

  const pathwayCategoriesFilterFn = filterCategories => (filterCategories.length
    ? pathway => filterCategories.some(category => category.id === pathway.pathway.category)
    : () => true);

  return pathways.filter(pathwayFilterFn(filters)).filter(pathwayCategoriesFilterFn(categories));
};

const getVisibleItems = (items: VisibleItem[], sortBy: string, pageNumber: number) => {
  const transforms = StrictDict({
    [SortKeys.enrolled]: (item: VisibleItem) => item.lastEnrolled,
    [SortKeys.title]: (item: VisibleItem) => item.title.toLowerCase(),
  });

  const sortFn = (transform, { reverse }) => (v1: VisibleItem, v2: VisibleItem) => {
    const [a, b] = [v1, v2].map(transform);
    if (a === b) { return 0; }
    return (((a as any) > (b as any)) ? 1 : -1) * (reverse ? -1 : 1);
  };

  const list = items.sort(sortFn(transforms[sortBy], { reverse: sortBy === SortKeys.enrolled }));

  const querySearch = new URLSearchParams(window.location.search);
  const disablePagination = querySearch.get('disable_pagination');
  const pageSize = Number(disablePagination) === 1 ? 0 : ListPageSize;

  if (pageSize === 0) {
    return {
      visibleList: list,
      numPages: 1,
    };
  }
  return {
    visibleList: list.slice((pageNumber - 1) * pageSize, pageNumber * pageSize),
    numPages: Math.ceil(list.length / pageSize),
  };
};

export {
  getVisibleList,
  getVisibleCourses,
  getVisiblePathways,
  getVisibleItems,
  getTransformedCourseDataList,
  getTransformedCourseDataObject,
  getTransformedPathwayDataList,
  getTransformedPathwayDataObject,
  type TransformedPathwayData,
  type VisibleItem,
};
