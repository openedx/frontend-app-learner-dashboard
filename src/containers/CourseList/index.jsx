import React from 'react';

import { useIntl } from '@edx/frontend-platform/i18n';
import { Pagination } from '@openedx/paragon';
import { PluginSlot } from '@openedx/frontend-plugin-framework';

import { reduxHooks } from 'hooks';
import {
  ActiveCourseFilters,
  CourseFilterControls,
} from 'containers/CourseFilterControls';
import CourseCard from 'containers/CourseCard';
import NoCoursesView from './NoCoursesView';

import List from './List';

// TODO: test wrapping the List component and previous implementation with PluginSlot

import { useCourseListData, useIsCollapsed } from './hooks';

import messages from './messages';

import './index.scss';

// TODO: change the name of this component
/**
 * Renders the list of CourseCards, as well as the controls (CourseFilterControls) for modifying the list.
 * Also houses the NoCoursesView to display if the user hasn't enrolled in any courses.
 * @returns List of courses as CourseCards
 */
export const CourseList = () => {
  const { formatMessage } = useIntl();
  const hasCourses = reduxHooks.useHasCourses();
  const {
    filterOptions,
    setPageNumber,
    numPages,
    showFilters,
    visibleList,
  } = useCourseListData();
  // const isCollapsed = useIsCollapsed();
  return (
    <div className="course-list-container">
      <div className="course-list-heading-container">
        <h2 className="course-list-title">{formatMessage(messages.myCourses)}</h2>
        <div className="course-filter-controls-container">
          <CourseFilterControls {...filterOptions} />
        </div>
      </div>
      {hasCourses
        ? (
          // TODO: refactor this into a component
          // TODO: test: can we wrap it in a PluginSlot the way it is now?
          // TODO: name this component CourseList
          <PluginSlot id="test_course_list">
            <List
              setPageNumber={setPageNumber}
              numPages={numPages}
              visibleList={visibleList}
              showFilters={showFilters}
              filterOptions={filterOptions}
            />
          </PluginSlot>
          // <>
          //   {showFilters && (
          //     <div id="course-list-active-filters-container">
          //       <ActiveCourseFilters {...filterOptions} />
          //     </div>
          //   )}
          //   <div className="d-flex flex-column flex-grow-1">
          //     {visibleList.map(({ cardId }) => (
          //       <CourseCard key={cardId} cardId={cardId} />
          //     ))}
          //     {numPages > 1 && (
          //       <Pagination
          //         variant={isCollapsed ? 'reduced' : 'secondary'}
          //         paginationLabel="Course List"
          //         className="mx-auto mb-2"
          //         pageCount={numPages}
          //         onPageSelect={setPageNumber}
          //       />
          //     )}
          //   </div>
          // </>
        ) : (
          <NoCoursesView />
        )}
    </div>
  );
};

CourseList.propTypes = {};

export default CourseList;
