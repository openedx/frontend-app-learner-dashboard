import React, {
  useEffect, useMemo, useRef, useState,
} from 'react';
import classNames from 'classnames';

import { FormattedMessage } from '@openedx/frontend-base';
import { useIsPathwayPilotUIEnabled } from '@src/hooks';
import { useInitializeLearnerHome } from '@src/data/hooks';
import { MenuBook } from '@openedx/paragon/icons';
import {
  CourseFilterControls,
} from '../../containers/CourseFilterControls';
import CourseListSlot from '../../slots/CourseListSlot';
import NoCoursesViewSlot from '../../slots/NoCoursesViewSlot';
import { useFilters } from '@src/data/context';

import { getVisibleList } from '@src/utils/dataTransformers';

import messages from './messages';

import './index.scss';
import { Icon, Stack } from '@openedx/paragon';

/**
 * Renders the list of CourseCards, as well as the controls (CourseFilterControls) for modifying the list.
 * Also houses the NoCoursesView to display if the user hasn't enrolled in any courses.
 * @returns List of courses as CourseCards or empty state
*/
export const CoursesPanel = () => {
  const isPathwayPilotUIEnabled = useIsPathwayPilotUIEnabled();
  const { data } = useInitializeLearnerHome();
  const hasCourses = useMemo(() => data?.courses?.length > 0, [data]);

  const {
    filters, sortBy, pageNumber, setPageNumber,
  } = useFilters();
  const { visibleList, numPages } = useMemo(() => {
    const transformedCourses = data?.coursesByCardId
      ? Object.values(data.coursesByCardId)
      : [];
    return getVisibleList(
      transformedCourses,
      filters,
      sortBy,
      pageNumber,
    );
  }, [data, filters, sortBy, pageNumber]);

  // Clamp page number when filtered/mutated list shrinks
  useEffect(() => {
    if (numPages > 0 && pageNumber > numPages) {
      setPageNumber(1);
    }
  }, [numPages, pageNumber, setPageNumber]);

  // The heading is stuck to the top once the sentinel right above it scrolls out of view
  const sentinelRef = useRef(null);
  const [isStuck, setIsStuck] = useState(false);
  useEffect(() => {
    if (!isPathwayPilotUIEnabled || !sentinelRef.current) {
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setIsStuck(!entry.isIntersecting),
    );
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [isPathwayPilotUIEnabled]);

  const courseListData = {
    filterOptions: filters,
    setPageNumber,
    numPages,
    visibleList,
    showFilters: filters.length > 0,
  };

  return (
    <div className="course-list-container">
      {isPathwayPilotUIEnabled && <div ref={sentinelRef} />}
      <div
        className={classNames('course-list-heading-container mb-3', {
          'is-sticky': isPathwayPilotUIEnabled,
          'is-stuck': isPathwayPilotUIEnabled && isStuck,
        })}
      >
        {isPathwayPilotUIEnabled
          ? (
            <Stack direction='horizontal' className='h3 text-gray-700 ml-2' gap={2}>
              <Icon src={MenuBook} />
              <FormattedMessage {...messages.coursesTitle} />
            </Stack>
          )
          : (
            <h2 className="dashboard-title">
              <FormattedMessage {...messages.myCourses} />
            </h2>
          )
        }
        <div className="course-filter-controls-container mr-2">
          <CourseFilterControls />
        </div>
      </div>
      {hasCourses ? <CourseListSlot courseListData={courseListData} /> : <NoCoursesViewSlot />}
    </div>
  );
};

CoursesPanel.propTypes = {};

export default CoursesPanel;
