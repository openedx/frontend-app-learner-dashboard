import React from 'react';

import { useIntl } from '@edx/frontend-platform/i18n';

import { reduxHooks } from 'hooks';
import {
  CourseFilterControls,
} from 'containers/CourseFilterControls';
import NoCoursesView from './NoCoursesView';

import List from './List';

import { useCourseListData } from './hooks';

import messages from './messages';

import './index.scss';

/**
 * Renders the list of CourseCards, as well as the controls (CourseFilterControls) for modifying the list.
 * Also houses the NoCoursesView to display if the user hasn't enrolled in any courses.
 * @returns List of courses as CourseCards
*/
// TODO: change the name of this component
export const CourseList = () => {
  const { formatMessage } = useIntl();
  const hasCourses = reduxHooks.useHasCourses();
  // const {
  //   filterOptions,
  //   ...otherSettings
  // } = useCourseListData();
  const courseListData = useCourseListData();
  return (
    <div className="course-list-container">
      <div className="course-list-heading-container">
        <h2 className="course-list-title">{formatMessage(messages.myCourses)}</h2>
        <div className="course-filter-controls-container">
          <CourseFilterControls {...courseListData.filterOptions} />
        </div>
      </div>
      {hasCourses
        ? (
          <List {...courseListData} />
        ) : (
          <NoCoursesView />
        )}
    </div>
  );
};

CourseList.propTypes = {};

export default CourseList;
