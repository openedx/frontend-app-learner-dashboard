import React from 'react';
import PropTypes from 'prop-types';
import * as ReactShare from 'react-share';

import { useIntl } from '@edx/frontend-platform/i18n';
import { Dropdown, Icon, IconButton } from '@edx/paragon';
import { MoreVert } from '@edx/paragon/icons';

import { hooks as appHooks } from 'data/redux';
import EmailSettingsModal from 'containers/EmailSettingsModal';
import UnenrollConfirmModal from 'containers/UnenrollConfirmModal';
import { useEmailSettings, useUnenrollData } from './hooks';

import messages from './messages';

export const CourseCardMenu = ({ cardId }) => {
  const emailSettingsModal = useEmailSettings();
  const unenrollModal = useUnenrollData();
  const { courseName } = appHooks.useCardCourseData(cardId);
  const { isEnrolled, isEmailEnabled } = appHooks.useCardEnrollmentData(cardId);
  const {
    // facebook,
    twitter,
  } = appHooks.useCardSocialSettingsData(cardId);
  const { isMasquerading } = appHooks.useMasqueradeData();
  const { formatMessage } = useIntl();

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle
          id={`course-actions-dropdown-${cardId}`}
          as={IconButton}
          src={MoreVert}
          iconAs={Icon}
          variant="primary"
          alt={formatMessage(messages.dropdownAlt)}
        />
        <Dropdown.Menu>
          {isEnrolled && (
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
          {/* Disabled pending PM decision on missing quote param in updated FB api.
            {facebook.isEnabled && (
              <Dropdown.Item>
                <ReactShare.FacebookShareButton
                  url={facebook.shareUrl}
                  quote={formatMessage(messages.shareQuote, {
                    courseName,
                    socialBrand: facebook.socialBrand,
                  })}
                >
                  {formatMessage(messages.shareToFacebook)}
                </ReactShare.FacebookShareButton>
              </Dropdown.Item>
            )}
          */}
          {twitter.isEnabled && (
            <Dropdown.Item>
              <ReactShare.TwitterShareButton
                url={twitter.shareUrl}
                title={formatMessage(messages.shareQuote, {
                  courseName,
                  socialBrand: twitter.socialBrand,
                })}
              >
                {formatMessage(messages.shareToTwitter)}
              </ReactShare.TwitterShareButton>
            </Dropdown.Item>
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
