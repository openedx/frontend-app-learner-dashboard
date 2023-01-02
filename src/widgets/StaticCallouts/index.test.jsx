import React from 'react';
import { shallow, mount } from 'enzyme';

import { useCountryCode } from 'data/redux/hooks';
import StaticCallouts from '.';

jest.mock('data/redux/hooks', () => ({
  useCountryCode: jest.fn(),
}));

jest.mock('./hooks', () => ({
  __esModule: true,
  default: jest.fn(() => false),
}));

describe('StaticCallouts tests', () => {
  it('StaticCallouts snapshot', () => {
    expect(shallow(<StaticCallouts />)).toMatchSnapshot();
  });
  it('Display 4 static LOB cards for US users', () => {
    useCountryCode.mockReturnValueOnce('US');

    const wrapper = mount(<StaticCallouts />);
    expect(wrapper.find('div.static-callouts-container').children()).toHaveLength(4);
  });
  it('Display 3 static LOB cards for non-US users', () => {
    useCountryCode.mockReturnValueOnce('PK');

    const wrapper = mount(<StaticCallouts />);
    expect(wrapper.find('div.static-callouts-container').children()).toHaveLength(3);
  });
});
