import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from '@edx/frontend-platform/i18n';
import { baseAppUrl } from 'data/services/lms/urls';

import { Badge } from '@openedx/paragon';

import track from 'tracking';
import { useCourseData, useCourseTrackingEvent } from 'hooks';
import verifiedRibbon from 'assets/verified-ribbon.png';
import useActionDisabledState from './hooks';

import messages from '../messages';

const { courseImageClicked } = track.course;

export const CourseCardImage = ({ cardId, orientation }) => {
  const { formatMessage } = useIntl();
  const courseData = useCourseData(cardId);
  const { homeUrl } = courseData?.courseRun || {};
  const { disableCourseTitle } = useActionDisabledState(cardId);
  const handleImageClicked = useCourseTrackingEvent(courseImageClicked, cardId, homeUrl);
  const wrapperClassName = `pgn__card-wrapper-image-cap d-inline-block overflow-visible ${orientation}`;
  const image = (
    <>
      <img
        // w-100 is necessary for images on Safari, otherwise stretches full height of the image
        // https://stackoverflow.com/a/44250830
        className="pgn__card-image-cap w-100 show"
        src={courseData?.course?.bannerImgSrc && baseAppUrl(courseData.course.bannerImgSrc)}
        alt={formatMessage(messages.bannerAlt)}
      />
      {
        courseData?.enrollment?.isVerified && (
          <span
            className="course-card-verify-ribbon-container"
            title={formatMessage(messages.verifiedHoverDescription)}
          >
            <Badge as="div" variant="success" className="w-100">
              {formatMessage(messages.verifiedBanner)}
            </Badge>
            <img src={verifiedRibbon} alt={formatMessage(messages.verifiedBannerRibbonAlt)} />
          </span>
        )
      }
    </>
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
