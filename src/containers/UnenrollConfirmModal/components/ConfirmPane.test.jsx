import React from 'react';
import { shallow } from 'enzyme';

import { ConfirmPane } from './ConfirmPane';

describe('UnenrollConfirmModal ConfirmPane', () => {
  test('snapshot', () => {
    const props = {
      handleClose: jest.fn().mockName('props.handleClose'),
      handleConfirm: jest.fn().mockName('props.handleConfirm'),
    };
    expect(shallow(<ConfirmPane {...props} />)).toMatchSnapshot();
  });
});
