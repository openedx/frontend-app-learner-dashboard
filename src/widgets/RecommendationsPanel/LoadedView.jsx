import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';

import CourseCard from './components/CourseCard';
import messages from './messages';
import ModalView from '../../components/ModalView';

import './index.scss';

export const LoadedView = ({
  courses,
  isControl,
  setIsRecommendationsModalOpen,
  isRecommendationsModalOpen,
}) => {
  const { formatMessage } = useIntl();

  return (
    <>
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
            variant="brand"
            onClick={setIsRecommendationsModalOpen}
          >
            {formatMessage(messages.seeAllRecommendationsButton)}
          </Button>
        </div>
      </div>
      <ModalView isOpen={isRecommendationsModalOpen} onClose={setIsRecommendationsModalOpen} />
    </>
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
  setIsRecommendationsModalOpen: PropTypes.func.isRequired,
  isRecommendationsModalOpen: PropTypes.bool.isRequired,
};

export default LoadedView;
