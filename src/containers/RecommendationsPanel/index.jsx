import React from 'react';
import PropTypes from 'prop-types';

import { useIntl } from '@edx/frontend-platform/i18n';
import { Button } from '@edx/paragon';
import { Search } from '@edx/paragon/icons';
import CourseCard from './components/CourseCard';
import messages from './messages';

export const RecommendationsPanel = ({ courses }) => {
  const { formatMessage } = useIntl();

  return (
    <div className="widget-sidebar p-4">
      <h3 className="pb-2">{formatMessage(messages.recommendationPanelHeading)}</h3>
      <div>
        {courses && courses.map((course) => (
          <CourseCard key={course.courseKey} course={course} />
        ))}
      </div>
      <div className="text-center pt-2">
        <Button
          variant=""
          iconBefore={Search}
          onClick={() => { window.location.href = 'https://edx.org/search'; }}
        >
          { formatMessage(messages.exploreCoursesButton) }
        </Button>
      </div>
    </div>
  );
};

RecommendationsPanel.propTypes = {
  courses: PropTypes.arrayOf(PropTypes.shape({
    courseKey: PropTypes.string,
    title: PropTypes.string,
    logoImageUrl: PropTypes.string,
    marketingUrl: PropTypes.string,
  })).isRequired,
};

export default RecommendationsPanel;
