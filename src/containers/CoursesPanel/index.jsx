import React, { useMemo } from 'react';

import { useIntl } from '@edx/frontend-platform/i18n';
import { Hyperlink, Icon } from '@openedx/paragon';
import { MenuBook } from '@openedx/paragon/icons';
import { useInitializeLearnerHome } from 'data/hooks';
import CourseListSlot from 'plugin-slots/CourseListSlot';
import NoCoursesViewSlot from 'plugin-slots/NoCoursesViewSlot';
import { useFilters } from 'data/context';

import { getVisibleList, getTransformedCourseDataList } from 'utils/dataTransformers';
import { filterNonOverdueCourses } from 'utils/dueDate';

import messages from './messages';

import './index.scss';

/**
 * Renders the "Assigned Courses" section: a heading, a "View All" link (bypasses pagination),
 * and the grid of CourseCards. Also houses the NoCoursesView to display if the user hasn't
 * enrolled in any courses.
 * @returns Assigned courses section, with courses as CourseCards or an empty state
*/
export const AssignedCoursesSection = () => {
  const { formatMessage } = useIntl();
  const { data } = useInitializeLearnerHome();
  const hasCourses = useMemo(() => data?.courses?.length > 0, [data]);

  const {
    filters, sortBy, pageNumber, setPageNumber,
  } = useFilters();
  const { visibleList, numPages } = useMemo(() => {
    let transformedCourses = [];
    if (data?.courses?.length) {
      transformedCourses = filterNonOverdueCourses(
        getTransformedCourseDataList(data.courses),
      );
    }
    return getVisibleList(
      transformedCourses,
      filters,
      sortBy,
      pageNumber,
    );
  }, [data, filters, sortBy, pageNumber]);

  // Clamp page number when filtered/mutated list shrinks
  React.useEffect(() => {
    if (numPages > 0 && pageNumber > numPages) {
      setPageNumber(1);
    }
  }, [numPages, pageNumber, setPageNumber]);

  const courseListData = {
    filterOptions: filters,
    setPageNumber,
    numPages,
    visibleList,
    showFilters: filters.length > 0,
  };

  // "View All" bypasses pagination via the same query param the data layer already honors.
  const viewAllHref = `${window.location.pathname}?disable_pagination=1`;

  return (
    <div className="assigned-courses-container">
      <div className="assigned-courses-heading-container">
        <h2 className="assigned-courses-title">
          {formatMessage(messages.sectionTitle)}
        </h2>
        <div className="assigned-courses-header-actions">
          {hasCourses && numPages > 1 && (
            <Hyperlink destination={viewAllHref} className="assigned-courses-view-all">
              {formatMessage(messages.viewAll)}
            </Hyperlink>
          )}
        </div>
      </div>
      {hasCourses ? <CourseListSlot courseListData={courseListData} /> : <NoCoursesViewSlot />}
    </div>
  );
};

AssignedCoursesSection.propTypes = {};

export default AssignedCoursesSection;
