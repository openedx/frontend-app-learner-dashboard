import React from 'react';
import PropTypes from 'prop-types';

import { Dropdown, Icon, IconButton } from '@edx/paragon';
import { MoreVert } from '@edx/paragon/icons';

import { hooks as appHooks } from 'data/redux';
import EmailSettingsModal from 'containers/EmailSettingsModal';
import UnenrollConfirmModal from 'containers/UnenrollConfirmModal';
import useCourseCardMenuData from './hooks';

export const CourseCardMenu = ({ cardId }) => {
  const {
    emailSettingsModal,
    unenrollModal,
  } = useCourseCardMenuData();
  const { isMasquerading } = appHooks.useMasqueradeData();
  return (
    <>
      <Dropdown>
        <Dropdown.Toggle
          id={`course-actions-dropdown-${cardId}`}
          as={IconButton}
          src={MoreVert}
          iconAs={Icon}
          variant="primary"
          alt="Actions dropdown"
        />
        <Dropdown.Menu>
          <Dropdown.Item disabled={isMasquerading} onClick={unenrollModal.show}>
            Unenroll
          </Dropdown.Item>
          <Dropdown.Item disabled={isMasquerading} onClick={emailSettingsModal.show}>
            Email Settings
          </Dropdown.Item>
          <Dropdown.Item href="#/action-3">Share to Facebook</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Share to Twitter</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <UnenrollConfirmModal
        show={unenrollModal.isVisible}
        closeModal={unenrollModal.hide}
        cardId={cardId}
      />
      <EmailSettingsModal
        show={emailSettingsModal.isVisible}
        closeModal={emailSettingsModal.hide}
        cardId={cardId}
      />
    </>
  );
};
CourseCardMenu.propTypes = {
  cardId: PropTypes.string.isRequired,
};

export default CourseCardMenu;
