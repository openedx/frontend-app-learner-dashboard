import { shallow } from 'enzyme';

import { reduxHooks } from 'hooks';
import BrandLogo from './BrandLogo';

jest.mock('hooks', () => ({
  reduxHooks: {
    useEnterpriseDashboardData: jest.fn(),
  },
}));

describe('BrandLogo', () => {
  test('dashboard defined', () => {
    reduxHooks.useEnterpriseDashboardData.mockReturnValueOnce({
      url: 'url',
    });
    const wrapper = shallow(<BrandLogo />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('a').prop('href')).toEqual('url');
  });

  test('dashboard undefined', () => {
    reduxHooks.useEnterpriseDashboardData.mockReturnValueOnce(null);
    const wrapper = shallow(<BrandLogo />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('a').prop('href')).toEqual('/');
  });
});
