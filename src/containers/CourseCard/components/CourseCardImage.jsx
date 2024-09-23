import { useIntl } from '@edx/frontend-platform/i18n';
import PropTypes from 'prop-types';
import React from 'react';

import { Badge } from '@openedx/paragon';

import verifiedRibbon from 'assets/verified-ribbon.png';
import { reduxHooks } from 'hooks';
import track from 'tracking';
import useActionDisabledState from './hooks';

import messages from '../messages';

const { courseImageClicked } = track.course;

export const CourseCardImage = ({ cardId, orientation }) => {
  const { formatMessage } = useIntl();
  const { bannerImgSrc } = reduxHooks.useCardCourseData(cardId);
  const { homeUrl } = reduxHooks.useCardCourseRunData(cardId);
  const { isVerified } = reduxHooks.useCardEnrollmentData(cardId);
  const { disableCourseTitle } = useActionDisabledState(cardId);
  const handleImageClicked = reduxHooks.useTrackCourseEvent(courseImageClicked, cardId, homeUrl);
  const wrapperClassName = `pgn__card-wrapper-image-cap overflow-visible ${orientation} float-start d-flex justify-content-center align-content-center`;
  const image = (
    <>
      <img
        className="pgn__card-image-cap show d-flex float-start d-flex justify-content-center align-content-center"
        src={bannerImgSrc}
        alt={formatMessage(messages.bannerAlt)}
      />
      {
        isVerified && (
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
