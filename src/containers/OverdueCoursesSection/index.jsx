import React, { useMemo } from 'react';

import { useIntl } from '@edx/frontend-platform/i18n';
import { useInitializeLearnerHome } from 'data/hooks';
import CourseCard from 'containers/CourseCard';
import alertCircleSVG from 'assets/tabler-icon-alert-circle.svg';
import { getOverdueCourses } from 'utils/dueDate';
import { getTransformedCourseDataList } from 'utils/dataTransformers';

import messages from './messages';

import './index.scss';

/**
 * Full-width overdue alert above Assigned Courses + Progress Summary.
 * Title, subtitle, and cards share a 66px left inset; the warning icon is
 * absolutely positioned in that gutter. Cards use a flex equivalent of
 * CourseList (sm12/md6/lg6) inside an xl 8/12 wrapper.
 */
export const OverdueCoursesSection = () => {
  const { formatMessage } = useIntl();
  const { data } = useInitializeLearnerHome();

  const overdueCourses = useMemo(() => {
    if (!data?.courses?.length) {
      return [];
    }
    const transformedCourses = getTransformedCourseDataList(data.courses);
    return getOverdueCourses(transformedCourses);
  }, [data?.courses]);

  if (!overdueCourses.length) {
    return null;
  }

  return (
    <section
      className="overdue-courses-section"
      data-testid="OverdueCoursesSection"
      aria-labelledby="overdue-courses-heading"
    >
      <div className="overdue-courses-inner">
        <div className="overdue-courses-header">
          <div className="overdue-courses-title-row">
            <img
              src={alertCircleSVG}
              alt=""
              className="overdue-courses-warning-icon"
              aria-hidden="true"
            />
            <h2 id="overdue-courses-heading" className="overdue-courses-title">
              {formatMessage(messages.sectionTitle)}
            </h2>
          </div>
          <p className="overdue-courses-subtitle">
            {formatMessage(messages.sectionSubtitle, { count: overdueCourses.length })}
          </p>
        </div>
        <div className="overdue-courses-grid">
          {overdueCourses.map(({ cardId }) => (
            <div key={cardId} className="overdue-courses-grid-item">
              <CourseCard cardId={cardId} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

OverdueCoursesSection.propTypes = {};

export default OverdueCoursesSection;
