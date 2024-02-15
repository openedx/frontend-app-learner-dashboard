import React from 'react';
import { shallow } from '@edx/react-unit-test-utils';

import { ConfirmPane } from './ConfirmPane';

describe('UnenrollConfirmModal ConfirmPane', () => {
  test('snapshot', () => {
    const props = {
      handleClose: jest.fn().mockName('props.handleClose'),
      handleConfirm: jest.fn().mockName('props.handleConfirm'),
    };
    expect(shallow(<ConfirmPane {...props} />).snapshot).toMatchSnapshot();
  });
});
