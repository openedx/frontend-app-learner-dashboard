import React, { useMemo } from 'react';

import { useIntl } from '@edx/frontend-platform/i18n';
import { useInitializeLearnerHome } from 'data/hooks';
import {
  FilterControls,
} from 'containers/FilterControls';
import { CourseListSlot } from 'plugin-slots/CourseListSlot';
import NoCoursesViewSlot from 'plugin-slots/NoCoursesViewSlot';
import { useFilters } from 'data/context';

import {
  getVisibleList,
  getVisibleCourses,
  getTransformedCourseDataList,
  getVisiblePathways,
  getTransformedPathwayDataList,
  getVisibleItems,
} from 'utils/dataTransformers';

import './index.scss';
import { getConfig } from '@edx/frontend-platform';
import { COURSE_CATEGORY } from 'data/context/FiltersProvider';
import ItemsListSlot from 'plugin-slots/ItemsListSlot';
import messages from './messages';

/**
 * Renders the list of CourseCards and PathwayCards, as well as the controls (FilterControls) for modifying the list.
 * Also houses the NoCoursesView to display if the user hasn't enrolled in any courses.
 * @returns List of courses as CourseCards or empty state
*/
export const ItemsPanel = () => {
  const { formatMessage } = useIntl();
  const { data } = useInitializeLearnerHome();
  const hasCourses = useMemo(() => data?.courses?.length > 0, [data]);
  const hasPathways = useMemo(() => data?.pathway?.length > 0, [data]);
  const isPathwaysEnabled = getConfig().ENABLE_PATHWAY_PILOT_UI;
  const hasData = hasCourses || (isPathwaysEnabled && hasPathways);

  const {
    filters, sortBy, pageNumber, setPageNumber, categories,
  } = useFilters();
  // If there is a category filter and the "courses" category is not selected, it means all courses are hidden.
  const hideCourses = categories.length > 0 && !categories.find(category => category.id === COURSE_CATEGORY);

  const { visibleList, numPages } = useMemo(() => {
    let transformedCourses = [];
    if (hasCourses) {
      transformedCourses = getTransformedCourseDataList(data.courses);
    }

    if (isPathwaysEnabled) {
      // New workflow: with courses and pathways
      const visibleItems = [];

      if (!hideCourses) {
        const visibleCourse = getVisibleCourses(
          transformedCourses,
          filters,
        );
        visibleItems.push(...visibleCourse.map(course => ({
          cardId: course.cardId,
          lastEnrolled: new Date(course.enrollment?.lastEnrolled),
          title: course.course.courseName,
          itemType: 'course',
        })));
      }

      if (hasPathways) {
        const transformedPathways = getTransformedPathwayDataList(data.pathway);
        const visiblePathways = getVisiblePathways(transformedPathways, filters, categories);
        visibleItems.push(...visiblePathways.map(pathway => ({
          cardId: pathway.cardId,
          lastEnrolled: new Date(pathway.enrollment?.lastEnrolled ?? Date.now()),
          title: pathway.pathway.content.displayName,
          itemType: 'pathway',
        })));
      }

      return getVisibleItems(visibleItems, sortBy, pageNumber);
    }
    // Old workflow, only with courses
    return getVisibleList(
      transformedCourses,
      filters,
      sortBy,
      pageNumber,
    );
  }, [
    data,
    filters,
    sortBy,
    pageNumber,
    categories,
    hideCourses,
    hasCourses,
    hasPathways,
    isPathwaysEnabled,
  ]);

  const filterCategories = useMemo(() => {
    if (!isPathwaysEnabled) {
      // The filter categories are disabled
      return [];
    }

    const availableCategories = [];
    if (hasCourses) {
      availableCategories.push({
        id: COURSE_CATEGORY,
        text: formatMessage(messages.courseCategory),
      });
    }
    if (hasPathways) {
      data?.pathway?.forEach((pathway) => {
        const { category, categoryLabel } = pathway.pathway;
        if (!availableCategories.some(filterCategory => filterCategory.id === category)) {
          availableCategories.push({ id: category, text: categoryLabel });
        }
      });
    }
    return availableCategories;
  }, [
    data,
    hasCourses,
    hasPathways,
    formatMessage,
    isPathwaysEnabled,
  ]);

  // Clamp page number when filtered/mutated list shrinks
  React.useEffect(() => {
    if (numPages > 0 && pageNumber > numPages) {
      setPageNumber(1);
    }
  }, [numPages, pageNumber, setPageNumber]);

  const itemsListData = {
    filterOptions: filters,
    setPageNumber,
    numPages,
    visibleList,
    showFilters: filters.length > 0 || categories.length > 0,
  };

  const title = isPathwaysEnabled ? formatMessage(messages.myLearning) : formatMessage(messages.myCourses);

  let listContent = <NoCoursesViewSlot />;
  if (hasData) {
    listContent = isPathwaysEnabled
      ? <ItemsListSlot itemsListData={itemsListData} />
      : <CourseListSlot courseListData={itemsListData} />;
  }

  return (
    <div className="course-list-container">
      <div className="course-list-heading-container">
        <h2 className="course-list-title">{title}</h2>
        <div className="filter-controls-container">
          <FilterControls filterCategories={filterCategories} />
        </div>
      </div>
      {listContent}
    </div>
  );
};

ItemsPanel.propTypes = {};

export default ItemsPanel;
