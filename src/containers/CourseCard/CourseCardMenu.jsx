import React from 'react';
import { Dropdown, Icon, IconButton } from '@edx/paragon';
import { MoreVert } from '@edx/paragon/icons';

export const CourseCardMenu = () => (
  <Dropdown>
    <Dropdown.Toggle
      id='dropdown-toggle-with-iconbutton'
      as={IconButton}
      src={MoreVert}
      iconAs={Icon}
      variant='primary'
      alt='Actions dropdown'
    />
    <Dropdown.Menu>
      <Dropdown.Item href='#/action-1'>Unenroll</Dropdown.Item>
      <Dropdown.Item href='#/action-2'>Email Settings</Dropdown.Item>
      <Dropdown.Item href='#/action-3'>Share to Facebook</Dropdown.Item>
      <Dropdown.Item href='#/action-3'>Share to Twitter</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);
