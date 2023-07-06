import React from 'react';
import PropTypes from 'prop-types';
import * as ReactShare from 'react-share';

import { useIntl } from '@edx/frontend-platform/i18n';
import { Dropdown, Icon, IconButton } from '@edx/paragon';
import { MoreVert } from '@edx/paragon/icons';

import EmailSettingsModal from 'containers/EmailSettingsModal';
import UnenrollConfirmModal from 'containers/UnenrollConfirmModal';
import {
  useEmailSettings,
  useUnenrollData,
  useHandleToggleDropdown,
  useCourseCardMenu,
} from './hooks';

import messages from './messages';

export const CourseCardMenu = ({ cardId }) => {
  const { formatMessage } = useIntl();

  const emailSettingsModal = useEmailSettings();
  const unenrollModal = useUnenrollData();
  const handleToggleDropdown = useHandleToggleDropdown(cardId);

  const {
    courseName,
    isMasquerading,
    isEmailEnabled,
    showUnenrollItem,
    showDropdown,
    facebook,
    twitter,
    handleTwitterShare,
    handleFacebookShare,
  } = useCourseCardMenu(cardId);

  if (!showDropdown) {
    return null;
  }

  return (
    <>
      <Dropdown onToggle={handleToggleDropdown}>
        <Dropdown.Toggle
          id={`course-actions-dropdown-${cardId}`}
          as={IconButton}
          src={MoreVert}
          iconAs={Icon}
          variant="primary"
          alt={formatMessage(messages.dropdownAlt)}
        />
        <Dropdown.Menu>
          {showUnenrollItem && (
            <Dropdown.Item
              disabled={isMasquerading}
              onClick={unenrollModal.show}
              data-testid="unenrollModalToggle"
            >
              {formatMessage(messages.unenroll)}
            </Dropdown.Item>
          )}
          {isEmailEnabled && (
            <Dropdown.Item
              disabled={isMasquerading}
              onClick={emailSettingsModal.show}
              data-testid="emailSettingsModalToggle"
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
        </Dropdown.Menu>
      </Dropdown>
      <UnenrollConfirmModal
        show={unenrollModal.isVisible}
        closeModal={unenrollModal.hide}
        cardId={cardId}
      />
      {isEmailEnabled && (
        <EmailSettingsModal
          show={emailSettingsModal.isVisible}
          closeModal={emailSettingsModal.hide}
          cardId={cardId}
        />
      )}
    </>
  );
};
CourseCardMenu.propTypes = {
  cardId: PropTypes.string.isRequired,
};

export default CourseCardMenu;
