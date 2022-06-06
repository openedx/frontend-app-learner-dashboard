import React from 'react';

import { Dropdown, Icon, IconButton } from '@edx/paragon';
import { MoreVert } from '@edx/paragon/icons';

import shapes from 'data/services/lms/shapes';
import EmailSettingsModal from 'containers/EmailSettingsModal';
import UnenrollConfirmModal from 'containers/UnenrollConfirmModal';
import hooks from './hooks';

export const CourseCardMenu = ({ cardData }) => {
  const {
    ref,
    emailSettingsModal,
    unenrollModal,
  } = hooks();
  return (
    <>
      <Dropdown ref={ref}>
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
        menuRef={ref}
        closeModal={unenrollModal.hide}
      />
      <EmailSettingsModal
        show={emailSettingsModal.isVisible}
        menuRef={ref}
        closeModal={emailSettingsModal.hide}
        cardData={cardData}
      />
    </>
  );
};
CourseCardMenu.propTypes = {
  cardData: shapes.courseRunCardData.isRequired,
};

export default CourseCardMenu;
