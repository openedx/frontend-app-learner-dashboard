import React from 'react';
import { shallow } from 'enzyme';

import { ReasonPane } from './ReasonPane';

describe('UnenrollConfirmModal ReasonPane', () => {
  const props = {
    reason: {
      skip: jest.fn().mockName('props.reason.skip'),
      selectOption: jest.fn().mockName('props.reason.selectOption'),
      customOption: {
        value: 'props.reason.customOption.value',
        onChange: jest.fn().mockName('props.reason.customOption.onChange'),
      },
      selected: 'props.reason.selected',
    },
    handleSubmit: jest.fn().mockName('props.handleSubmit'),
  };
  test('snapshot', () => {
    expect(shallow(<ReasonPane {...props} />)).toMatchSnapshot();
  });
});
