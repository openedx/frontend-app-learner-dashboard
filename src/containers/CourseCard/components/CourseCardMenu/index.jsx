import React from 'react';
import PropTypes from 'prop-types';

import { useIntl } from '@edx/frontend-platform/i18n';
import { Dropdown, Icon, IconButton } from '@edx/paragon';
import { MoreVert } from '@edx/paragon/icons';
import { StrictDict } from '@edx/react-unit-test-utils';

import EmailSettingsModal from 'containers/EmailSettingsModal';
import UnenrollConfirmModal from 'containers/UnenrollConfirmModal';
import { reduxHooks } from 'hooks';
import SocialShareMenu from './SocialShareMenu';
import {
  useEmailSettings,
  useUnenrollData,
  useHandleToggleDropdown,
  useOptionVisibility,
} from './hooks';

import messages from './messages';

export const testIds = StrictDict({
  unenrollModalToggle: 'unenrollModalToggle',
});

export const CourseCardMenu = ({ cardId }) => {
  const { formatMessage } = useIntl();

  const emailSettings = useEmailSettings();
  const unenrollModal = useUnenrollData();
  const handleToggleDropdown = useHandleToggleDropdown(cardId);
  const { shouldShowUnenrollItem, shouldShowDropdown } = useOptionVisibility(cardId);
  const { isMasquerading } = reduxHooks.useMasqueradeData();
  const { isEmailEnabled } = reduxHooks.useCardEnrollmentData(cardId);

  if (!shouldShowDropdown) {
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
          {shouldShowUnenrollItem && (
            <Dropdown.Item
              disabled={isMasquerading}
              onClick={unenrollModal.show}
              data-testid={testIds.unenrollModalToggle}
            >
              {formatMessage(messages.unenroll)}
            </Dropdown.Item>
          )}
          <SocialShareMenu cardId={cardId} emailSettings={emailSettings} />
        </Dropdown.Menu>
      </Dropdown>
      <UnenrollConfirmModal
        show={unenrollModal.isVisible}
        closeModal={unenrollModal.hide}
        cardId={cardId}
      />
      {isEmailEnabled && (
        <EmailSettingsModal
          show={emailSettings.isVisible}
          closeModal={emailSettings.hide}
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
