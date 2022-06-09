import React from 'react';
import PropTypes from 'prop-types';

import { Dropdown, Icon, IconButton } from '@edx/paragon';
import { MoreVert } from '@edx/paragon/icons';

import EmailSettingsModal from 'containers/EmailSettingsModal';
import UnenrollConfirmModal from 'containers/UnenrollConfirmModal';
import hooks from './hooks';

export const CourseCardMenu = ({ courseNumber }) => {
  const {
    emailSettingsModal,
    unenrollModal,
  } = hooks();
  return (
    <>
      <Dropdown>
        <Dropdown.Toggle
          id="dropdown-toggle-with-iconbutton"
          as={IconButton}
          src={MoreVert}
          iconAs={Icon}
          variant="primary"
          alt="Actions dropdown"
        />
        <Dropdown.Menu>
          <Dropdown.Item onClick={unenrollModal.show}>Unenroll</Dropdown.Item>
          <Dropdown.Item onClick={emailSettingsModal.show}>Email Settings</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Share to Facebook</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Share to Twitter</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <UnenrollConfirmModal
        show={unenrollModal.isVisible}
        closeModal={unenrollModal.hide}
        courseNumber={courseNumber}
      />
      <EmailSettingsModal
        show={emailSettingsModal.isVisible}
        closeModal={emailSettingsModal.hide}
        courseNumber={courseNumber}
      />
    </>
  );
};
CourseCardMenu.propTypes = {
  courseNumber: PropTypes.string.isRequired,
};

export default CourseCardMenu;
