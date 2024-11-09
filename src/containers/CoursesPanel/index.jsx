import { useIntl } from '@edx/frontend-platform/i18n';

import { PluginSlot } from '@openedx/frontend-plugin-framework';
import {
  CourseFilterControls,
} from 'containers/CourseFilterControls';
import { reduxHooks } from 'hooks';
import React from 'react';

import { faBook } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NoCoursesView from './NoCoursesView';

import CourseList from './CourseList';

import { useCourseListData } from './hooks';
import './index.scss';
import messages from './messages';
/**
 * Renders the list of CourseCards, as well as the controls (CourseFilterControls) for modifying the list.
 * Also houses the NoCoursesView to display if the user hasn't enrolled in any courses.
 * @returns List of courses as CourseCards or empty state
*/

export const CoursesPanel = () => {
  const { formatMessage } = useIntl();
  const hasCourses = reduxHooks.useHasCourses();
  const courseListData = useCourseListData();
  
  return (
    <div className="course-list-container">
      <div className="course-list-heading-container">

        <div className="d-flex justify-content-center align-items-center ">
          <FontAwesomeIcon icon={faBook} size="2x" style={{ marginRight: '10px' }} />

          <h2 className="course-list-title">{formatMessage(messages.myCourses)}</h2>
        </div>

        <div className="course-filter-controls-container">
          <CourseFilterControls {...courseListData.filterOptions} />
        </div>
      </div>
      {hasCourses ? (
        <PluginSlot
          id="course_list"
        >
          <CourseList {...courseListData} />
        </PluginSlot>
      ) : (
        <PluginSlot
          id="no_courses_view"
        >
          <NoCoursesView />
        </PluginSlot>
      )}
    </div>
  );
};

CoursesPanel.propTypes = {};

export default CoursesPanel;
