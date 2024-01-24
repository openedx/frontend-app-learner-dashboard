import React from 'react';
import { shallow } from '@edx/react-unit-test-utils';

import { ReasonPane } from './ReasonPane';

describe('UnenrollConfirmModal ReasonPane', () => {
  const props = {
    reason: {
      handleSkip: jest.fn().mockName('props.reason.handleSkip'),
      selectOption: jest.fn().mockName('props.reason.selectOption'),
      customOption: {
        value: 'props.reason.customOption.value',
        onChange: jest.fn().mockName('props.reason.customOption.onChange'),
      },
      selected: 'props.reason.selected',
      handleSubmit: jest.fn().mockName('props.reason.handleSubmit'),
      hasReason: true,
    },
  };
  test('snapshot', () => {
    expect(shallow(<ReasonPane {...props} />).snapshot).toMatchSnapshot();
  });
  test('snapshot: no reason provided', () => {
    expect(shallow(<ReasonPane {...props} hasReason={false} />).snapshot).toMatchSnapshot();
  });
});
