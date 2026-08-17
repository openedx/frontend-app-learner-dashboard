import PropTypes from 'prop-types';

import track from 'tracking';
import { useCourseData, useCourseTrackingEvent } from 'hooks';
import { CardImage } from 'containers/DashboardCard/CardImage';
import useActionDisabledState from './hooks';

import messages from '../messages';

const { courseImageClicked } = track.course;

export const CourseCardImage = ({ cardId, orientation }) => {
  const courseData = useCourseData(cardId);
  const { homeUrl } = courseData?.courseRun || {};
  const { disableCourseTitle } = useActionDisabledState(cardId);
  const handleImageClicked = useCourseTrackingEvent(courseImageClicked, cardId, homeUrl);
  const wrapperClassName = `pgn__card-wrapper-image-cap d-inline-block overflow-visible ${orientation}`;
  const image = (
    <CardImage
      bannerImgSrc={courseData?.course?.bannerImgSrc}
      isVerified={courseData?.enrollment?.isVerified}
      messages={messages}
    />
  );
  return disableCourseTitle
    ? (<div className={wrapperClassName}>{image}</div>)
    : (
      <a
        className={wrapperClassName}
        href={homeUrl}
        onClick={handleImageClicked}
        tabIndex="-1"
      >
        {image}
      </a>
    );
};
CourseCardImage.propTypes = {
  cardId: PropTypes.string.isRequired,
  orientation: PropTypes.string.isRequired,
};

CourseCardImage.defaultProps = {};

export default CourseCardImage;
