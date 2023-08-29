import React from 'react';
import PropTypes from 'prop-types';
import * as ReactShare from 'react-share';

import { StrictDict } from '@edx/react-unit-test-utils';
import { useIntl } from '@edx/frontend-platform/i18n';
import { Dropdown } from '@edx/paragon';

import track from 'tracking';
import { reduxHooks } from 'hooks';

import messages from './messages';

export const testIds = StrictDict({
  emailSettingsModalToggle: 'emailSettingsModalToggle',
});

export const SocialShareMenu = ({ cardId, emailSettings }) => {
  const { formatMessage } = useIntl();

  const { courseName } = reduxHooks.useCardCourseData(cardId);
  const { isEmailEnabled, isExecEd2UCourse } = reduxHooks.useCardEnrollmentData(cardId);
  const { twitter, facebook } = reduxHooks.useCardSocialSettingsData(cardId);
  const { isMasquerading } = reduxHooks.useMasqueradeData();

  const handleTwitterShare = reduxHooks.useTrackCourseEvent(track.socialShare, cardId, 'twitter');
  const handleFacebookShare = reduxHooks.useTrackCourseEvent(track.socialShare, cardId, 'facebook');

  if (isExecEd2UCourse) {
    return null;
  }

  return (
    <>
      {isEmailEnabled && (
        <Dropdown.Item
          disabled={isMasquerading}
          onClick={emailSettings.show}
          data-testid={testIds.emailSettingsModalToggle}
        >
          {formatMessage(messages.emailSettings)}
        </Dropdown.Item>
      )}
      {facebook.isEnabled && (
        <ReactShare.FacebookShareButton
          url={facebook.shareUrl}
          onClick={handleFacebookShare}
          title={formatMessage(messages.shareQuote, {
            courseName,
            socialBrand: facebook.socialBrand,
          })}
          resetButtonStyle={false}
          className="pgn__dropdown-item dropdown-item"
        >
          {formatMessage(messages.shareToFacebook)}
        </ReactShare.FacebookShareButton>
      )}
      {twitter.isEnabled && (
        <ReactShare.TwitterShareButton
          url={twitter.shareUrl}
          onClick={handleTwitterShare}
          title={formatMessage(messages.shareQuote, {
            courseName,
            socialBrand: twitter.socialBrand,
          })}
          resetButtonStyle={false}
          className="pgn__dropdown-item dropdown-item"
        >
          {formatMessage(messages.shareToTwitter)}
        </ReactShare.TwitterShareButton>
      )}
    </>
  );
};
SocialShareMenu.propTypes = {
  cardId: PropTypes.string.isRequired,
  emailSettings: PropTypes.shape({
    show: PropTypes.func,
  }).isRequired,
};

export default SocialShareMenu;
