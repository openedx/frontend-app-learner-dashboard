import React from 'react';
import { shallow } from '@edx/react-unit-test-utils';

import { FinishedPane } from './FinishedPane';

describe('UnenrollConfirmModal FinishedPane', () => {
  test('snapshot: gave reason', () => {
    const props = {
      gaveReason: true,
      handleClose: jest.fn().mockName('props.handleClose'),
    };
    expect(shallow(<FinishedPane {...props} />).snapshot).toMatchSnapshot();
  });
  test('snapshot: did not give reason', () => {
    const props = {
      gaveReason: false,
      handleClose: jest.fn().mockName('props.handleClose'),
    };
    expect(shallow(<FinishedPane {...props} />).snapshot).toMatchSnapshot();
  });
});
