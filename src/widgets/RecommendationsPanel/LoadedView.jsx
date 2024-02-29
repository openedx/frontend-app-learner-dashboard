import React from 'react';
import PropTypes from 'prop-types';

import { useIntl } from '@edx/frontend-platform/i18n';
import { Button } from '@openedx/paragon';
import { Search } from '@openedx/paragon/icons';
import { baseAppUrl } from 'data/services/lms/urls';

import { reduxHooks } from 'hooks';
import track from './track';
import CourseCard from './components/CourseCard';
import messages from './messages';

import './index.scss';

export const LoadedView = ({
  courses,
  isControl,
}) => {
  const { formatMessage } = useIntl();
  const { courseSearchUrl } = reduxHooks.usePlatformSettingsData();

  return (
    <div className="p-4 w-100 panel-background">
      <h3 className="pb-2">{isControl === false
        ? formatMessage(messages.recommendationsHeading) : formatMessage(messages.popularCoursesHeading)}
      </h3>
      <div>
        {courses.map((course) => (
          <CourseCard
            key={course.courseKey}
            course={course}
            isControl={isControl}
          />
        ))}
      </div>
      <div className="text-center explore-courses-btn">
        <Button
          variant="tertiary"
          iconBefore={Search}
          as="a"
          href={baseAppUrl(courseSearchUrl)}
          onClick={track.findCoursesWidgetClicked(baseAppUrl(courseSearchUrl))}
        >
          {formatMessage(messages.exploreCoursesButton)}
        </Button>
      </div>
    </div>
  );
};

LoadedView.defaultProps = {
  isControl: true,
};

LoadedView.propTypes = {
  courses: PropTypes.arrayOf(PropTypes.shape({
    courseKey: PropTypes.string,
    title: PropTypes.string,
    logoImageUrl: PropTypes.string,
    marketingUrl: PropTypes.string,
  })).isRequired,
  isControl: PropTypes.oneOf([true, false, null]),
};

export default LoadedView;
