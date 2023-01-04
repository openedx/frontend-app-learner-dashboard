import React from 'react';
import { shallow } from 'enzyme';

import LoadedView from './LoadedView';

jest.mock('./hooks', () => ({
  useIsMediumScreen: jest.fn(() => false),
  useOptimizelyExperiment: jest.fn(),
  useTwoUWidgetData: jest.fn(),
}));

describe('LoadedView tests', () => {
  it('Do not display static LOB cards if the experiment is not active', () => {
    const wrapper = shallow(<LoadedView countryCode="PK" show2ULobs={false} />);
    expect(wrapper.isEmptyRender()).toBe(true);
  });
  it('Display 4 static LOB cards for US users', () => {
    const wrapper = shallow(<LoadedView countryCode="US" show2ULobs />);
    expect(wrapper.find('div.static-callouts-container').children()).toHaveLength(4);
  });
  it('Display 3 static LOB cards for non-US users', () => {
    const wrapper = shallow(<LoadedView countryCode="PK" show2ULobs />);
    expect(wrapper.find('div.static-callouts-container').children()).toHaveLength(3);
  });
});
